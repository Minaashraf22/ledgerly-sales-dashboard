import React from 'react'
import { short } from '../format.js'
export default function BarList({ data }) {
  const max = Math.max(...data.map(d => d.v), 1)
  return <div className="bars" role="img" aria-label="Revenue share">{data.map(d => (
    <div key={d.k} className="brow"><span>{d.k}</span><div className="track"><div className="fill" style={{ width: (d.v / max * 100) + '%' }} /></div><b>{short(d.v)}</b></div>))}</div>
}
