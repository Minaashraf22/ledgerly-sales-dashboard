import React from 'react'
import { regions, categories } from '../data.js'
export default function Filters({ f, set, onExport }) {
  return (
    <div className="filters">
      <select value={f.region} onChange={set('region')} aria-label="Region"><option>All</option>{regions.map(r => <option key={r}>{r}</option>)}</select>
      <select value={f.category} onChange={set('category')} aria-label="Category"><option>All</option>{categories.map(c => <option key={c}>{c}</option>)}</select>
      <select value={f.months} onChange={set('months')} aria-label="Period"><option value="3">Last 3 months</option><option value="6">Last 6 months</option><option value="12">Last 12 months</option></select>
      <button onClick={onExport}>Export CSV</button></div>
  )
}
