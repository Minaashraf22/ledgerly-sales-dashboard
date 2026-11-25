export function downloadCsv(text, name = 'sales.csv') {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' })); a.download = name; a.click()
}
