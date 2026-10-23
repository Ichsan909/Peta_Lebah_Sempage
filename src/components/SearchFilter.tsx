import { Search } from 'lucide-react'
import { categories } from '../data/locations'
import type { CategoryKey } from '../types/location'

interface Props {
  query: string; onQuery: (v: string) => void
  cat: CategoryKey | 'all'; onCat: (c: CategoryKey | 'all') => void
  demo: boolean; onDemo: (v: boolean) => void
  count: number; total: number
}

export default function SearchFilter({ query, onQuery, cat, onCat, demo, onDemo, count, total }: Props) {
  const chip = (active: boolean) =>
    `rounded-full border-2 border-black px-3 py-1.5 text-sm ${active ? 'bg-black text-white' : 'bg-white'}`
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2 rounded-lg border border-black bg-white p-2 text-sm">
      <label className="flex min-w-[200px] flex-1 items-center gap-2 border-2 border-black px-2 py-1.5">
        <Search className="size-4" />
        <input value={query} onChange={e => onQuery(e.target.value)} placeholder="Cari tempat…" aria-label="Cari tempat"
          className="w-full bg-transparent outline-none" />
      </label>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter kategori">
        <button type="button" className={chip(cat === 'all')} onClick={() => onCat('all')}>Semua</button>
        {(Object.keys(categories) as CategoryKey[]).map(k => (
          <button key={k} type="button" className={chip(cat === k)} onClick={() => onCat(k)} title={categories[k].label}>
            {categories[k].label}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2" title="Menampilkan marker contoh berlabel DEMO">
        <input type="checkbox" checked={demo} onChange={e => onDemo(e.target.checked)} /> Mode demo
      </label>
      <span role="status">
        {count === 0 ? (
          <>Tidak ada hasil. <button type="button" className="underline" onClick={() => { onQuery(''); onCat('all') }}>Reset pencarian</button></>
        ) : `${count} dari ${total} tempat`}
      </span>
    </div>
  )
}
