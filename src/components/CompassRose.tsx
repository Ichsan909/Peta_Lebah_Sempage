export default function CompassRose({ size = '100%' }: { size?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Arah mata angin">
      <path d="M50 14 58 50 50 86 42 50Z" fill="#111" />
      <path d="M14 50 50 42 86 50 50 58Z" fill="#111" />
      <path d="M50 14 58 50 42 50Z" fill="#fff" stroke="#111" strokeWidth="1.5" />
      <path d="M86 50 50 58 50 42Z" fill="#fff" stroke="#111" strokeWidth="1.5" />
      {[['N', 50, 10], ['E', 95, 54], ['S', 50, 98], ['W', 5, 54]].map(([t, x, y]) => (
        <text key={String(t)} x={x as number} y={y as number} fontSize="11" textAnchor="middle" fontFamily="Times New Roman">{t}</text>
      ))}
    </svg>
  )
}
