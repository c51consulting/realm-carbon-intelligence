import { CarbonEffect } from '@/lib/types/carbon'

interface DecisionContext {
  category: string
  reducesGrazingPressure: boolean
  protectsPastureRecovery: boolean
  avoidsWaterloggingDamage: boolean
  increasePressureOnStressed: boolean
  delaysRecovery: boolean
}

export function annotateDecision(ctx: DecisionContext): {
  effect: CarbonEffect
  note: string
  valueDelta: number
} {
  if (ctx.reducesGrazingPressure || ctx.protectsPastureRecovery || ctx.avoidsWaterloggingDamage) {
    return {
      effect: 'positive',
      note: ctx.reducesGrazingPressure
        ? 'Reduces grazing pressure and protects carbon recovery potential.'
        : ctx.protectsPastureRecovery
        ? 'Protects pasture recovery and supports future carbon value.'
        : 'Avoids waterlogging damage and preserves soil carbon condition.',
      valueDelta: 180,
    }
  }

  if (ctx.increasePressureOnStressed || ctx.delaysRecovery) {
    return {
      effect: 'negative',
      note: ctx.increasePressureOnStressed
        ? 'Increases pressure on stressed paddock and risks carbon loss.'
        : 'Delays needed recovery and prolongs degradation risk.',
      valueDelta: -120,
    }
  }

  return { effect: 'neutral', note: 'No significant carbon impact detected.', valueDelta: 0 }
}
