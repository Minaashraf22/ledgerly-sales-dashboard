import React from 'react'
import { toCsv } from './calc.js'
import { downloadCsv } from './download.js'
import { useSalesView } from './hooks/useSalesView.js'
import Sidebar from './components/Sidebar.jsx'
import Filters from './components/Filters.jsx'
import KpiCards from './components/KpiCards.jsx'
import LineChart from './components/LineChart.jsx'
import BarList from './components/BarList.jsx'
import BreakdownTable from './components/BreakdownTable.jsx'

export default function App() {
  const v = useSalesView()
  return (
    <div className="shell">
      <Sidebar />
      <main>
        <header><h1>Sales overview</h1><Filters f={v.f} set={v.set} onExport={() => downloadCsv(toCsv(v.cur))} /></header>
        <p className="demo">Demo: fictional company, synthetic data generated in code.</p>
        <KpiCards k={v.k} />
        <section className="grid2">
          <div className="card"><h2>Revenue by month</h2><LineChart data={v.line} /></div>
          <div className="card"><h2>By category</h2><BarList data={v.byCategory} /><h2 className="sp">By region</h2><BarList data={v.byRegion} /></div>
        </section>
        <BreakdownTable table={v.table} sortKey={v.sortKey} dir={v.dir} onSort={v.sort} />
      </main>
    </div>
  )
}
