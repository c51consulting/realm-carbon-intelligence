import { CountryConfig } from '@/lib/types/carbon'

export const US_CONFIG: CountryConfig = {
  country_code: 'US',
  currency: 'USD',
  units: { area: 'ha', rainfall: 'mm' },
  carbon_price_reference_usd: 25,
  opportunity_low_per_ha: 4,
  opportunity_medium_per_ha: 12,
  opportunity_high_per_ha: 22,
  risk_low_per_ha: -4,
  risk_medium_per_ha: -10,
  risk_high_per_ha: -18,
}
