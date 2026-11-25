export function filter(rows, { region, category, months }) {
  const last = Math.max(...rows.map(r => r.m))
  return rows.filter(r => (region === 'All' || r.region === region) && (category === 'All' || r.category === category) && r.m > last - months)
}
export function previous(rows, { region, category, months }) {
  const last = Math.max(...rows.map(r => r.m))
  return rows.filter(r => (region === 'All' || r.region === region) && (category === 'All' || r.category === category) && r.m <= last - months && r.m > last - 2 * months)
}
export const sum = (a, k) => a.reduce((s, r) => s + r[k], 0)
export function kpis(cur, prev) {
  const revenue = sum(cur, 'revenue'), orders = sum(cur, 'orders'), pr = sum(prev, 'revenue')
  return { revenue, orders, aov: orders ? revenue / orders : 0, growth: pr > 0 ? (revenue - pr) / pr * 100 : null }
}
export function byMonth(cur) {
  const m = new Map(); cur.forEach(r => m.set(r.m, { month: r.month, v: (m.get(r.m)?.v || 0) + r.revenue })); return [...m.entries()].sort((a, b) => a[0] - b[0]).map(x => x[1])
}
export function groupBy(cur, key) {
  const m = {}; cur.forEach(r => { m[r[key]] = (m[r[key]] || 0) + r.revenue }); return Object.entries(m).map(([k, v]) => ({ k, v })).sort((a, b) => b.v - a.v)
}
export const toCsv = cur => 'month,region,category,revenue,orders\n' + cur.map(r => [r.month, r.region, r.category, r.revenue, r.orders].join(',')).join('\n')
