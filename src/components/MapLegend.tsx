import { useState, type CSSProperties, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import CompassRose from './CompassRose'
import PlaceBadge from './PlaceBadge'
import { mapMeta } from '../data/locations'
import { u } from '../utils/sheet'

const LEFT: [string, string][] = [['sdn-1', 'SDN 1 Lebah Sempage'], ['bmt-taawun', "BMT Ta'awun"], ['goa-lawah', 'Goa Lawah'],
  ['sdn-2', 'SDN 2 Lebah Sempage'], ['sumber-mata-air', 'Mata Air Lebah Sempage'], ['tugu-desa', 'Tugu Lebah Sempage'],
  ['sdn-3', 'SDN 3 Lebah Sempage'], ['masjid-jamiq-nurul-ikhlas', 'Masjid Jamiq Nurul Ikhlas'], ['tugu-perbatasan', 'Tugu Perbatasan Desa']]
const RIGHT: [string, string][] = [['lapangan-desa', 'Lapangan Bola Desa Lebah Sempage'], ['yayasan-tarbiyatul-abna', 'Yayasan Tarbiyatul Abna'],
  ['pasar-desa', 'Pasar Desa Lebah Sempage'], ['koperasi-desa', 'Koperasi Desa Lebah Sempage'], ['sppg', 'SPPG Lebah Sempage'],
  ['masjid-nurul-jihad', 'Masjid Nurul Jihad'], ['kantor-desa', 'Kantor Desa Lebah Sempage'], ['puskesmas-pembantu', 'Puskesmas Pembantu Desa'],
  ['masjid-nurul-iman', 'Masjid Nurul Iman Lebah Munte']]

function ScaleBar({ f }: { f: (n: number) => string }) {
  const seg: [number, number, string][] = [[0, 31, '#000'], [31, 63, '#fff'], [63, 125, '#000'], [125, 188, '#fff'], [188, 251, '#000']]
  const lab: [number, string][] = [[0, '0'], [32, '275'], [64, '550'], [127, '1,100'], [180, '1,650'], [251, '2,200']]
  return (
    <svg viewBox="0 0 290 26" style={{ width: f(290), height: f(26), display: 'block' }}>
      {lab.map(([x, t]) => <text key={t} x={x} y="8" fontSize="8" fontFamily="Arial">{t}</text>)}
      {seg.map(([a, b, c]) => <rect key={a} x={a} y="12" width={b - a} height="5" fill={c} stroke="#000" strokeWidth=".7" />)}
      <text x="255" y="24" fontSize="8" fontFamily="Arial">Meters</text>
    </svg>
  )
}

export default function MapLegend({ sheet = false }: { sheet?: boolean }) {
  const [open, setOpen] = useState(false)
  const f = (n: number) => (sheet ? u(n) : `${n}px`)
  const sec = (h: number): CSSProperties => ({ height: sheet ? u(h) : undefined, borderTop: '1px solid #000', overflow: 'hidden', padding: `0 ${f(7)}` })
  const head = (n: number): CSSProperties => ({ fontSize: f(n), fontWeight: 700, textTransform: 'uppercase' })
  const small: CSSProperties = { fontSize: f(10.5), lineHeight: 1.22 }
  const row = (id: string, t: string) => (
    <div key={id} className="flex items-center" style={{ gap: f(6), fontSize: f(sheet ? 10.5 : 11.5) }}>
      <PlaceBadge id={id} size={f(21)} /><span className="min-w-0" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', lineHeight: 1.05 }}>: {t}</span>
    </div>
  )
  const body: ReactNode = (
    <>
      <div style={{ ...sec(103), borderTop: 0, display: 'flex', gap: f(8), alignItems: 'flex-start', paddingTop: f(4), flexWrap: sheet ? 'nowrap' : 'wrap' }}>
        <div style={{ width: f(62), height: f(62), marginTop: f(10), flex: 'none' }}><CompassRose /></div>
        <div style={{ ...small, fontSize: f(11) }}>
          <ScaleBar f={f} />
          <b style={{ fontSize: f(13.5) }}>SKALA PETA :</b><br />
          <b style={{ fontSize: f(13) }}>1 : 9.500</b> <span style={{ fontSize: f(9) }}>(skala cetak; berubah saat zoom)</span><br />
          Sistem Proyeksi : UTM (Universal Transverse Mercator)<br />
          Sistem Grid : Geografis (Lintang dan Bujur)<br />
          Sistem Koordinat : WGS - 1984
        </div>
      </div>
      <div style={sec(240)}>
        <div style={{ ...head(15), textTransform: 'uppercase', paddingTop: f(3) }}>Keterangan :</div>
        <div className="grid" style={{ gridTemplateColumns: sheet ? `${f(173)} 1fr` : 'repeat(auto-fit,minmax(200px,1fr))', gridAutoRows: f(22.6), alignItems: 'center', marginTop: f(4) }}>
          <div style={{ display: 'contents' }}>{LEFT.map(([i, t]) => row(i, t))}</div>
          <div style={{ display: 'contents' }}>{RIGHT.map(([i, t]) => row(i, t))}</div>
        </div>
      </div>
      <div style={sec(82)}>
        <div style={{ ...head(14), paddingTop: f(2) }}>Sumber Peta :</div>
        <ul className="m-0 list-disc" style={{ ...small, fontSize: f(9.6), paddingLeft: f(20) }}>{mapMeta.sources.map(s => <li key={s}>{s}</li>)}</ul>
      </div>
      <div style={sec(60)}>
        <div style={{ ...head(14), paddingTop: f(1) }}>Pembuat Peta :</div>
        <ul className="m-0 list-disc" style={{ ...small, fontSize: f(9.6), paddingLeft: f(20) }}>
          <li>Disusun Oleh : {mapMeta.author}</li><li>Institusi : {mapMeta.institution}</li><li>Tahun : {mapMeta.year}</li>
        </ul>
      </div>
      <div style={{ ...sec(117), padding: 0 }}>
        <div style={{ ...head(15), textAlign: 'center', borderBottom: '1px solid #000', height: f(16), lineHeight: f(16) }}>Disahkan Oleh</div>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', height: f(100) }}>
          <div className="flex flex-col justify-between text-center" style={{ ...small, fontSize: f(11), borderRight: '1px solid #000', padding: f(3) }}>
            <span>{mapMeta.approverTitle}</span><span>{mapMeta.approverName}</span>
          </div>
          <div style={{ ...small, fontSize: f(10), padding: f(3) }}>
            <div style={{ fontSize: f(11) }}>Design By</div>
            <ol className="m-0" style={{ paddingLeft: f(16) }}>
              {mapMeta.designers.map(([n, nim, p]) => <li key={nim}><b>{n}</b> {nim} ({p})</li>)}
            </ol>
          </div>
        </div>
      </div>
      <div style={{ ...sec(72), padding: 0 }}>
        <div style={{ ...head(15), textAlign: 'center', height: f(15), lineHeight: f(15) }}>Website Desa Lebah Sempage</div>
      </div>
      <div style={{ ...sec(206), padding: 0 }}>
        <div style={{ ...head(14), textAlign: 'center', borderBottom: '1px solid #000', height: f(14), lineHeight: f(14) }}>Peta Tunjuk Lokasi</div>
        <img src="/images/inset-lokasi.webp" loading="lazy" decoding="async" alt="Peta tunjuk lokasi Indonesia dan Pulau Lombok" className="block w-full"
          style={{ height: sheet ? f(191) : 'auto', objectFit: 'fill' }} onError={e => { e.currentTarget.style.visibility = 'hidden' }} />
      </div>
    </>
  )
  if (sheet) return <aside className="h-full overflow-hidden border-[length:var(--b)] border-black bg-white" style={{ fontFamily: "'Times New Roman',Times,serif" }}>{body}</aside>
  return (
    <aside className="border border-black bg-white" style={{ fontFamily: "'Times New Roman',Times,serif" }}>
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} title="Buka atau tutup legenda dan informasi peta"
        className="flex w-full items-center justify-between px-3 py-3 font-bold">
        Legenda &amp; informasi peta <ChevronDown className={`size-5 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="border-t border-black">{body}</div>}
    </aside>
  )
}
