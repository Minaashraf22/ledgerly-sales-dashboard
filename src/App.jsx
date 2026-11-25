import React, { useMemo, useState } from 'react'
import { rows, regions, categories } from './data.js'
import { filter, previous, kpis, byMonth, groupBy, toCsv } from './calc.js'

const n0 = n => Math.round(n).toLocaleString('en-US')
const short = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'K' : String(n)

function Line({ data }) {
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
function Bars({ data }) {
  const max = Math.max(...data.map(d => d.v), 1)
  return <div className="bars" role="img" aria-label="Revenue share">{data.map(d => (
    <div key={d.k} className="brow"><span>{d.k}</span><div className="track"><div className="fill" style={{ width: (d.v / max * 100) + '%' }} /></div><b>{short(d.v)}</b></div>))}</div>
}

export default function App() {
  const [f, setF] = useState({ region: 'All', category: 'All', months: 6 })
  const [sortKey, setSortKey] = useState('revenue'), [dir, setDir] = useState(-1)
  const cur = useMemo(() => filter(rows, f), [f]), prev = useMemo(() => previous(rows, f), [f])
  const k = kpis(cur, prev), line = byMonth(cur)
  const table = useMemo(() => {
    const m = {}; cur.forEach(r => { const key = r.region + '|' + r.category; m[key] = m[key] || { region: r.region, category: r.category, revenue: 0, orders: 0 }; m[key].revenue += r.revenue; m[key].orders += r.orders })
    return Object.values(m).sort((a, b) => (typeof a[sortKey] === 'string' ? a[sortKey].localeCompare(b[sortKey]) : a[sortKey] - b[sortKey]) * dir)
  }, [cur, sortKey, dir])
  const sort = key => { if (key === sortKey) setDir(-dir); else { setSortKey(key); setDir(key === 'region' || key === 'category' ? 1 : -1) } }
  const set = key => e => setF({ ...f, [key]: key === 'months' ? +e.target.value : e.target.value })
  function exportCsv() {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([toCsv(cur)], { type: 'text/csv' })); a.download = 'sales.csv'; a.click()
  }
  return (
    <div className="shell">
      <aside><div className="logo"><img src="logo.svg" alt="" /><b>Ledgerly</b></div><nav><a className="on">Overview</a><a>Orders</a><a>Customers</a><a>Reports</a></nav><small>Synthetic demo data. Fictional company.</small></aside>
      <main>
        <header><h1>Sales overview</h1>
          <div className="filters">
            <select value={f.region} onChange={set('region')} aria-label="Region"><option>All</option>{regions.map(r => <option key={r}>{r}</option>)}</select>
            <select value={f.category} onChange={set('category')} aria-label="Category"><option>All</option>{categories.map(c => <option key={c}>{c}</option>)}</select>
            <select value={f.months} onChange={set('months')} aria-label="Period"><option value="3">Last 3 months</option><option value="6">Last 6 months</option><option value="12">Last 12 months</option></select>
            <button onClick={exportCsv}>Export CSV</button></div></header>
        <p className="demo">Demo: fictional company, synthetic data generated in code.</p>
        <section className="kpis">
          <div><small>Revenue</small><b data-testid="revenue">{n0(k.revenue)} EGP</b></div>
          <div><small>Orders</small><b data-testid="orders">{n0(k.orders)}</b></div>
          <div><small>Average order</small><b data-testid="aov">{n0(k.aov)} EGP</b></div>
          <div><small>Vs previous period</small><b data-testid="growth" className={k.growth === null ? '' : k.growth >= 0 ? 'up' : 'down'}>{k.growth === null ? 'n/a' : (k.growth >= 0 ? '+' : '') + k.growth.toFixed(1) + '%'}</b></div>
        </section>
        <section className="grid2">
          <div className="card"><h2>Revenue by month</h2><Line data={line} /></div>
          <div className="card"><h2>By category</h2><Bars data={groupBy(cur, 'category')} /><h2 className="sp">By region</h2><Bars data={groupBy(cur, 'region')} /></div>
        </section>
        <section className="card"><h2>Breakdown</h2>
          <div className="scroll"><table><thead><tr>{[['region', 'Region'], ['category', 'Category'], ['orders', 'Orders'], ['revenue', 'Revenue (EGP)']].map(([key, l]) => <th key={key}><button onClick={() => sort(key)}>{l}{sortKey === key ? (dir > 0 ? ' ▲' : ' ▼') : ''}</button></th>)}</tr></thead>
            <tbody>{table.map(r => <tr key={r.region + r.category}><td>{r.region}</td><td>{r.category}</td><td>{n0(r.orders)}</td><td>{n0(r.revenue)}</td></tr>)}</tbody></table></div></section>
      </main>
    </div>
  )
}
