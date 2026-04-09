import { CarbonSignalInput, SignalLevel } from '@/lib/types/carbon'

export function scoreOpportunity(input: CarbonSignalInput, recentPositiveEvent: boolean): { score: number; signal: SignalLevel } {
  let score = 0
  if (input.ndvi_trend === 'improving') score += 40
  if (input.soil_moisture_state === 'supportive') score += 20
  if (input.rainfall_context === 'adequate') score += 15
  if (input.grazing_pressure === 'low' || input.grazing_pressure === 'medium') score += 15
  if (recentPositiveEvent) score += 10

  let signal: SignalLevel = 'low'
  if (score >= 70) signal = 'high'
  else if (score >= 45) signal = 'medium'

  return { score, signal }
}
