import { BookOpen, Banknote, Building2, Droplets, Flag, Hospital, Landmark, Mountain, School, Store, Trophy, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { categories, locations } from '../data/locations'

const ICONS: Record<string, LucideIcon> = {
  'sdn-1': School, 'sdn-2': School, 'sdn-3': School, 'masjid-nurul-jihad': Landmark, 'masjid-jamiq-nurul-ikhlas': Landmark,
  'masjid-nurul-iman': Landmark, 'sumber-mata-air': Droplets, 'goa-lawah': Mountain, sppg: Utensils, 'bmt-taawun': Banknote,
  'koperasi-desa': Store, 'pasar-desa': Store, 'yayasan-tarbiyatul-abna': BookOpen, 'lapangan-desa': Trophy,
  'kantor-desa': Building2, 'puskesmas-pembantu': Hospital, 'tugu-desa': Flag, 'tugu-perbatasan': Flag,
}

/** Ikon bulat per tempat. Hanya memakai inline style agar bisa dipakai di marker Leaflet. */
export default function PlaceBadge({ id, size, solid = false, ring = '#6b6b6b' }: { id: string; size: string; solid?: boolean; ring?: string }) {
  const Icon = ICONS[id] ?? Flag
  const color = categories[locations.find(l => l.id === id)?.category ?? 'fasilitas'].color
  return (
    <span style={{ display: 'inline-grid', placeItems: 'center', width: size, height: size, borderRadius: '50%', flex: 'none',
      background: solid ? color : `${color}33`, border: `2px solid ${solid ? ring : color}`, boxSizing: 'border-box' }}>
      <Icon style={{ width: '58%', height: '58%', color: solid ? '#fff' : color }} strokeWidth={2.2} />
    </span>
  )
}
