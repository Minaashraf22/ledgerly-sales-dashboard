import React from 'react'
import { n0 } from '../format.js'
const COLS = [['region', 'Region'], ['category', 'Category'], ['orders', 'Orders'], ['revenue', 'Revenue (EGP)']]
export default function BreakdownTable({ table, sortKey, dir, onSort }) {
  return (
    <section className="card"><h2>Breakdown</h2>
      <div className="scroll"><table><thead><tr>{COLS.map(([key, l]) => <th key={key}><button onClick={() => onSort(key)}>{l}{sortKey === key ? (dir > 0 ? ' ▲' : ' ▼') : ''}</button></th>)}</tr></thead>
        <tbody>{table.map(r => <tr key={r.region + r.category}><td>{r.region}</td><td>{r.category}</td><td>{n0(r.orders)}</td><td>{n0(r.revenue)}</td></tr>)}</tbody></table></div></section>
  )
}
