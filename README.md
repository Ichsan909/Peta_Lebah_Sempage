# Peta Interaktif Desa Lebah Sempage

Frontend statis (React + TypeScript + Vite + Tailwind + React Leaflet). Tanpa backend, database, login, atau API key.
Disusun oleh KKN UNDIKMA Kelompok 13, Desa Lebah Sempage, Kecamatan Narmada, Kabupaten Lombok Barat.

## Isi paket
- Semua gambar sudah dikompres ke **WebP** (±1 MB menjadi ±200 KB) dan GeoJSON sudah diperkecil.
- Hasil build ±410 KB (±125 KB setelah gzip), dipecah menjadi `vendor`, `peta`, dan `index` agar cache browser awet.
- `vercel.json` sudah berisi pengaturan build, cache, dan header keamanan. Tidak perlu diubah.

## Menjalankan di komputer
Butuh Node.js 18 atau lebih baru.
```
npm install
npm run dev       # pengembangan, buka alamat yang tampil di terminal
npm run build     # hasil di folder dist/
npm run preview   # uji hasil build
```

## Install / deploy ke Vercel

### Cara 1: lewat GitHub (disarankan, otomatis update setiap push)
1. Ekstrak zip ini, lalu upload isi folder `peta-lebah-sempage` ke repositori GitHub baru (`node_modules` dan `dist` tidak perlu diupload; sudah diabaikan oleh `.gitignore`).
2. Buka https://vercel.com, login, klik **Add New → Project**.
3. Pilih repositori tadi, klik **Import**.
4. Pengaturan terbaca otomatis dari `vercel.json` (Framework: Vite, Build Command: `npm run build`, Output Directory: `dist`). Biarkan apa adanya.
5. Klik **Deploy**. Tunggu ±1 menit sampai muncul alamat `https://nama-proyek.vercel.app`.
6. Setiap kali Anda `git push`, Vercel akan deploy ulang sendiri.

### Cara 2: lewat Vercel CLI (tanpa GitHub)
```
npm install -g vercel
cd peta-lebah-sempage
vercel          # deploy percobaan (preview)
vercel --prod   # deploy ke alamat utama
```
Saat pertama kali, login lalu jawab pertanyaan: pilih akun, **Link to existing project? N**, nama proyek bebas, **Override settings? N**.

### Jika build gagal
- Pastikan folder yang diimpor adalah folder yang berisi `package.json`. Jika terpaksa, di Vercel buka **Settings → General → Root Directory** lalu isi `peta-lebah-sempage`.
- Pastikan **Settings → General → Node.js Version** adalah 18.x atau lebih baru.
- Jalankan `npm run build` di komputer; jika di sana berhasil, di Vercel juga berhasil.

## Tampilan
- **Layar ≥1280 px**: lembar peta cetak dengan rasio 1616:1068. Judul, logo, peta, 18 kartu, dan panel kanan memakai posisi dan ukuran dari gambar referensi, ikut membesar/mengecil secara proporsional. Posisi kartu ada di `src/utils/sheet.ts` (`SLOTS`).
- **HP dan tablet (<1280 px)**: judul, peta penuh, legenda (accordion), lalu grid kartu. Layar di bawah 1280 px sengaja memakai tampilan ini agar tulisan tetap terbaca.
- Label kartu maksimal 3 baris dan gambar menyesuaikan sisa ruang, sehingga tidak ada teks yang keluar dari kartu atau menimpa kartu lain.
- Cakupan peta dikunci ke bingkai peta referensi (`src/utils/geo.ts`).

## Mengisi data
- **Koordinat**: `src/data/locations.ts` (`latitude`, `longitude`). `null` berarti marker tidak tampil dan rute tidak dibuat. Garis kuning berpanah ke kartu muncul otomatis untuk lokasi yang punya koordinat. Isi `address` agar tombol "Petunjuk Jalan" bisa mencari lewat alamat. Saat ini Koperasi Desa Merah Putih belum punya koordinat.
- **Foto**: `public/images/locations/<id>.webp`. Foto bawaan beresolusi rendah (456×304); ganti dengan foto asli memakai nama file yang sama. Agar tetap ringan, ubah dulu ke WebP lebar ±800 px kualitas 75 di https://squoosh.app (hasil ±30–60 KB per foto).
- **Logo**: `public/images/logo-undikma.webp`, `logo-desa.webp`, `logo-kkn.webp`. **Inset peta lokasi**: `public/images/inset-lokasi.webp`.
- **Batas desa**: `public/data/batas-desa.geojson` (poligon Desa Lebah Sempage, kode 52.01.03.2010, dari dataset terbuka github.com/Alf-Anas/batas-administrasi-indonesia, update 13 Juni 2023). Belum dicocokkan dengan dokumen penegasan batas resmi; ganti dengan data dari Kantor Desa/Bappeda/BIG bila ada.
- **Teks panel kanan** (sumber, pembuat, pengesah): `mapMeta` di `src/data/locations.ts`.
- **Mode demo**: centang "Mode demo" untuk marker contoh berlabel DEMO (`src/data/demo.ts`); rute tidak dibuat dari titik demo.

## Catatan
- Citra satelit memakai tile Esri World Imagery dan OpenStreetMap sehingga membutuhkan internet. Atribusi sumber tampil di pojok kanan bawah peta; jangan dihapus.
- Setelah deploy, cek tampilan di HP dan laptop, lalu buka detail satu lokasi untuk memastikan foto muncul.
