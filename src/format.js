export const n0 = n => Math.round(n).toLocaleString('en-US')
export const short = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'K' : String(n)
