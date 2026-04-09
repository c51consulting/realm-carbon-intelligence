import { SEED_FARM, SEED_PADDOCKS, SEED_INPUTS, SEED_EVENTS, SEED_DECISION_ANNOTATIONS } from '@/lib/data/seed'
import { computeOverlay } from '@/lib/carbon/computeOverlay'

const stateColors: Record<string, string> = {
  opportunity: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  risk: 'bg-red-500/20 text-red-400 border-red-500/30',
  mixed: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  stable: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const stateBadge: Record<string, string> = {
  opportunity: 'bg-emerald-500', risk: 'bg-red-500', mixed: 'bg-amber-500', stable: 'bg-gray-500',
}

export default function Home() {
  const results = SEED_PADDOCKS.map(paddock => {
    const input = SEED_INPUTS.find(i => i.paddock_id === paddock.id)
    if (!input) return null
    const events = SEED_EVENTS.filter(e => e.paddock_id === paddock.id)
    const output = computeOverlay(input, paddock, events)
    return { ...output, paddock_name: paddock.name, area_ha: paddock.area_ha }
  }).filter(Boolean)

  const oppCount = results.filter(r => r?.carbon_state === 'opportunity').length
  const riskCount = results.filter(r => r?.carbon_state === 'risk').length
  const annotation = SEED_DECISION_ANNOTATIONS[0]

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <p className="text-sm text-emerald-400 mb-2">Part of the REALM Overlay Ecosystem</p>
        <h1 className="text-4xl font-bold mb-2">Know What Carbon Condition Is Doing</h1>
        <p className="text-gray-400 text-lg">Localised carbon signals for US farms, paddocks, and coordinate sets.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{SEED_FARM.name}</h2>
            <p className="text-sm text-gray-400">{SEED_FARM.state_code}, US | {SEED_FARM.centroid_lat}, {SEED_FARM.centroid_lon}</p>
          </div>
          <div className="text-sm text-gray-500">As of 2026-04-10</div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{oppCount}</div>
            <div className="text-xs text-gray-400">Opportunity</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{riskCount}</div>
            <div className="text-xs text-gray-400">At Risk</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{results.length - oppCount - riskCount}</div>
            <div className="text-xs text-gray-400">Stable/Mixed</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{results.length}</div>
            <div className="text-xs text-gray-400">Total Paddocks</div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Paddock Carbon Overlay</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {results.map(r => r && (
          <div key={r.paddock_id} className={`border rounded-xl p-5 ${stateColors[r.carbon_state]}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">{r.paddock_name}</h4>
              <span className={`px-2 py-1 rounded text-xs font-medium text-white ${stateBadge[r.carbon_state]}`}>
                {r.carbon_state.toUpperCase()}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">
              {r.carbon_value_estimate_per_ha_usd >= 0 ? '+' : ''}${r.carbon_value_estimate_per_ha_usd}/ha
            </div>
            <div className="text-sm opacity-80 mb-3">
              Total: ${r.carbon_value_estimate_total_usd} | {r.area_ha} ha
            </div>
            <div className="text-sm mb-2">{r.carbon_enhancement_note}</div>
            <div className="text-xs opacity-60">{r.reason_summary}</div>
            <div className="mt-3 flex gap-2 text-xs">
              <span className="bg-black/20 px-2 py-1 rounded">Opp: {r.opportunity_score}</span>
              <span className="bg-black/20 px-2 py-1 rounded">Risk: {r.risk_score}</span>
              <span className="bg-black/20 px-2 py-1 rounded">{r.confidence}</span>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-4">Decision Carbon Annotation</h3>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">POSITIVE</span>
          <span className="text-sm text-gray-400">Decision: dec-001 | Move stock off North Low Paddock</span>
        </div>
        <p className="text-sm">{annotation.carbon_note}</p>
        <p className="text-sm text-emerald-400 mt-1">Carbon value delta: +${annotation.carbon_value_delta_estimate_usd}</p>
      </div>

      <div className="border border-gray-800 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Carbon Signal at a Glance</h3>
        <p className="text-sm text-gray-400 mb-4">A single clear signal for each paddock.</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="text-emerald-400 font-bold text-lg">OPP</div>
            <div className="text-xs text-gray-400">Carbon recovery rising</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="text-amber-400 font-bold text-lg">MIXED</div>
            <div className="text-xs text-gray-400">Mixed signals. Monitor.</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="text-red-400 font-bold text-lg">RISK</div>
            <div className="text-xs text-gray-400">Carbon condition declining</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-600">
        <p>REALM Carbon Intelligence v1.0 | USA Coverage | Not a carbon registry or credit issuance engine</p>
        <p className="mt-1">API: /api/farms/farm-us-001/carbon | /api/decisions/dec-001/carbon</p>
      </div>
    </main>
  )
}
