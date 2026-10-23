import type { CSSProperties } from 'react'
import { categories } from '../data/locations'
import { u, type Side } from '../utils/sheet'
import type { LocationItem } from '../types/location'

export const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#c9d1cb"/><text x="200" y="154" font-family="Georgia" font-size="24" text-anchor="middle" fill="#4b5a52">Foto belum tersedia</text></svg>')

interface Props {
  loc: LocationItem
  onOpen: (id: string) => void
  selected?: boolean
  dim?: boolean
  sheet?: boolean
  side?: Side
  style?: CSSProperties
}

export default function LocationCard({ loc, onOpen, selected, dim, sheet, side, style }: Props) {
  const f = (n: number) => (sheet ? u(n) : `${n}px`)
  return (
    <button
      type="button"
      data-anchor={sheet ? loc.id : undefined}
      data-side={side}
      onClick={() => onOpen(loc.id)}
      title={`${loc.name} — ${categories[loc.category].label}`}
      className={`flex cursor-pointer flex-col text-left transition hover:-translate-y-px hover:brightness-105 focus-visible:outline-3 focus-visible:outline-yellow-400 ${dim ? 'opacity-30' : ''}`}
      style={{
        ...style, width: sheet ? style?.width : '100%', padding: f(sheet ? 6 : 6), boxSizing: 'border-box',
        borderRadius: f(14), border: `${f(sheet ? 2 : 2.5)} solid #3f4d47`, background: '#8a9a94',
        boxShadow: selected ? `0 0 0 ${f(4)} #facc15` : `0 ${f(2)} ${f(5)} rgba(0,0,0,.35)`, fontFamily: "'Times New Roman',Times,serif",
      }}
    >
      <img src={loc.image} alt={loc.name} loading="lazy" className="block w-full object-cover" decoding="async"
        style={sheet ? { flex: '1 1 0', minHeight: 0, border: `${f(1)} solid #333` } : { aspectRatio: '4/3', border: `${f(1)} solid #333` }}
        onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }} />
      <span className="flex flex-none items-center justify-center text-center font-bold uppercase"
        style={{ marginTop: f(sheet ? 4 : 5), padding: `${f(1)} ${f(2)}`, background: '#fff', border: `${f(1)} solid #222`, fontSize: sheet ? u(8.8) : 10.5, lineHeight: 1.08, color: '#111', minHeight: sheet ? u(24) : undefined }}>
        <span style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden' }}>{loc.name}</span>
      </span>
    </button>
  )
}
