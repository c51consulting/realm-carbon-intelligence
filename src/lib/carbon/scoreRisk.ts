import { CarbonSignalInput, SignalLevel } from '@/lib/types/carbon'

export function scoreRisk(input: CarbonSignalInput, floodProne: boolean): { score: number; signal: SignalLevel } {
  let score = 0
  if (input.ndvi_trend === 'declining') score += 40
  if (input.soil_moisture_state === 'stressed') score += 20
  if (input.rainfall_context === 'dry') score += 15
  if (input.grazing_pressure === 'high') score += 20
  if (floodProne && input.soil_moisture_state === 'wet') score += 5

  let signal: SignalLevel = 'low'
  if (score >= 70) signal = 'high'
  else if (score >= 45) signal = 'medium'

  return { score, signal }
}
