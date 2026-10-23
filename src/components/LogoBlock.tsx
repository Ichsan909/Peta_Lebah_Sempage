import { u } from '../utils/sheet'

const LOGOS = [['logo-undikma.webp', 'Logo Undikma'], ['logo-desa.webp', 'Logo Desa Lebah Sempage'], ['logo-kkn.webp', 'Logo KKN Kelompok 13']]

export default function LogoBlock({ sheet = false }: { sheet?: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center font-bold" style={{ fontSize: sheet ? u(19) : 14, lineHeight: 1.15 }}>
      <div className="flex items-center justify-center" style={{ gap: sheet ? u(18) : 12, height: sheet ? u(104) : 64 }}>
        {LOGOS.map(([f, alt]) => (
          <img key={f} src={`/images/${f}`} alt={alt} className="h-full w-auto object-contain" decoding="async" onError={e => { e.currentTarget.style.visibility = 'hidden' }} />
        ))}
      </div>
      <div style={{ marginTop: sheet ? u(8) : 4 }}>KKN UNDIKMA KELOMPOK 13<br />DESA LEBAH SEMPAGE</div>
    </div>
  )
}
