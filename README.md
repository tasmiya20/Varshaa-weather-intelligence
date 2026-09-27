# VARSHAA — National Weather Intelligence & Ground-Truth Network

Production-quality React + TypeScript frontend for Smart India Hackathon
Problem Statement 26069 (Ministry of Earth Sciences / IMD).

## Stack
React 18 · TypeScript · Vite · Tailwind CSS · React Router · Zustand ·
Recharts · Leaflet/React-Leaflet · Framer Motion · React Hook Form + Zod

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To type-check and build for production:

```bash
npm run build
npm run preview
```

This has already been verified in a clean environment: `tsc -b` passes with
no errors and `npm run build` succeeds end-to-end.

## Architecture

```
src/
├── app/          # App shell + routing
├── components/   # ui, layout, maps, charts, incidents, verification, command-center
├── pages/        # One file per route
├── data/         # Seeded demo data ("DEMO STREAM")
├── services/     # Mock service layer — same interface a real backend would expose
├── store/        # Zustand stores (incidents, dashboard, map)
├── types/        # Shared TypeScript types
└── utils/        # cn() class helper
public/india-states.geojson   # Real, simplified state/UT boundaries (all 36)
```

Every `services/*.ts` file is written as an adapter: swap the mock
implementation for a real `fetch()` call to FastAPI/Kafka/PostGIS/BHASHINI
etc. without touching any component or page.

## What's real vs. simplified in this build

**Fully working:** routing across all 13 pages, the Leaflet map with real
(simplified) Indian state boundaries and clickable incident markers, the
incident drawer (Overview/Evidence/Timeline/Media tabs), filterable incident
list, AI Verification Lab pipeline animation + two comparison panels, Citizen
Report form with Zod validation and working photo/video upload + preview,
a voice-to-incident simulation, Recharts analytics, Alert Command with a
live preview, Regional Intelligence map-click panel, Disaster Replay
scrubber, Judge Demo modal (11-step scripted scenario), Admin verification
queue, System Health with auto-refreshing mock metrics, and global
Ctrl/Cmd+K search.

**Simplified for this first delivery** (flagged here rather than glossed
over): map boundaries are simplified polygons, not survey-grade; photo/video
"evidence" in the incident drawer uses labeled placeholder tiles (no real
photos are fabricated, for both honesty and copyright reasons) — the
Citizen Report form's own upload *does* show real thumbnails of whatever you
upload; BHASHINI, real map tiles, and backend services are adapters only,
not live integrations; heatmap/cluster-expansion map layers are UI toggles
without live data behind every layer yet.

## Environment variables

Copy `.env.example` to `.env` and fill in real keys when you connect real
services. Nothing is hardcoded.

## Data & ethics notes

All incident, report and analytics data is seeded demo data, clearly
labeled "DEMO STREAM" — no real citizen or government data is used. AI
confidence scores are described as evidence strength, never as proof of
authenticity.
