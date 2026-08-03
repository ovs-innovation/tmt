import { Link } from 'react-router-dom'
import { adminStats, livePrice } from '../data/mock'
import { Badge } from '../components/ui'
import { useApp } from '../context/AppContext'

const kpis = [
  { label: "Today's Orders", value: String(adminStats.ordersToday) },
  { label: 'Revenue', value: `₹${adminStats.gmv} Cr` },
  { label: 'Top Dealer', value: 'Shakti Steel' },
  { label: 'Top Contractor', value: 'Meena Co.' },
  { label: 'Pending Delivery', value: '37' },
  { label: "Today's Dispatch", value: '91' },
  {
    label: 'Live Steel Price',
    value: `₹${livePrice.pricePerTon.toLocaleString('en-IN')}`,
  },
  { label: 'Inventory', value: '1,248 ton' },
]

export default function Admin() {
  const { setRole } = useApp()

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-bg text-ink">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <img src="/logo-mark.png" alt="" className="h-7 w-7 object-contain" />
              <p className="text-[11px] font-extrabold tracking-[0.22em] text-primary uppercase">
                Amba Shakti · Admin
              </p>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              Operations command
            </h1>
            <p className="mt-1 text-sm text-muted">Boardroom demo · Monday, 3 Aug 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone="live">LIVE</Badge>
            <Link
              to="/role"
              onClick={() => setRole(null)}
              className="rounded-2xl border border-line bg-white px-4 py-2.5 text-sm font-bold"
            >
              Exit demo
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className={`rounded-[24px] border border-line p-5 shadow-[0_8px_28px_rgba(48,56,65,0.04)] ${
                i === 0 || i === 6
                  ? 'brand-gradient border-0 text-white'
                  : 'bg-white'
              }`}
            >
              <p
                className={`text-xs font-bold tracking-wide uppercase ${
                  i === 0 || i === 6 ? 'text-white/75' : 'text-muted'
                }`}
              >
                {k.label}
              </p>
              <p className="mt-3 text-2xl font-extrabold tracking-tight md:text-[28px]">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[24px] border border-line bg-white p-5 shadow-[0_8px_28px_rgba(48,56,65,0.04)] lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-extrabold">Recent orders</h2>
              <button className="text-sm font-bold text-primary">Export</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-muted">
                  <tr className="border-b border-line">
                    <th className="pb-3 font-semibold">Order</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Dealer</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {adminStats.recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-[#F3F1EC]">
                      <td className="py-3.5 font-bold">{o.id}</td>
                      <td className="py-3.5">{o.user}</td>
                      <td className="py-3.5">{o.dealer}</td>
                      <td className="py-3.5">₹{o.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3.5">
                        <Badge
                          tone={
                            o.status === 'Delivered'
                              ? 'success'
                              : o.status === 'Placed'
                                ? 'neutral'
                                : 'warning'
                          }
                        >
                          {o.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] bg-ink p-5 text-white">
              <p className="text-xs font-bold tracking-wide text-white/55 uppercase">Top dealer</p>
              <p className="mt-3 text-2xl font-extrabold">Shakti Steel Traders</p>
              <p className="mt-2 text-sm text-white/60">₹48.2L GMV · 98% SLA</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="brand-gradient h-full w-[86%]" />
              </div>
            </div>
            <div className="rounded-[24px] border border-line bg-white p-5">
              <p className="text-xs font-bold tracking-wide text-muted uppercase">
                Top contractor
              </p>
              <p className="mt-3 text-2xl font-extrabold text-ink">Meena Constructions</p>
              <p className="mt-2 text-sm text-muted">15.4k reward pts · 7 sites active</p>
            </div>
            <div className="brand-gradient-soft rounded-[24px] border border-transparent p-5">
              <p className="text-xs font-bold tracking-wide text-secondary uppercase">Inventory pulse</p>
              <p className="mt-2 text-xl font-extrabold text-ink">TMT 12 mm running low in NCR</p>
              <p className="mt-2 text-sm text-muted">3.4 ton across mapped dealers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
