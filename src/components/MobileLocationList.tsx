import LocationCard from './LocationCard'
import type { LocationItem } from '../types/location'

interface Props { items: LocationItem[]; selected: string | null; onOpen: (id: string) => void; onReset: () => void }

export default function MobileLocationList({ items, selected, onOpen, onReset }: Props) {
  if (items.length === 0) {
    return (
      <div className="border border-black bg-white p-4 text-center">
        <p className="m-0">Tidak ada tempat yang cocok dengan pencarian.</p>
        <button type="button" onClick={onReset} className="mt-2 rounded border-2 border-black px-3 py-2 font-bold">Tampilkan semua tempat</button>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {items.map(l => <LocationCard key={l.id} loc={l} onOpen={onOpen} selected={selected === l.id} />)}
    </div>
  )
}
