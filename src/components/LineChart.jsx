import React from 'react'
import { short } from '../format.js'
export default function LineChart({ data }) {
  const W = 640, H = 220, P = 36, max = Math.max(...data.map(d => d.v), 1)
  const x = i => P + (data.length > 1 ? i * (W - 2 * P) / (data.length - 1) : (W - 2 * P) / 2), y = v => H - 28 - (v / max) * (H - 56)
  const pts = data.map((d, i) => `${x(i)},${y(d.v)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Revenue by month" className="chart">
      {[0, .5, 1].map(t => <g key={t}><line x1={P} x2={W - P} y1={y(max * t)} y2={y(max * t)} stroke="#e5e7eb" /><text x={P - 6} y={y(max * t) + 4} fontSize="10" textAnchor="end" fill="#6b7280">{short(max * t)}</text></g>)}
      <polyline points={pts} fill="none" stroke="#4338ca" strokeWidth="3" strokeLinejoin="round" />
      {data.map((d, i) => <g key={i}><circle cx={x(i)} cy={y(d.v)} r="4" fill="#4338ca" /><text x={x(i)} y={H - 10} fontSize="10" textAnchor="middle" fill="#6b7280">{d.month}</text></g>)}
    </svg>
  )
}
