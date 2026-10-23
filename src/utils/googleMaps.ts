import type { LocationItem } from '../types/location'

export function getCoords(l: Pick<LocationItem, 'latitude' | 'longitude'>): [number, number] | null {
  const { latitude: lat, longitude: lng } = l
  if (lat == null || lng == null || !Number.isFinite(lat) || !Number.isFinite(lng)) return null
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null
  return [lat, lng]
}

/** URL Google Maps: rute ke koordinat, atau pencarian alamat. null jika keduanya tidak ada. */
export function directionsUrl(l: LocationItem, allowCoords = true): string | null {
  const c = allowCoords ? getCoords(l) : null
  if (c) return `https://www.google.com/maps/dir/?api=1&destination=${c[0]},${c[1]}`
  if (l.address) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address)}`
  return null
}

export function coordStatus(l: LocationItem, demo: boolean): string {
  if (demo) return 'DEMO — koordinat contoh, bukan lokasi sebenarnya'
  if (!getCoords(l)) return 'Koordinat belum ditambahkan'
  return l.verified ? 'Koordinat terverifikasi' : 'Koordinat belum diverifikasi'
}
