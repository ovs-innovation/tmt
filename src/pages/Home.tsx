import { Link } from 'react-router-dom'
import {
  Bell,
  Calculator,
  ChevronDown,
  ChevronRight,
  FileText,
  Gift,
  MapPin,
  Mic,
  Package,
  Plus,
  QrCode,
  Search,
  ShieldCheck,
  Star,
  Store,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react'
import { Badge, Skeleton } from '../components/ui'
import { useApp } from '../context/AppContext'
import { dealers, livePrice, orders, products, rewards } from '../data/mock'
import { dealerImage, images, productImage } from '../data/images'
import { useEffect, useState } from 'react'
import { useRewards, CATALOGUE_ITEMS } from '../context/RewardsContext'

const services = [
  { to: '/app/catalogue', label: 'Buy TMT', icon: Package, bg: '#FDECEC', color: '#D71920' },
  { to: '/app/quote', label: 'Get Quote', icon: FileText, bg: '#FFF0E4', color: '#F36B21' },
  { to: '/app/scan', label: 'Scan QR', icon: QrCode, bg: '#FFF6D9', color: '#B8860B' },
  { to: '/app/dealers', label: 'Dealers', icon: Store, bg: '#EEF3EE', color: '#1F8A4C' },
  { to: '/app/calculator', label: 'Estimate', icon: Calculator, bg: '#FFF0E4', color: '#E85D04' },
  { to: '/app/rewards', label: 'Rewards', icon: Gift, bg: '#FDECEC', color: '#D71920' },
  { to: '/app/referral', label: 'Refer', icon: Users, bg: '#FFF6D9', color: '#C48A00' },
  { to: '/app/orders', label: 'Orders', icon: Truck, bg: '#F3F1EC', color: '#303841' },
]

const sizes = [
  { id: 'tmt-8', label: '8 mm' },
  { id: 'tmt-10', label: '10 mm' },
  { id: 'tmt-12', label: '12 mm' },
  { id: 'tmt-16', label: '16 mm' },
  { id: 'angle-50', label: 'Angles' },
  { id: 'channel-100', label: 'Channels' },
]

const banners = [
  {
    to: '/app/rewards',
    img: '/products/tmt-12.jpg',
    tag: 'OFFER',
    title: '2× Amba Points',
    sub: 'On QR-verified deliveries till 31 Aug',
  },
  {
    to: '/app/quote',
    img: '/products/rebar-site.jpg',
    tag: 'BULK',
    title: 'Site quote in 2 mins',
    sub: 'Best rates on 3+ ton orders',
  },
  {
    to: '/app/referral',
    img: '/products/steel-structure.jpg',
    tag: 'REFER',
    title: 'Earn ₹1,000 per referral',
    sub: 'Invite contractors to Amba network',
  },
]

export default function Home() {
  const { userName, role, showToast, setDrawerOpen } = useApp()
  const { dealer, transactions, simulateSale } = useRewards()
  const [loading, setLoading] = useState(true)
  const [banner, setBanner] = useState(0)

  useEffect(() => {
    const tmr = window.setTimeout(() => setLoading(false), 220)
    return () => window.clearTimeout(tmr)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => setBanner((b) => (b + 1) % banners.length), 4200)
    return () => window.clearInterval(id)
  }, [])

  if (loading) {
    return (
      <div className="px-5 pt-20">
        <Skeleton className="mb-4 h-24 w-full" />
        <div className="mb-4 grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="mb-4 h-32 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (role === 'dealer') {
    const progressToNext = Math.min(
      100,
      Math.round((dealer.lifetimeEarned / dealer.nextTierAt) * 100)
    )

    return (
      <div className="px-4 pt-16 pb-24 space-y-4">
        {/* Top Greeting & Partner Status */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-ink leading-tight">
              Namaste, {userName}
            </h1>
            <p className="text-xs text-muted font-bold mt-0.5">
              {dealer.dealerName} · Authorized Depot
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9px] font-black tracking-wider text-emerald-800 uppercase">
            {dealer.partnerStatus}
          </span>
        </div>

        {/* Dealer Rewards Wallet Card (Direct on Home!) */}
        <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-sm">
          <div className="header-gradient p-4 text-white">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-wider text-white/80">
                DEALER WALLET APPLICATION INTERFACE
              </span>
              <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-black text-white">
                {dealer.tier}
              </span>
            </div>

            <div className="mt-2.5 flex items-baseline justify-between">
              <div>
                <p className="text-[10px] font-bold text-white/70 uppercase">
                  AVAILABLE REDEEMABLE POINTS
                </p>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black tracking-tight leading-none">
                    {dealer.availablePoints.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-white/80">Pts</span>
                </div>
              </div>
              <Link
                to="/app/rewards"
                className="rounded-xl bg-white px-3 py-1.5 text-xs font-black text-primary shadow-xs active:scale-95 transition"
              >
                View Slabs ➔
              </Link>
            </div>

            {/* Progress to Platinum Tier */}
            <div className="mt-3 border-t border-white/15 pt-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-white/80">
                <span>Progress to {dealer.nextTier}</span>
                <span>{progressToNext}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/25">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sub Metrics: Lifetime & Redeemed */}
          <div className="grid grid-cols-2 divide-x divide-line bg-gray-50/70 p-3">
            <div className="pr-2">
              <p className="text-[9px] font-extrabold text-muted uppercase">LIFETIME EARNED</p>
              <p className="mt-0.5 text-base font-black text-ink">
                {dealer.lifetimeEarned.toLocaleString('en-IN')}{' '}
                <span className="text-[10px] font-normal text-muted">Pts</span>
              </p>
              <p className="text-[10px] text-emerald-600 font-bold">
                {dealer.customerSalesCount} Sales Invoiced
              </p>
            </div>
            <div className="pl-3">
              <p className="text-[9px] font-extrabold text-muted uppercase">TOTAL REDEEMED</p>
              <p className="mt-0.5 text-base font-black text-ink">
                {dealer.totalRedeemed.toLocaleString('en-IN')}{' '}
                <span className="text-[10px] font-normal text-muted">Pts</span>
              </p>
              <p className="text-[10px] text-primary font-bold">
                {dealer.giftsDelivered} Gifts Delivered
              </p>
            </div>
          </div>
        </div>

        {/* 4 Operations Quick Stat Tiles */}
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            to="/app/dealer/orders"
            className="rounded-2xl brand-gradient p-3.5 text-white shadow-xs active:scale-98 transition"
          >
            <p className="text-2xl font-black">2</p>
            <p className="mt-0.5 text-xs font-bold text-white/85">Pending Orders</p>
            <p className="text-[10px] text-white/70 mt-1">Review & Dispatch ➔</p>
          </Link>

          <Link
            to="/app/dealer/stock"
            className="rounded-2xl border border-line bg-white p-3.5 shadow-xs active:scale-98 transition"
          >
            <p className="text-2xl font-black text-secondary">1</p>
            <p className="mt-0.5 text-xs font-bold text-ink">Critical SKU</p>
            <p className="text-[10px] text-muted mt-1">12 mm stock low ➔</p>
          </Link>
        </div>

        {/* Quick Simulator Bar for Live Demo */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3 flex items-center justify-between gap-2 shadow-2xs">
          <div className="min-w-0">
            <p className="text-[10px] font-black text-amber-900 uppercase">
              LIVE DEMO SIMULATOR
            </p>
            <p className="text-xs font-bold text-ink truncate">
              Log Invoice: ₹50,000 (+20% Bonus)
            </p>
          </div>
          <button
            onClick={() => {
              const res = simulateSale(50000, 'Apex Build')
              showToast(`✓ +${res.points} Pts added to Dealer Wallet!`)
            }}
            className="shrink-0 rounded-xl brand-gradient px-3 py-1.5 text-xs font-extrabold text-white shadow-xs active:scale-95 transition"
          >
            + Credit 600 Pts
          </button>
        </div>

        {/* Volume Multipliers Snapshot */}
        <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-line pb-2 mb-2">
            <div>
              <p className="text-[10px] font-black uppercase text-primary tracking-wider">
                VOLUME MULTIPLIERS
              </p>
              <h3 className="text-xs font-extrabold text-ink">
                Progressive Slabs Ratio
              </h3>
            </div>
            <Link to="/app/rewards" className="text-[11px] font-bold text-primary">
              All Slabs ➔
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
            <div className="rounded-xl border border-line bg-bg p-2">
              <p className="text-[9px] text-muted font-bold">₹10,000</p>
              <p className="text-xs font-black text-ink mt-0.5">100 Pts</p>
              <p className="text-[9px] text-steel">Base Rate</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-2">
              <p className="text-[9px] text-amber-800 font-bold">₹50,000</p>
              <p className="text-xs font-black text-amber-950 mt-0.5">600 Pts</p>
              <p className="text-[9px] text-primary font-black">+20% Bonus</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-2">
              <p className="text-[9px] text-emerald-800 font-bold">₹1,00,000</p>
              <p className="text-xs font-black text-emerald-950 mt-0.5">1,500 Pts</p>
              <p className="text-[9px] text-emerald-700 font-black">+50% Bonus</p>
            </div>
          </div>
        </div>

        {/* Recent Invoices Accruals */}
        <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-line pb-2 mb-2">
            <h3 className="text-xs font-extrabold text-ink uppercase tracking-wide">
              Recent Customer Invoices
            </h3>
            <span className="text-[10px] text-muted font-bold">
              Automated Accrual
            </span>
          </div>

          <div className="divide-y divide-line/60">
            {transactions.slice(0, 4).map((tx) => (
              <div key={tx.id} className="py-2 flex items-center justify-between gap-2">
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-ink truncate leading-tight">
                    {tx.title}
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">
                    {tx.date} · <span className="text-primary font-semibold">{tx.status}</span>
                  </p>
                </div>
                <span
                  className={`shrink-0 text-xs font-black ${
                    tx.points > 0 ? 'text-emerald-600' : 'text-primary'
                  }`}
                >
                  {tx.points > 0 ? `+${tx.points}` : tx.points} Pts
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Redemption Catalogue Preview */}
        <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-line pb-2 mb-2.5">
            <div>
              <p className="text-[10px] font-black uppercase text-primary tracking-wider">
                GIFTS CATALOGUE
              </p>
              <h3 className="text-xs font-extrabold text-ink">
                Material Goods & Incentives
              </h3>
            </div>
            <Link to="/app/redeem" className="text-[11px] font-bold text-primary">
              Full List ➔
            </Link>
          </div>

          <div className="space-y-2">
            {CATALOGUE_ITEMS.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to="/app/redeem"
                className="flex items-center justify-between rounded-xl border border-line bg-bg p-2 transition active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl p-1 bg-white rounded-lg border border-line">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-ink truncate">{item.subtitle}</p>
                    <p className="text-[10px] text-primary font-bold">
                      {item.points.toLocaleString('en-IN')} Points
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-muted">Claim ➔</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const b = banners[banner]

  return (
    <div className="pb-4">
      {/* ───── Branded header — Blinkit/PhonePe style colored zone ───── */}
      <div className="header-gradient relative overflow-hidden px-4 pt-14 pb-12">
        <div className="pointer-events-none absolute -top-10 -right-12 h-44 w-44 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute top-16 -left-14 h-36 w-36 rounded-full bg-black/10" />

        <div className="relative flex items-center justify-between gap-3">
          <button type="button" onClick={() => setDrawerOpen(true)} className="min-w-0 text-left">
            <p className="text-[10px] font-extrabold tracking-[0.16em] text-white/75 uppercase">
              Delivering to site
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[16px] font-extrabold text-white">
              <span className="truncate">Plot 14, Greater Noida West</span>
              <ChevronDown size={16} className="shrink-0 text-white/80" />
            </p>
          </button>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/app/notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15"
            >
              <Bell size={17} className="text-white" />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-accent ring-2 ring-[#E23A28]" />
            </Link>
            <Link to="/app/profile" className="block h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/60">
              <img src={images.avatar} alt={userName} className="h-full w-full object-cover" />
            </Link>
          </div>
        </div>

        <Link
          to="/app/catalogue"
          className="relative mt-4 flex h-12 items-center gap-3 rounded-2xl bg-white px-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        >
          <Search size={18} className="text-primary" />
          <span className="flex-1 text-[14px] font-medium text-muted">
            Search &ldquo;12 mm Fe 550D&rdquo;
          </span>
          <span className="h-5 w-px bg-line" />
          <Mic size={17} className="text-primary" />
        </Link>

        <div className="relative mt-3 flex items-center justify-between text-white">
          <p className="text-[12px] font-semibold text-white/85">
            Namaste, <span className="font-extrabold text-white">{userName}</span> 👋
          </p>
          <Link
            to="/app/rewards"
            className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-extrabold"
          >
            <Star size={11} className="text-accent" fill="currentColor" />
            {rewards.balance.toLocaleString('en-IN')} pts
          </Link>
        </div>
      </div>

      {/* ───── Content sheet overlapping header ───── */}
      <div className="relative -mt-6 rounded-t-[24px] bg-bg px-4 pt-5">
        {/* Live price — floating card */}
        <Link to="/app/price" className="block">
          <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_10px_30px_rgba(48,56,65,0.08)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[12px] font-semibold text-muted">Today&apos;s Steel Price</p>
                  <Badge tone="live">LIVE</Badge>
                </div>
                <p className="mt-1.5 text-[28px] leading-none font-extrabold tracking-tight text-ink">
                  ₹{livePrice.pricePerTon.toLocaleString('en-IN')}
                  <span className="text-[13px] font-semibold text-muted"> /ton</span>
                </p>
              </div>
              <div className="rounded-xl bg-[#E8F6EE] px-2.5 py-2 text-right">
                <p className="flex items-center justify-end gap-1 text-sm font-extrabold text-success">
                  <TrendingUp size={14} /> +{livePrice.change}%
                </p>
                <p className="mt-0.5 text-[10px] font-semibold text-muted">today</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 text-[11px]">
              <span className="text-steel">
                {livePrice.region} · {livePrice.asOf}
              </span>
              <span className="flex items-center font-bold text-primary">
                Rate breakup <ChevronRight size={13} />
              </span>
            </div>
          </div>
        </Link>

        {/* Services grid — PhonePe pattern */}
        <div className="mt-5 grid grid-cols-4 gap-y-4">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <Link key={s.label} to={s.to} className="flex flex-col items-center gap-1.5">
                <span
                  className="flex h-[54px] w-[54px] items-center justify-center rounded-full transition active:scale-90"
                  style={{ background: s.bg, color: s.color }}
                >
                  <Icon size={23} strokeWidth={2.2} />
                </span>
                <span className="text-[11px] font-bold text-ink">{s.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Offer banner carousel */}
        <div className="mt-5">
          <Link to={b.to} className="block overflow-hidden rounded-2xl">
            <div className="relative h-[132px]">
              <img src={b.img} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
              <div className="absolute inset-0 flex flex-col justify-center p-4 text-white">
                <span className="w-fit rounded-md bg-accent px-2 py-0.5 text-[9px] font-extrabold tracking-[0.1em] text-ink">
                  {b.tag}
                </span>
                <p className="mt-2 text-[21px] leading-tight font-extrabold">{b.title}</p>
                <p className="mt-1 text-[12px] text-white/85">{b.sub}</p>
              </div>
            </div>
          </Link>
          <div className="mt-2.5 flex justify-center gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setBanner(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === banner ? 'w-5 bg-primary' : 'w-1.5 bg-[#E5DFD6]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Shop by size — Blinkit circles */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-ink">Shop by size</h2>
            <Link to="/app/catalogue" className="text-[13px] font-bold text-primary">
              See all
            </Link>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4">
            {sizes.map((s) => (
              <Link key={s.id} to={`/app/product/${s.id}`} className="shrink-0 text-center">
                <span className="block h-[68px] w-[68px] overflow-hidden rounded-full ring-2 ring-white shadow-[0_4px_14px_rgba(48,56,65,0.14)]">
                  <img src={productImage(s.id)} alt={s.label} className="h-full w-full object-cover" />
                </span>
                <p className="mt-1.5 text-[11px] font-extrabold text-ink">{s.label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Bestsellers — 2-col with ADD */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-ink">Bestsellers</h2>
            <Link to="/app/catalogue" className="text-[13px] font-bold text-primary">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products
              .filter((p) => p.id.startsWith('tmt'))
              .slice(0, 4)
              .map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-2xl border border-line bg-white"
                >
                  <Link to={`/app/product/${p.id}`} className="relative block">
                    <span className="block aspect-square bg-[#F5F3EF]">
                      <img src={productImage(p.id)} alt="" className="h-full w-full object-cover" />
                    </span>
                    {p.badge && (
                      <span className="absolute top-2 left-2 rounded-md bg-primary px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                        {p.badge}
                      </span>
                    )}
                  </Link>
                  <div className="p-2.5">
                    <Link to={`/app/product/${p.id}`}>
                      <p className="text-[13px] font-extrabold text-ink">{p.dia} TMT</p>
                      <p className="mt-0.5 text-[11px] text-muted">{p.grade}</p>
                    </Link>
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <p className="text-[14px] font-extrabold text-ink">
                        ₹{p.price.toLocaleString('en-IN')}
                        <span className="text-[9px] font-medium text-muted">/t</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => showToast(`${p.dia} added to quote`)}
                        className="flex h-8 items-center gap-0.5 rounded-lg border-[1.5px] border-primary bg-[#FDECEC] px-2 text-[11px] font-extrabold text-primary active:scale-95"
                      >
                        ADD <Plus size={13} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* QR authenticity strip */}
        <Link to="/app/scan" className="mt-5 block overflow-hidden rounded-2xl bg-ink">
          <div className="flex items-center gap-3 p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent">
              <ShieldCheck size={24} />
            </span>
            <div className="min-w-0 flex-1 text-white">
              <p className="text-[15px] font-extrabold">Verify genuine Amba TMT</p>
              <p className="mt-0.5 text-[12px] text-white/60">
                Scan the QR on your bundle — batch, grade & dealer
              </p>
            </div>
            <ChevronRight size={18} className="shrink-0 text-white/50" />
          </div>
        </Link>

        {/* Active order */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-ink">Track delivery</h2>
            <Link to={`/app/orders/${orders[0].id}`} className="text-[13px] font-bold text-primary">
              Details
            </Link>
          </div>
          <Link to={`/app/orders/${orders[0].id}`} className="block">
            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <div className="flex">
                <img src={productImage('tmt-12')} alt="" className="h-[96px] w-[84px] object-cover" />
                <div className="min-w-0 flex-1 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[14px] font-extrabold text-ink">{orders[0].id}</p>
                      <p className="mt-0.5 truncate text-[12px] text-muted">{orders[0].product}</p>
                    </div>
                    <Badge tone="warning">{orders[0].status}</Badge>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#F3F1EC]">
                    <div className="brand-gradient h-full w-[72%] rounded-full" />
                  </div>
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-steel">
                    <Truck size={12} className="text-primary" /> ETA {orders[0].eta}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Nearby dealers rail */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-ink">Dealers near you</h2>
            <Link to="/app/dealers" className="text-[13px] font-bold text-primary">
              View all
            </Link>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
            {dealers.map((d) => (
              <Link key={d.id} to="/app/dealers" className="w-[190px] shrink-0">
                <div className="overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative h-[92px]">
                    <img src={dealerImage(d.id)} alt="" className="h-full w-full object-cover" />
                    <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/65 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      <MapPin size={10} /> {d.distanceKm} km
                    </span>
                  </div>
                  <div className="p-2.5">
                    <p className="truncate text-[13px] font-extrabold text-ink">{d.name}</p>
                    <p className="mt-0.5 truncate text-[11px] text-muted">
                      ★ {d.rating} · {d.stock}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
