import { useMemo, useState } from 'react'
import { rows } from '../data.js'
import { filter, previous, kpis, byMonth, groupBy } from '../calc.js'

// Filter state, derived numbers and the sortable breakdown table.
export function useSalesView() {
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
  return { f, set, cur, k, line, table, sort, sortKey, dir, byCategory: groupBy(cur, 'category'), byRegion: groupBy(cur, 'region') }
}
