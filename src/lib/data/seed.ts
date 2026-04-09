import { Farm, Paddock, CarbonSignalInput, ManagementEvent, CarbonDecisionAnnotation } from '@/lib/types/carbon'

export const SEED_FARM: Farm = {
  id: 'farm-us-001', name: 'Blue Creek Ranch', country_code: 'US', state_code: 'TX',
  timezone: 'America/Chicago', centroid_lat: 31.245, centroid_lon: -99.123,
  created_at: '2026-04-10T00:00:00Z', updated_at: '2026-04-10T00:00:00Z'
}

export const SEED_PADDOCKS: Paddock[] = [
  { id: 'pdk-007', farm_id: 'farm-us-001', name: 'North Low Paddock', area_ha: 42.5,
    centroid_lat: 31.247, centroid_lon: -99.118, polygon_geojson: null, flood_prone: true,
    soil_type: 'clay_loam', created_at: '2026-04-10T00:00:00Z', updated_at: '2026-04-10T00:00:00Z' },
  { id: 'pdk-008', farm_id: 'farm-us-001', name: 'Ridge Top Paddock', area_ha: 38.0,
    centroid_lat: 31.251, centroid_lon: -99.115, polygon_geojson: null, flood_prone: false,
    soil_type: 'sandy_loam', created_at: '2026-04-10T00:00:00Z', updated_at: '2026-04-10T00:00:00Z' },
  { id: 'pdk-009', farm_id: 'farm-us-001', name: 'Creek Flat Paddock', area_ha: 55.2,
    centroid_lat: 31.243, centroid_lon: -99.126, polygon_geojson: null, flood_prone: true,
    soil_type: 'alluvial', created_at: '2026-04-10T00:00:00Z', updated_at: '2026-04-10T00:00:00Z' }
]

export const SEED_INPUTS: CarbonSignalInput[] = [
  { id: 'csi-2026-04-10-pdk-007', farm_id: 'farm-us-001', paddock_id: 'pdk-007', as_of_date: '2026-04-10',
    ndvi_current: 0.61, ndvi_14d_avg: 0.55, ndvi_30d_avg: 0.53, ndvi_trend: 'improving',
    soil_moisture_current: 0.31, soil_moisture_7d_avg: 0.28, soil_moisture_state: 'supportive',
    rainfall_7d_mm: 34.2, rainfall_30d_mm: 88.1, rainfall_context: 'adequate',
    grazing_pressure: 'medium', stocking_rate_estimate: 2.8, management_state: 'stable',
    data_confidence: 'medium', created_at: '2026-04-10T07:00:00Z' },
  { id: 'csi-2026-04-10-pdk-008', farm_id: 'farm-us-001', paddock_id: 'pdk-008', as_of_date: '2026-04-10',
    ndvi_current: 0.32, ndvi_14d_avg: 0.41, ndvi_30d_avg: 0.44, ndvi_trend: 'declining',
    soil_moisture_current: 0.11, soil_moisture_7d_avg: 0.14, soil_moisture_state: 'stressed',
    rainfall_7d_mm: 2.1, rainfall_30d_mm: 12.4, rainfall_context: 'dry',
    grazing_pressure: 'high', stocking_rate_estimate: 4.2, management_state: 'pressure',
    data_confidence: 'high', created_at: '2026-04-10T07:00:00Z' },
  { id: 'csi-2026-04-10-pdk-009', farm_id: 'farm-us-001', paddock_id: 'pdk-009', as_of_date: '2026-04-10',
    ndvi_current: 0.48, ndvi_14d_avg: 0.47, ndvi_30d_avg: 0.46, ndvi_trend: 'stable',
    soil_moisture_current: 0.25, soil_moisture_7d_avg: 0.24, soil_moisture_state: 'supportive',
    rainfall_7d_mm: 18.5, rainfall_30d_mm: 52.3, rainfall_context: 'adequate',
    grazing_pressure: 'low', stocking_rate_estimate: 1.2, management_state: 'stable',
    data_confidence: 'medium', created_at: '2026-04-10T07:00:00Z' }
]

export const SEED_EVENTS: ManagementEvent[] = [
  { id: 'evt-001', farm_id: 'farm-us-001', paddock_id: 'pdk-007', event_type: 'STOCK_MOVED',
    event_date: '2026-04-09', metadata: { head_moved: 120, reason: 'flood_risk' } }
]

export const SEED_DECISION_ANNOTATIONS: CarbonDecisionAnnotation[] = [
  { id: 'cda-dec-001', decision_id: 'dec-001', farm_id: 'farm-us-001', paddock_id: 'pdk-007',
    carbon_effect: 'positive', carbon_note: 'Protects pasture condition and preserves future carbon value potential.',
    carbon_value_delta_estimate_usd: 180.0, created_at: '2026-04-10T07:00:03Z' }
]
