import type { LatLngBoundsExpression } from 'leaflet'

// Skala graticule pada peta referensi: 30" = ±105,3 px (bujur) dan ±105,5 px (lintang).
export const pxToLng = (x: number) => 116.25 + ((x - 279) / 105.3) * (30 / 3600)
export const pxToLat = (y: number) => -8.5 - ((y - 215) / 105.5) * (30 / 3600)

/** Cakupan peta sesuai bingkai pada peta referensi (x 177–1372, y 188–1052). */
export const BOUNDS: LatLngBoundsExpression = [[pxToLat(1052), pxToLng(177)], [pxToLat(188), pxToLng(1372)]]
