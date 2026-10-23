import { useEffect, useRef, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { GeoJSON, LayersControl, MapContainer, Marker, Popup, ScaleControl, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import type { GeoJsonObject } from 'geojson'
import { Maximize2, Minus, Plus, RotateCcw } from 'lucide-react'
import PlaceBadge from './PlaceBadge'
import { BOUNDS } from '../utils/geo'
import { getCoords } from '../utils/googleMaps'
import type { LocationItem } from '../types/location'

const pin = (id: string, active: boolean, demo: boolean) => {
  const s = active ? 28 : 20
  const badge = renderToStaticMarkup(<PlaceBadge id={id} size={`${s}px`} solid ring={demo ? '#fff' : '#111'} />)
  return L.divIcon({ className: '', iconSize: [s, s], html: `<div style="border-radius:50%;box-shadow:0 0 0 ${active ? 4 : 0}px #facc15">${badge}</div>` })
}

function Tick({ onTick }: { onTick: () => void }) {
  useMapEvents({ move: onTick, zoom: onTick, resize: onTick })
  return null
}

type Boundary = { status: 'loading' | 'empty' | 'error' } | { status: 'ready'; data: GeoJsonObject }

interface Props {
  items: LocationItem[]
  demo: boolean
  selected: string | null
  focus: { id: string; n: number } | null
  onOpen: (id: string) => void
  desktop: boolean
}

export default function MapCanvas({ items, demo, selected, focus, onOpen, desktop }: Props) {
  const [map, setMap] = useState<L.Map | null>(null)
  const [, setTick] = useState(0)
  const [boundary, setBoundary] = useState<Boundary>({ status: 'loading' })
  const [tileError, setTileError] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const markers = items.flatMap(l => { const c = getCoords(l); return c ? [{ l, c }] : [] })

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/batas-desa.geojson`)
      .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json() })
      .then((d: GeoJsonObject & { features?: unknown[] }) =>
        setBoundary(Array.isArray(d.features) && d.features.length > 0 ? { status: 'ready', data: d } : { status: 'empty' }))
      .catch(() => setBoundary({ status: 'error' }))
  }, [])

  // Pada desktop, tampilan selalu dikunci ke cakupan peta referensi saat ukuran berubah.
  useEffect(() => {
    if (!map || !wrap.current) return
    const refit = () => { map.invalidateSize(false); if (desktop) map.fitBounds(BOUNDS, { animate: false }) }
    const ro = new ResizeObserver(refit)
    ro.observe(wrap.current)
    refit()
    return () => ro.disconnect()
  }, [map, desktop])

  useEffect(() => {
    if (!map || !focus) return
    const item = items.find(i => i.id === focus.id)
    const c = item && getCoords(item)
    if (c) map.flyTo(c, 17)
  }, [focus]) // eslint-disable-line react-hooks/exhaustive-deps

  const fullscreen = () => {
    const el = wrap.current?.closest('[data-fs]')
    if (document.fullscreenElement) void document.exitFullscreen()
    else void (el as HTMLElement | null)?.requestFullscreen?.()
  }
  const tool = 'grid size-7 place-items-center border-2 border-black bg-white hover:bg-yellow-100 focus-visible:outline-3 focus-visible:outline-yellow-400 xl:size-[1.5cqw] xl:min-w-0'
  const msg = tileError ? 'Citra gagal dimuat. Pilih OpenStreetMap di kontrol lapisan.'
    : boundary.status === 'loading' ? 'Memuat batas desa…'
    : boundary.status === 'empty' ? 'Batas desa belum tersedia (tidak digambar tanpa data valid)'
    : boundary.status === 'error' ? 'Batas desa gagal dimuat' : ''

  return (
    <>
      <div ref={wrap} className="absolute inset-0 isolate">
        <MapContainer ref={setMap} bounds={BOUNDS} zoomSnap={0} zoomControl={false} className="h-full w-full bg-[#2f3d33]">
          <Tick onTick={() => setTick(t => t + 1)} />
          <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="Citra satelit">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles © Esri — Maxar, Earthstar Geographics, GIS User Community" maxZoom={19}
                eventHandlers={{ tileerror: () => setTileError(true), load: () => setTileError(false) }} />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenStreetMap">
              <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" maxZoom={19} />
            </LayersControl.BaseLayer>
          </LayersControl>
          <ScaleControl imperial={false} position="bottomleft" />
          {boundary.status === 'ready' && <GeoJSON data={boundary.data} style={{ color: '#e11d1d', weight: 2.5, fill: false }} />}
          {markers.map(({ l, c }) => (
            <Marker key={l.id} position={c} icon={pin(l.id, selected === l.id, demo)} eventHandlers={{ click: () => onOpen(l.id) }}>
              <Popup>
                <b>{demo && 'DEMO — '}{l.name}</b><br />
                <button type="button" className="underline" onClick={() => onOpen(l.id)}>Lihat detail</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="graticule pointer-events-none absolute inset-0 z-[450]" />
        {map && desktop && (
          <svg className="pointer-events-none absolute inset-0 z-[460] h-full w-full">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0 0L10 5L0 10z" fill="#ffe600" />
              </marker>
            </defs>
            {markers.map(({ l, c }) => {
              const el = document.querySelector(`[data-anchor="${l.id}"]`)
              const box = wrap.current?.getBoundingClientRect()
              if (!el || !box) return null
              const r = el.getBoundingClientRect()
              const p = map.latLngToContainerPoint(c)
              const cx = (r.left + r.right) / 2 - box.left, cy = (r.top + r.bottom) / 2 - box.top
              const side = el.getAttribute('data-side')
              const pts = side === 'left' ? [[p.x, p.y], [p.x, cy], [r.right - box.left, cy]]
                : side === 'right' ? [[p.x, p.y], [p.x, cy], [r.left - box.left, cy]]
                : side === 'top' ? [[p.x, p.y], [cx, p.y], [cx, r.bottom - box.top]]
                : [[p.x, p.y], [cx, p.y], [cx, r.top - box.top]]
              return <polyline key={l.id} points={pts.map(q => q.join(',')).join(' ')} fill="none" stroke="#ffe600" strokeWidth="2.2" markerEnd="url(#arrow)" />
            })}
          </svg>
        )}
      </div>
      {demo && (
        <div className="pointer-events-none absolute left-1/2 top-9 z-30 -translate-x-1/2 bg-red-600 px-3 py-1 text-xs font-bold text-white">
          DEMO — marker contoh, bukan lokasi asli
        </div>
      )}
      {msg && <div className="pointer-events-none absolute left-1/2 top-2 z-30 -translate-x-1/2 bg-black/70 px-2 py-1 text-[11px] text-white" role="status">{msg}</div>}
      <div className="absolute left-2 top-2 z-30 flex gap-1.5 xl:left-[0.4cqw] xl:top-[0.4cqw] xl:gap-[0.3cqw]">
        <button type="button" className={tool} title="Perbesar" aria-label="Perbesar" onClick={() => map?.zoomIn()}><Plus className="size-4 xl:size-[60%]" /></button>
        <button type="button" className={tool} title="Perkecil" aria-label="Perkecil" onClick={() => map?.zoomOut()}><Minus className="size-4 xl:size-[60%]" /></button>
        <button type="button" className={tool} title="Reset tampilan peta" aria-label="Reset tampilan peta" onClick={() => map?.fitBounds(BOUNDS)}><RotateCcw className="size-4 xl:size-[60%]" /></button>
        <button type="button" className={tool} title="Layar penuh" aria-label="Layar penuh" onClick={fullscreen}><Maximize2 className="size-4 xl:size-[60%]" /></button>
      </div>
    </>
  )
}
