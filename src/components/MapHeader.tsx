import { u } from '../utils/sheet'

export default function MapHeader({ sheet = false }: { sheet?: boolean }) {
  return (
    <h1 className="m-0 grid h-full place-content-center text-center font-bold uppercase text-[#1b1b1b]"
      style={sheet ? { fontSize: u(35), lineHeight: u(42) } : { fontSize: 'clamp(11px,3.1vw,26px)', lineHeight: 1.2, padding: '10px 4px' }}>
      <span className="block">Peta Administrasi Desa Lebah Sempage</span>
      <span className="block">Kecamatan Narmada, Kabupaten Lombok Barat</span>
      <span className="block">Provinsi Nusa Tenggara Barat</span>
    </h1>
  )
}
