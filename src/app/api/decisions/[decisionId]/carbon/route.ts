import { NextResponse } from 'next/server'
import { SEED_DECISION_ANNOTATIONS } from '@/lib/data/seed'

export async function GET(_req: Request, { params }: { params: { decisionId: string } }) {
  const annotation = SEED_DECISION_ANNOTATIONS.find(a => a.decision_id === params.decisionId)
  if (!annotation) return NextResponse.json({ error: 'Decision not found' }, { status: 404 })
  return NextResponse.json({
    decision_id: annotation.decision_id,
    carbon_effect: annotation.carbon_effect,
    carbon_note: annotation.carbon_note,
    carbon_value_delta_estimate_usd: annotation.carbon_value_delta_estimate_usd,
    confidence: 'low',
  })
}
