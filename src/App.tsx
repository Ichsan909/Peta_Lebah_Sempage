import { useCallback, useMemo, useRef, useState } from 'react'
import LocationCard from './components/LocationCard'
import LocationModal from './components/LocationModal'
import LogoBlock from './components/LogoBlock'
import MapCanvas from './components/MapCanvas'
import MapHeader from './components/MapHeader'
import MapLegend from './components/MapLegend'
import MobileLocationList from './components/MobileLocationList'
import SearchFilter from './components/SearchFilter'
import { categories, locations } from './data/locations'
import { demoLocations } from './data/demo'
import { useIsDesktop } from './hooks/useIsDesktop'
import { getCoords } from './utils/googleMaps'
import { box, SLOTS, u } from './utils/sheet'
import type { CategoryKey } from './types/location'

const LON_LABELS = ["116°15'0\"E", "116°15'30\"E", "116°16'0\"E", "116°16'30\"E", "116°17'0\"E", "116°17'30\"E", "116°18'0\"E", "116°18'30\"E", "116°19'0\"E", "116°19'30\"E", "116°20'0\"E"]
const LAT_LABELS = ["8°30'0\"S", "8°30'30\"S", "8°31'0\"S", "8°31'30\"S", "8°32'0\"S", "8°32'30\"S", "8°33'0\"S", "8°33'30\"S"]

export default function App() {
  const desktop = useIsDesktop()
  const [demo, setDemo] = useState(false)
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<CategoryKey | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [focus, setFocus] = useState<{ id: string; n: number } | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const timer = useRef<number>()

  const data = demo ? demoLocations : locations
  const byId = useMemo(() => Object.fromEntries(data.map(l => [l.id, l])), [data])
  const q = query.trim().toLowerCase()
  const matches = (id: string) => {
    const l = byId[id]
    return (cat === 'all' || l.category === cat) && (!q || `${l.name} ${l.description} ${categories[l.category].label}`.toLowerCase().includes(q))
  }
  const shown = data.filter(l => matches(l.id))

  const open = (id: string) => { setSelected(id); setOpenId(id) }
  const close = useCallback(() => setOpenId(null), [])
  const showOnMap = (id: string) => {
    setOpenId(null); setSelected(id)
    if (getCoords(byId[id])) { setFocus({ id, n: Date.now() }); return }
    setNotice(`Koordinat ${byId[id].name} belum ditambahkan, jadi peta tidak dipindahkan.`)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setNotice(null), 4500)
  }
  const reset = () => { setQuery(''); setCat('all') }
  const toast = notice && <p role="status" className="m-0 bg-white p-3 text-center text-sm shadow-lg">{notice}</p>

  return (
    <div className="mx-auto max-w-[1800px] p-2">
      <SearchFilter query={query} onQuery={setQuery} cat={cat} onCat={setCat} demo={demo} onDemo={setDemo} count={shown.length} total={data.length} />
      {desktop ? (
        <div className="sheet-wrap" data-fs>
          <div className="sheet"><div className="sheet-in">
            <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 0 calc(var(--u) * 3) #000' }} />
            <div className="frame" style={box(160, 10, 1228, 157)}><MapHeader sheet /></div>
            <div className="frame" style={box(1392, 10, 368, 157)}><LogoBlock sheet /></div>
            <div className="frame" style={box(160, 172, 1228, 896)}>
              {LON_LABELS.flatMap((t, k) => [1.5, 881].map(y => (
                <span key={`${t}${y}`} className="absolute font-bold" style={{ left: `${((279 + 105.3 * k - 160) / 1228) * 100}%`, top: `${((y + 172 - 172 - 0) / 896) * 100}%`, transform: 'translateX(-50%)', fontSize: u(11.5), lineHeight: 1, whiteSpace: 'nowrap' }}>{t}</span>
              )))}
              {LAT_LABELS.flatMap((t, k) => [8, 1220].map(x => (
                <span key={`${t}${x}`} className="absolute font-bold" style={{ left: `${(x / 1228) * 100}%`, top: `${((215 + 105.5 * k - 172) / 896) * 100}%`, transform: 'translate(-50%,-50%) rotate(-90deg)', fontSize: u(11.5), whiteSpace: 'nowrap' }}>{t}</span>
              )))}
            </div>
            <div style={{ ...box(177, 188, 1195, 864), overflow: 'hidden' }}>
              <MapCanvas items={data} demo={demo} selected={selected} focus={focus} onOpen={open} desktop />
              {notice && <div className="absolute left-1/2 top-[30%] z-40 w-[50%] -translate-x-1/2">{toast}</div>}
            </div>
            {Object.entries(SLOTS).map(([id, [x, y, w, h, side]]) => (
              <LocationCard key={id} loc={byId[id]} onOpen={open} sheet side={side} style={{ ...box(x, y, w, h), zIndex: 5 }}
                selected={selected === id} dim={!matches(id)} />
            ))}
            <div style={box(1392, 172, 368, 896)}><MapLegend sheet /></div>
          </div></div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="border-[3px] border-black bg-white p-1"><div className="border border-black"><MapHeader /></div></div>
          <div className="border border-black bg-white p-1"><LogoBlock /></div>
          <div data-fs className="relative h-[65vh] min-h-[360px] overflow-hidden border border-black bg-[#2f3d33]">
            <MapCanvas items={data} demo={demo} selected={selected} focus={focus} onOpen={open} desktop={false} />
          </div>
          {toast}
          <MapLegend />
          <MobileLocationList items={shown} selected={selected} onOpen={open} onReset={reset} />
        </div>
      )}
      {openId && byId[openId] && <LocationModal loc={byId[openId]} demo={demo} onClose={close} onShowMap={showOnMap} />}
    </div>
  )
}
