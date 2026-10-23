import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Gift,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { PhoneShell } from '../components/PhoneShell'
import { Button } from '../components/ui'
import { useApp } from '../context/AppContext'
import { adminStats, livePrice } from '../data/mock'

export default function Admin() {
  const { setRole } = useApp()
  const navigate = useNavigate()

  const handleExit = () => {
    setRole(null)
    navigate('/role')
  }

  return (
    <PhoneShell>
      <div className="flex h-full flex-col bg-bg overflow-hidden">
        {/* Mobile Top Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-line bg-white px-4 pt-14 pb-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExit}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-bg text-ink active:scale-95 transition"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-primary">
                AMBA SHAKTI · OPS
              </p>
              <h1 className="text-sm font-black text-ink leading-tight">
                Operations Command
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </span>
            <button
              onClick={handleExit}
              className="rounded-lg border border-line px-2 py-1 text-[10px] font-bold text-muted hover:text-ink active:scale-95 transition"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Scrollable Mobile Admin Content */}
        <div className="app-scroll flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-12">
          {/* Executive Subtitle */}
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>Corporate Boardroom View</span>
            <span className="font-semibold text-ink">Today, 3 Aug 2026</span>
          </div>

          {/* 4 Core KPIs (2x2 Clean Mobile Grid) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-2xl header-gradient p-3.5 text-white shadow-xs">
              <p className="text-[9px] font-extrabold uppercase tracking-wide text-white/80">
                TODAY'S ORDERS
              </p>
              <p className="mt-1 text-2xl font-black">{adminStats.ordersToday}</p>
              <p className="mt-0.5 text-[10px] text-white/70">91 Dispatched</p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-3.5 shadow-xs">
              <p className="text-[9px] font-extrabold uppercase tracking-wide text-muted">
                REVENUE GMV
              </p>
              <p className="mt-1 text-2xl font-black text-ink">₹{adminStats.gmv} Cr</p>
              <p className="mt-0.5 text-[10px] text-emerald-600 font-bold">+12% vs last week</p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-3.5 shadow-xs">
              <p className="text-[9px] font-extrabold uppercase tracking-wide text-muted">
                LIVE STEEL RATE
              </p>
              <p className="mt-1 text-xl font-black text-ink">
                ₹{livePrice.pricePerTon.toLocaleString('en-IN')}
              </p>
              <p className="mt-0.5 text-[10px] text-primary font-bold">Fe 550D NCR Base</p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-3.5 shadow-xs">
              <p className="text-[9px] font-extrabold uppercase tracking-wide text-muted">
                INVENTORY POOL
              </p>
              <p className="mt-1 text-xl font-black text-ink">1,248 T</p>
              <p className="mt-0.5 text-[10px] text-steel">Across 48 Godowns</p>
            </div>
          </div>

          {/* Partner & Rewards Loyalty Health (Blueprint Integration) */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-line pb-2 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Gift size={14} className="text-primary" />
                <h3 className="text-xs font-black text-ink uppercase tracking-wide">
                  Rewards & Loyalty Desk
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                ASM-REV-2026-v2
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-line bg-bg p-2">
                <p className="text-[8px] font-extrabold text-muted uppercase">ACTIVE DEALERS</p>
                <p className="mt-0.5 text-base font-black text-ink">48</p>
                <p className="text-[9px] text-emerald-600 font-bold">100% Verified</p>
              </div>

              <div className="rounded-xl border border-line bg-bg p-2">
                <p className="text-[8px] font-extrabold text-muted uppercase">PTS ISSUED</p>
                <p className="mt-0.5 text-base font-black text-ink">1.48 L</p>
                <p className="text-[9px] text-muted">On Sales Invoices</p>
              </div>

              <div className="rounded-xl border border-line bg-bg p-2">
                <p className="text-[8px] font-extrabold text-muted uppercase">GIFTS CLAIMED</p>
                <p className="mt-0.5 text-base font-black text-ink">28</p>
                <p className="text-[9px] text-primary font-bold">Dispatched</p>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 text-[10px] font-bold text-emerald-800">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-600" />
                Enterprise Fraud Safeguards
              </span>
              <span>0 Violations</span>
            </div>
          </div>

          {/* Top Dealer & Contractor Spotlights */}
          <div className="space-y-2.5">
            <div className="rounded-2xl bg-ink p-4 text-white shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-wider text-white/60">
                  TOP DEALER SPOTLIGHT
                </span>
                <span className="rounded-md bg-white/15 px-2 py-0.5 text-[9px] font-extrabold text-amber-400">
                  Gold Partner
                </span>
              </div>
              <p className="mt-2 text-base font-black">Shakti Steel Traders</p>
              <p className="text-[11px] text-white/70">
                ₹48.2L GMV · 98% Fulfillment SLA · 14,850 Pts
              </p>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-amber-400 w-[86%]" />
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-wider text-muted">
                  TOP CONTRACTOR SPOTLIGHT
                </span>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[9px] font-extrabold text-primary">
                  Site Lead
                </span>
              </div>
              <p className="mt-1 text-sm font-black text-ink">Meena Constructions</p>
              <p className="text-[11px] text-muted">
                15.4k Reward Points · 7 Sites Active in NCR
              </p>
            </div>
          </div>

          {/* Recent Orders Stream */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-line pb-2 mb-2">
              <h3 className="text-xs font-black text-ink uppercase tracking-wide">
                Live Orders Pipeline
              </h3>
              <span className="text-[10px] text-muted font-bold">Latest 4</span>
            </div>

            <div className="divide-y divide-line/60">
              {adminStats.recentOrders.slice(0, 4).map((o) => (
                <div key={o.id} className="py-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-ink">{o.id}</span>
                      <span className="text-[11px] text-muted truncate">({o.user})</span>
                    </div>
                    <p className="text-[10px] text-steel truncate mt-0.5">
                      Dealer: {o.dealer}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-ink">
                      ₹{o.amount.toLocaleString('en-IN')}
                    </p>
                    <span
                      className={`inline-block mt-0.5 rounded px-1.5 py-0.2 text-[9px] font-extrabold ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : o.status === 'Placed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Pulse */}
          <div className="rounded-2xl border border-line bg-amber-50/50 p-3.5 text-xs">
            <p className="text-[10px] font-black uppercase text-amber-900 tracking-wider">
              INVENTORY ALERT
            </p>
            <p className="mt-1 font-bold text-ink">
              TMT 12 mm running low in NCR East
            </p>
            <p className="mt-0.5 text-[11px] text-muted">
              3.4 ton buffer across mapped depots. Next rolling mill dispatch due tomorrow morning.
            </p>
          </div>

          {/* Exit Button */}
          <Button
            variant="outline"
            className="w-full h-10 text-xs font-bold text-primary border-primary/30 hover:bg-primary/5"
            onClick={handleExit}
          >
            <LogOut size={14} /> Exit to Role Selection
          </Button>
        </div>
      </div>
    </PhoneShell>
  )
}
