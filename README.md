# realm-carbon-intelligence
REALM Carbon Intelligence - Localised carbon condition and opportunity signal service for US farms

## Overview
Location-based carbon intelligence overlay for US farms. Provides per-paddock carbon opportunity signals, risk signals, and decision annotations.

## API Endpoints
- `GET /api/farms/{farmId}/carbon` - Carbon overlay for all paddocks
- `GET /api/decisions/{decisionId}/carbon` - Carbon annotation for a decision
- `POST /api/farms/{farmId}/carbon/rebuild` - Rebuild carbon signals

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Deployed on Vercel
