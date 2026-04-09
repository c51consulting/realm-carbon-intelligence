import { CarbonSignalInput, CarbonOverlayOutput, Paddock, ManagementEvent } from '@/lib/types/carbon'
import { scoreOpportunity } from './scoreOpportunity'
import { scoreRisk } from './scoreRisk'
import { estimateValue } from './estimateValue'
import { US_CONFIG } from './config/us'

export function computeOverlay(
  input: CarbonSignalInput,
  paddock: Paddock,
  events: ManagementEvent[]
): CarbonOverlayOutput {
  const recentPositive = events.some(e => {
    const d = new Date(e.event_date)
    const now = new Date(input.as_of_date)
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    return diff <= 14 && diff >= 0 && ['STOCK_MOVED', 'GRAZING_PAUSED', 'PRESSURE_REDUCED'].includes(e.event_type)
  })

  const opp = scoreOpportunity(input, recentPositive)
  const risk = scoreRisk(input, paddock.flood_prone)
  const val = estimateValue(opp.signal, risk.signal, paddock.area_ha, US_CONFIG)

  let carbonState: 'opportunity' | 'risk' | 'mixed' | 'stable' = 'mixed'
  if (opp.signal === 'high' && risk.signal !== 'high') carbonState = 'opportunity'
  else if (risk.signal === 'high' && opp.signal !== 'high') carbonState = 'risk'
  else if (opp.signal === 'low' && risk.signal === 'low') carbonState = 'stable'

  const enhNote = recentPositive
    ? 'Recent management action supports carbon recovery potential.'
    : carbonState === 'opportunity'
    ? 'Vegetation trend and conditions support carbon accumulation.'
    : carbonState === 'risk'
    ? 'Current conditions may be degrading carbon stocks.'
    : 'Conditions are stable with no strong carbon signal.'

  const reasons: string[] = []
  if (input.ndvi_trend === 'improving') reasons.push('Vegetation is improving')
  if (input.ndvi_trend === 'declining') reasons.push('Vegetation is declining')
  if (input.ndvi_trend === 'stable') reasons.push('Vegetation is stable')
  if (input.soil_moisture_state === 'supportive') reasons.push('moisture is supportive')
  if (input.soil_moisture_state === 'stressed') reasons.push('moisture is stressed')
  if (input.grazing_pressure === 'high') reasons.push('grazing pressure is excessive')
  else if (input.grazing_pressure !== 'high') reasons.push('grazing pressure is manageable')

  let decisionTag = 'monitor'
  if (carbonState === 'opportunity') decisionTag = 'protect_and_monitor'
  else if (carbonState === 'risk') decisionTag = 'intervene'

  return {
    id: `coo-${input.as_of_date}-${input.paddock_id}`,
    farm_id: input.farm_id,
    paddock_id: input.paddock_id,
    as_of_date: input.as_of_date,
    carbon_state: carbonState,
    carbon_opportunity_signal: opp.signal,
    carbon_risk_signal: risk.signal,
    carbon_value_estimate_band: val.band as 'low' | 'medium' | 'high',
    carbon_value_estimate_per_ha_usd: val.perHa,
    carbon_value_estimate_total_usd: val.total,
    carbon_enhancement_signal: recentPositive,
    carbon_enhancement_note: enhNote,
    reason_summary: reasons.join(', ') + '.',
    decision_tag: decisionTag,
    confidence: input.data_confidence,
    opportunity_score: opp.score,
    risk_score: risk.score,
    logic_version: '1.0.0',
    created_at: new Date().toISOString(),
  }
}
