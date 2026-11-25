// Synthetic demo data, generated deterministically (no real company). 12 months x 3 regions x 4 categories.
export const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
export const regions = ['Cairo', 'Alexandria', 'Delta']
export const categories = ['Electronics', 'Home', 'Fashion', 'Grocery']
const base = { Electronics: 90000, Home: 60000, Fashion: 70000, Grocery: 110000 }
const rf = { Cairo: 1.4, Alexandria: 0.9, Delta: 0.7 }
const aov = { Electronics: 2400, Home: 1300, Fashion: 700, Grocery: 350 }
export const rows = []
months.forEach((m, mi) => regions.forEach((r, ri) => categories.forEach((c, ci) => {
  const season = 1 + 0.18 * Math.sin((mi + ci) / 2) + mi * 0.012
  const revenue = Math.round(base[c] * rf[r] * season / 100) * 100
  rows.push({ m: mi, month: m, region: r, category: c, revenue, orders: Math.round(revenue / (aov[c] * (0.9 + 0.05 * ri))) })
})))
