export type CategoryKey = 'wisata' | 'ibadah' | 'pendidikan' | 'ekonomi' | 'fasilitas'

export interface LocationItem {
  id: string
  name: string
  category: CategoryKey
  description: string
  image: string
  latitude: number | null
  longitude: number | null
  address: string | null
  verified: boolean
}
