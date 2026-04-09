import { SignalLevel, CountryConfig } from '@/lib/types/carbon'

export function estimateValue(
  opportunitySignal: SignalLevel,
  riskSignal: SignalLevel,
  areaHa: number,
  config: CountryConfig
): { perHa: number; total: number; band: string } {
  let perHa = 0

  if (opportunitySignal === 'high') perHa = config.opportunity_high_per_ha
  else if (opportunitySignal === 'medium') perHa = config.opportunity_medium_per_ha
  else if (riskSignal === 'high') perHa = config.risk_high_per_ha
  else if (riskSignal === 'medium') perHa = config.risk_medium_per_ha

  const total = Math.round(perHa * areaHa * 100) / 100

  let band = 'low'
  if (Math.abs(perHa) >= 18) band = 'high'
  else if (Math.abs(perHa) >= 10) band = 'medium'

  return { perHa, total, band }
}
