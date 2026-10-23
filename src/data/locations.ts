
import type { CategoryKey, LocationItem } from '../types/location'

export const categories: Record<CategoryKey, { label: string; color: string }> = {
  wisata: { label: 'Wisata & Alam', color: '#2563eb' },
  ibadah: { label: 'Ibadah', color: '#16a34a' },
  pendidikan: { label: 'Pendidikan', color: '#dc2626' },
  ekonomi: { label: 'Ekonomi', color: '#ea8a1a' },
  fasilitas: { label: 'Fasilitas Umum', color: '#7c3aed' },
}

// Tambahkan koordinat latitude dan longitude jika sudah diketahui.
// Lokasi tanpa koordinat akan tetap null dan tidak menampilkan marker.
const place = (
  id: string,
  name: string,
  category: CategoryKey,
  latitude: number | null = null,
  longitude: number | null = null,
): LocationItem => ({
  id,
  name,
  category,
  description: 'Deskripsi belum ditambahkan. Isi di src/data/locations.ts.',
  image: `/images/locations/${id}.webp`,
  latitude,
  longitude,
  address: null,
  verified: latitude !== null && longitude !== null,
})

export const locations: LocationItem[] = [
  place('sumber-mata-air', 'Sumber Mata Air Lebah Sempage', 'wisata',-8.536123553640035, 116.27848239571318),

  place('masjid-nurul-jihad', 'Masjid Nurul Jihad', 'ibadah',-8.530675948453494, 116.28005813389986),

  place('sdn-3', 'SDN 3 Lebah Sempage', 'pendidikan', -8.529561730503042, 116.28135883872682),

  place(
    'sdn-2',
    'SDN 2 Lebah Sempage',
    'pendidikan',
    -8.552542324787204,
    116.25963662523499,
  ),

  place('kantor-desa', 'Kantor Desa Lebah Sempage', 'fasilitas',-8.545967342935164, 116.26847319639873),

  place('sdn-1', 'SDN 1 Lebah Sempage Kec. Narmada', 'pendidikan', -8.54478174533934, 116.26920973872687),

  place(
    'masjid-jamiq-nurul-ikhlas',
    'Masjid Jamiq Nurul Ikhlas Lebah Sempage',
    'ibadah',-8.5445536134881, 116.26968296756283
  ),

  place('goa-lawah', 'Wisata Goa Lawah', 'wisata', -8.539591143178713, 116.27660825221905),

  place('bmt-taawun', "BMT Ta'awun", 'ekonomi', -8.5428661739282, 116.27045680989099),

  place('sppg', 'SPPG Lebah Sempage', 'fasilitas', -8.541908103078296, 116.27215452338307),

  place(
    'tugu-perbatasan',
    'Tugu Perbatasan Desa Lebah Sempage',
    'fasilitas', -8.562494998967944, 116.25805212447878
  ),

  place('masjid-nurul-iman', 'Masjid Nurul Iman Lebah Munte', 'ibadah', -8.559354060748115, 116.25983429564283),

  place(
    'puskesmas-pembantu',
    'Puskesmas Pembantu Lebah Sempage',
    'fasilitas', -8.549510524199214, 116.26325266756295
  ),

  place(
    'lapangan-desa',
    'Lapangan Bola Desa Lebah Sempage',
    'fasilitas',-8.547988475633568, 116.26796055407077
  ),

  place(
    'koperasi-desa',
    'Koperasi Desa Merah Putih Lebah Sempage',
    'ekonomi', -8.550173856092028, 116.26350499999998
  ),

  place('pasar-desa', 'Pasar Desa Lebah Sempage', 'ekonomi', -8.549826924260604, 116.26358042523484),

  place(
    'yayasan-tarbiyatul-abna',
    "Yayasan Tarbiyatul Abna'",
    'pendidikan', -8.548865617204719, 116.26574180539667
  ),

  place(
    'tugu-desa',
    'Tugu Selamat Datang Desa Lebah Sempage',
    'fasilitas', -8.550064097440492, 116.26302563440748
  ),
]

export const mapMeta = {
  sources: [
    'Citra SAS Planet Tahun 2026',
    'Peta Rupa Bumi Indonesia (RBI) dari tanahair.indonesia.co.id',
    'Survei Daerah Tahun 2026',
    'Web: citra Esri, © OpenStreetMap; batas desa: Alf-Anas/batas-administrasi-indonesia',
  ],
  author: 'Kuliah Kerja Nyata (KKN) Kelompok 13 Desa Lebah Sempage',
  institution: 'Universitas Pendidikan Mandalika (Undikma)',
  year: 2026,
  approverTitle: 'Kepala Desa Lebah Sempage',
  approverName: 'Mohamad Adi',
  designers: [
    ['Kukuh Arie Purbawe', '23291069', 'Pendidikan Bahasa Inggris'],
    ['Maulana Ihsan', '23241049', 'Pendidikan Teknologi Informasi'],
    ['Lalu Ulil Amru', '23261038', 'Teknik Sipil'],
  ],
}
