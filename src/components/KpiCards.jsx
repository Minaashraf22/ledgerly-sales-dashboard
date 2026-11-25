import React from 'react'
import { n0 } from '../format.js'
export default function KpiCards({ k }) {
  return (
    <section className="kpis">
      <div><small>Revenue</small><b data-testid="revenue">{n0(k.revenue)} EGP</b></div>
      <div><small>Orders</small><b data-testid="orders">{n0(k.orders)}</b></div>
      <div><small>Average order</small><b data-testid="aov">{n0(k.aov)} EGP</b></div>
      <div><small>Vs previous period</small><b data-testid="growth" className={k.growth === null ? '' : k.growth >= 0 ? 'up' : 'down'}>{k.growth === null ? 'n/a' : (k.growth >= 0 ? '+' : '') + k.growth.toFixed(1) + '%'}</b></div>
    </section>
  )
}
