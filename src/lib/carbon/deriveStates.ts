import { NdviTrend, SoilMoistureState, RainfallContext, GrazingPressure } from '@/lib/types/carbon'

export function deriveNdviTrend(current: number, avg14d: number): NdviTrend {
  if (current >= avg14d + 0.04) return 'improving'
  if (current <= avg14d - 0.04) return 'declining'
  return 'stable'
}

export function deriveSoilMoistureState(current: number): SoilMoistureState {
  if (current < 0.15) return 'stressed'
  if (current <= 0.40) return 'supportive'
  return 'wet'
}

export function deriveRainfallContext(rainfall30d: number): RainfallContext {
  if (rainfall30d < 20) return 'dry'
  if (rainfall30d <= 100) return 'adequate'
  return 'high'
}

export function deriveGrazingPressure(stockingRate: number): GrazingPressure {
  if (stockingRate > 3.5) return 'high'
  if (stockingRate >= 1.5) return 'medium'
  return 'low'
}
