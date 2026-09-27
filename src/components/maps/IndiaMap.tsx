import { useEffect, useState } from 'react'
import { MapContainer, GeoJSON, CircleMarker, Tooltip as LeafletTooltip } from 'react-leaflet'
import type { Layer, StyleFunction } from 'leaflet'
import type { Feature } from 'geojson'
import { incidents } from '@/data/incidents'
import type { Incident, Severity } from '@/types/incident'
import { useMapStore } from '@/store/mapStore'
import 'leaflet/dist/leaflet.css'

const SEVERITY_COLOR: Record<Severity, string> = {
  critical: '#DC2626', high: '#EA580C', moderate: '#D97706', low: '#16A34A',
}

const STATE_WITH_INCIDENT = new Set(incidents.map((i) => i.state))

interface IndiaMapProps {
  onSelectIncident: (incident: Incident) => void
  height?: string
}

export function IndiaMap({ onSelectIncident, height = '100%' }: IndiaMapProps) {
  const [geojson, setGeojson] = useState<GeoJSON.FeatureCollection | null>(null)
  const setSelectedState = useMapStore((s) => s.setSelectedState)

  useEffect(() => {
    fetch('/india-states.geojson').then((r) => r.json()).then(setGeojson)
  }, [])

  const style: StyleFunction = (feature?: Feature) => {
    const name = feature?.properties?.name as string
    const active = STATE_WITH_INCIDENT.has(name)
    return {
      fillColor: active ? '#0B3D91' : '#CBD5E1',
      fillOpacity: active ? 0.12 : 0.35,
      color: active ? '#0B3D91' : '#94A3B8',
      weight: active ? 1.1 : 0.6,
    }
  }

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const name = feature.properties?.name as string
    layer.on('click', () => setSelectedState(name))
    layer.bindTooltip(name, { sticky: true, className: '!text-xs !rounded-md !border-border' })
  }

  return (
    <MapContainer center={[22.5, 80]} zoom={5} minZoom={4} maxZoom={8} style={{ height, width: '100%', background: '#EEF2F7' }} zoomControl={false} attributionControl={false}>
      {geojson && <GeoJSON data={geojson} style={style} onEachFeature={onEachFeature} />}
      {incidents.map((inc) => (
        <CircleMarker
          key={inc.id}
          center={[inc.lat, inc.lng]}
          radius={inc.severity === 'critical' ? 11 : 8}
          pathOptions={{ color: '#fff', weight: 2, fillColor: SEVERITY_COLOR[inc.severity], fillOpacity: 0.9 }}
          eventHandlers={{ click: () => onSelectIncident(inc) }}
        >
          <LeafletTooltip direction="top" offset={[0, -6]}>
            <div className="text-xs font-medium">{inc.city} — {inc.event}</div>
          </LeafletTooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
