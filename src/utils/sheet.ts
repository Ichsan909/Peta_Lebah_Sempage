import type { CSSProperties } from 'react'

/** Lembar acuan (px pada gambar referensi). Semua elemen desktop diposisikan dalam persen dari lembar ini. */
export const REF = { x0: 152, y0: 4, w: 1616, h: 1068 }
export const u = (n: number) => `calc(var(--u) * ${n})`
export const box = (x: number, y: number, w: number, h: number): CSSProperties => ({
  position: 'absolute',
  left: `${((x - REF.x0) / REF.w) * 100}%`,
  top: `${((y - REF.y0) / REF.h) * 100}%`,
  width: `${(w / REF.w) * 100}%`,
  height: `${(h / REF.h) * 100}%`,
})

export type Side = 'left' | 'right' | 'top' | 'bottom'
export const SLOTS: Record<string, [number, number, number, number, Side]> = {
  'sdn-3': [180, 316, 134, 115, 'left'], 'masjid-nurul-jihad': [180, 437, 134, 115, 'left'],
  'sumber-mata-air': [180, 559, 134, 115, 'left'], 'goa-lawah': [180, 682, 134, 115, 'left'],
  sppg: [180, 805, 134, 115, 'left'], 'bmt-taawun': [180, 928, 134, 115, 'left'],
  'sdn-2': [313, 195, 134, 113, 'top'], 'kantor-desa': [453, 195, 135, 113, 'top'],
  'tugu-desa': [1224, 208, 134, 115, 'right'], 'koperasi-desa': [1224, 329, 134, 115, 'right'],
  'pasar-desa': [1224, 451, 134, 115, 'right'], 'yayasan-tarbiyatul-abna': [1224, 573, 134, 115, 'right'],
  'masjid-jamiq-nurul-ikhlas': [1224, 696, 134, 115, 'right'], 'sdn-1': [1224, 818, 134, 115, 'right'],
  'tugu-perbatasan': [643, 935, 134, 113, 'bottom'], 'masjid-nurul-iman': [790, 935, 134, 113, 'bottom'],
  'puskesmas-pembantu': [937, 935, 134, 113, 'bottom'], 'lapangan-desa': [1080, 935, 134, 113, 'bottom'],
}
