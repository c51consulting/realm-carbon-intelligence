import { NextRequest, NextResponse } from 'next/server'
import { SEED_FARM, SEED_PADDOCKS, SEED_INPUTS, SEED_EVENTS } from '@/lib/data/seed'
import { computeOverlay } from '@/lib/carbon/computeOverlay'
import { US_CONFIG } from '@/lib/carbon/config/us'

export async function GET(request: NextRequest, { params }: { params: { farmId: string } }) {
  const { farmId } = params
  if (farmId !== SEED_FARM.id) return NextResponse.json({ error: 'Farm not found' }, { status: 404 })

  const url = new URL(request.url)
  const paddockId = url.searchParams.get('paddock_id')
  const paddocks = paddockId ? SEED_PADDOCKS.filter(p => p.id === paddockId) : SEED_PADDOCKS

  const results = paddocks.map(paddock => {
    const input = SEED_INPUTS.find(i => i.paddock_id === paddock.id)
    if (!input) return null
    const events = SEED_EVENTS.filter(e => e.paddock_id === paddock.id)
    const output = computeOverlay(input, paddock, events)
    return { paddock_id: paddock.id, paddock_name: paddock.name, ...output }
  }).filter(Boolean)

  const oppCount = results.filter(r => r?.carbon_state === 'opportunity').length
  const riskCount = results.filter(r => r?.carbon_state === 'risk').length
  const avgVal = results.length > 0 ? Math.round((results.reduce((s, r) => s + (r?.carbon_value_estimate_per_ha_usd || 0), 0) / results.length) * 100) / 100 : 0
  let overall = 'mixed'
  if (oppCount > 0 && riskCount === 0) overall = 'opportunity'
  else if (riskCount > 0 && oppCount === 0) overall = 'risk'
  else if (oppCount === 0 && riskCount === 0) overall = 'stable'

  return NextResponse.json({
    farm_id: farmId, farm_name: SEED_FARM.name, as_of_date: '2026-04-10',
    config: { currency: US_CONFIG.currency, units: US_CONFIG.units, country_code: US_CONFIG.country_code },
    summary: { overall_carbon_state: overall, opportunity_paddocks: oppCount, risk_paddocks: riskCount, avg_value_estimate_per_ha_usd: avgVal, overall_confidence: 'medium' },
    paddocks: results,
  })
}
