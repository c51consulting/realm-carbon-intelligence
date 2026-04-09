export type NdviTrend = 'improving' | 'declining' | 'stable'
export type SoilMoistureState = 'stressed' | 'supportive' | 'wet'
export type RainfallContext = 'dry' | 'adequate' | 'high'
export type GrazingPressure = 'low' | 'medium' | 'high'
export type CarbonState = 'opportunity' | 'risk' | 'mixed' | 'stable'
export type SignalLevel = 'low' | 'medium' | 'high'
export type CarbonEffect = 'positive' | 'negative' | 'neutral'
export type ValueBand = 'low' | 'medium' | 'high'

export interface Farm {
  id: string
  name: string
  country_code: string
  state_code: string
  timezone: string
  centroid_lat: number
  centroid_lon: number
  created_at: string
  updated_at: string
}

export interface Paddock {
  id: string
  farm_id: string
  name: string
  area_ha: number
  centroid_lat: number
  centroid_lon: number
  polygon_geojson: object | null
  flood_prone: boolean
  soil_type: string
  created_at: string
  updated_at: string
}

export interface LivestockGroup {
  id: string
  farm_id: string
  paddock_id: string
  species: string
  head_count: number
  value_band: string
  mobility: string
  created_at: string
  updated_at: string
}

export interface ManagementEvent {
  id: string
  farm_id: string
  paddock_id: string
  event_type: string
  event_date: string
  metadata: Record<string, unknown>
}

export interface CarbonSignalInput {
  id: string
  farm_id: string
  paddock_id: string
  as_of_date: string
  ndvi_current: number
  ndvi_14d_avg: number
  ndvi_30d_avg: number
  ndvi_trend: NdviTrend
  soil_moisture_current: number
  soil_moisture_7d_avg: number
  soil_moisture_state: SoilMoistureState
  rainfall_7d_mm: number
  rainfall_30d_mm: number
  rainfall_context: RainfallContext
  grazing_pressure: GrazingPressure
  stocking_rate_estimate: number
  management_state: string
  data_confidence: string
  created_at: string
}

export interface CarbonOverlayOutput {
  id: string
  farm_id: string
  paddock_id: string
  as_of_date: string
  carbon_state: CarbonState
  carbon_opportunity_signal: SignalLevel
  carbon_risk_signal: SignalLevel
  carbon_value_estimate_band: ValueBand
  carbon_value_estimate_per_ha_usd: number
  carbon_value_estimate_total_usd: number
  carbon_enhancement_signal: boolean
  carbon_enhancement_note: string
  reason_summary: string
  decision_tag: string
  confidence: string
  opportunity_score: number
  risk_score: number
  logic_version: string
  created_at: string
}

export interface CarbonDecisionAnnotation {
  id: string
  decision_id: string
  farm_id: string
  paddock_id: string
  carbon_effect: CarbonEffect
  carbon_note: string
  carbon_value_delta_estimate_usd: number
  created_at: string
}

export interface CountryConfig {
  country_code: string
  currency: string
  units: { area: string; rainfall: string }
  carbon_price_reference_usd: number
  opportunity_low_per_ha: number
  opportunity_medium_per_ha: number
  opportunity_high_per_ha: number
  risk_low_per_ha: number
  risk_medium_per_ha: number
  risk_high_per_ha: number
}
