import { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation, X } from 'lucide-react'
import { categories } from '../data/locations'
import { PLACEHOLDER } from './LocationCard'
import { coordStatus, directionsUrl } from '../utils/googleMaps'
import type { LocationItem } from '../types/location'

interface Props { loc: LocationItem; demo: boolean; onClose: () => void; onShowMap: (id: string) => void }

export default function LocationModal({ loc, demo, onClose, onShowMap }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [info, setInfo] = useState<string | null>(null)
  const url = directionsUrl(loc, !demo)
  const cat = categories[loc.category]

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const btn = 'inline-flex items-center gap-2 rounded-lg border-2 border-black px-4 py-3 text-sm font-bold focus-visible:outline-3 focus-visible:outline-yellow-400'
  return (
    <div className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/60 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog" aria-modal="true" aria-label={loc.name}
        onClick={e => e.stopPropagation()}
        className="pop max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-2xl border-2 border-[#3d4640] bg-[#e6ebe7] shadow-2xl sm:rounded-2xl"
      >
        <div className="relative">
          <img
            src={loc.image} alt={loc.name} className="aspect-[4/3] w-full object-cover"
            onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
          />
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Tutup" title="Tutup (Esc)"
            className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white shadow focus-visible:outline-3 focus-visible:outline-yellow-400">
            <X className="size-5" />
          </button>
        </div>
        <div className="space-y-3 p-5">
          <h2 className="m-0 text-2xl font-bold">{loc.name}</h2>
          <p className="m-0 flex items-center gap-2 text-sm">
            <span className="inline-block size-3.5 rounded-full border-2 border-black" style={{ background: cat.color }} />
            {cat.label}
          </p>
          <p className="m-0">{loc.description}</p>
          <p className="m-0 text-sm"><b>Status koordinat:</b> {coordStatus(loc, demo)}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" className={`${btn} bg-yellow-300`} onClick={() => onShowMap(loc.id)}>
              <MapPin className="size-4" /> Lihat di Peta
            </button>
            {url ? (
              <a className={`${btn} bg-white`} href={url} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-4" /> Petunjuk Jalan
              </a>
            ) : (
              <button type="button" className={`${btn} bg-white`}
                onClick={() => setInfo(demo ? 'Mode demo tidak membuat rute karena koordinatnya contoh.' : 'Koordinat dan alamat belum ditambahkan, jadi rute belum bisa dibuka.')}>
                <Navigation className="size-4" /> Petunjuk Jalan
              </button>
            )}
          </div>
          {info && <p role="status" className="m-0 text-sm text-red-700">{info}</p>}
        </div>
      </div>
    </div>
  )
}
