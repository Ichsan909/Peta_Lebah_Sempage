import { locations } from './locations'
import { pxToLat, pxToLng } from '../utils/geo'
import type { LocationItem } from '../types/location'

// DEMO SAJA — titik ini hanya meniru sebaran marker pada peta referensi, bukan koordinat survei.
const PX: [number, number][] = [
  [658, 605], [674, 585], [650, 672], [616, 711], [560, 742], [548, 744], [523, 775], [513, 793], [443, 832],
  [451, 836], [477, 832], [504, 820], [445, 855], [402, 877], [400, 960], [386, 1000], [520, 780], [450, 848],
]
export const demoLocations: LocationItem[] = locations.map((l, i) => ({
  ...l, latitude: pxToLat(PX[i][1]), longitude: pxToLng(PX[i][0]), verified: false,
}))
