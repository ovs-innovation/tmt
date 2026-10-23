import { useState } from 'react'
import {
  Plus,
  RefreshCw,
  Share2,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Button, Page, PageHeader } from '../components/ui'
import { useApp } from '../context/AppContext'
import {
  CATALOGUE_ITEMS,
  VOLUME_SLABS,
  type CatalogueItem,
  useRewards,
} from '../context/RewardsContext'

export default function Rewards() {
  const { showToast, t } = useApp()
  const {
    dealer,
    transactions,
    referral,
    calculatePointsForSale,
    simulateSale,
    redeemGift,
    inviteContractor,
    resetToBlueprintDefault,
  } = useRewards()

  // Active view tab: 'dealer' | 'referral' | 'simulator'
  const [activeTab, setActiveTab] = useState<'dealer' | 'referral' | 'simulator'>('dealer')

  // Simulator state
  const [simAmount, setSimAmount] = useState<number>(50000)
  const [simCustomer, setSimCustomer] = useState<string>('Apex Build')
  const [simSuccessMsg, setSimSuccessMsg] = useState<string | null>(null)

  // Redemption Modal state
  const [redeemModalItem, setRedeemModalItem] = useState<CatalogueItem | null>(null)
  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState<string | null>(null)

  // Invite modal state
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
  const [inviteName, setInviteName] = useState('')
  const [invitePhone, setInvitePhone] = useState('')
  const [inviteSite, setInviteSite] = useState('')

  const handleSimulateInvoice = (amountToUse?: number, customerToUse?: string) => {
    const amt = amountToUse !== undefined ? amountToUse : simAmount
    const cust = customerToUse || simCustomer
    const res = simulateSale(amt, cust)
    setSimSuccessMsg(
      `✓ Bill #${res.invoiceNo} generated! +${res.points.toLocaleString('en-IN')} Pts credited to Dealer Wallet with ${res.bonusLabel}.`
    )
    showToast(`+${res.points} Pts added for ${cust}!`)
    setTimeout(() => setSimSuccessMsg(null), 5000)
  }

  const handleConfirmRedeem = (item: CatalogueItem) => {
    const res = redeemGift(item)
    if (res.success) {
      setRedeemSuccessMsg(res.message)
      showToast(`${item.subtitle} redeemed!`)
      setTimeout(() => {
        setRedeemSuccessMsg(null)
        setRedeemModalItem(null)
      }, 3000)
    } else {
      showToast(res.message)
    }
  }

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteName.trim() || !invitePhone.trim()) {
      showToast('Please enter contractor name and phone')
      return
    }
    inviteContractor(inviteName, invitePhone, inviteSite)
    showToast(`Invite sent to ${inviteName}! Status: Verifying Site`)
    setShowInviteModal(false)
    setInviteName('')
    setInvitePhone('')
    setInviteSite('')
  }

  const progressToNextTier = Math.min(
    100,
    Math.round((dealer.lifetimeEarned / dealer.nextTierAt) * 100)
  )

  const liveSimCalc = calculatePointsForSale(simAmount)

  return (
    <Page className="pb-28">
      {/* Top Corporate Blueprint Reference Strip */}
      <div className="mb-3 rounded-xl border border-line bg-white px-3 py-2 text-[11px] shadow-2xs">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate font-extrabold text-primary uppercase text-[10px] tracking-wide">
              AMBA SHAKTI · ASM-REV-2026-v2
            </span>
          </div>
          <button
            onClick={() => {
              resetToBlueprintDefault()
              showToast('Demo data reset to initial blueprint values')
            }}
            className="shrink-0 inline-flex items-center gap-1 rounded-md border border-line bg-bg px-2 py-0.5 text-[10px] font-bold text-muted hover:text-ink active:scale-95 transition"
            title="Reset to 14,850 Pts"
          >
            <RefreshCw size={10} />
            Reset Demo
          </button>
        </div>
      </div>

      <PageHeader
        title={t('Rewards & Ecosystem', 'रिवॉर्ड्स व पार्टनर')}
        subtitle="Dealer Sales Incentive & Contractor Referral System"
      />

      {/* Mobile-Friendly Tabs Switcher (3 Tabs) */}
      <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-[#ECE9E2] p-1 text-[12px] font-bold">
        <button
          onClick={() => setActiveTab('dealer')}
          className={`flex items-center justify-center gap-1 rounded-lg py-2 transition ${
            activeTab === 'dealer'
              ? 'bg-white text-ink shadow-xs font-extrabold'
              : 'text-muted hover:text-ink'
          }`}
        >
          <span>🏢 Dealer</span>
        </button>
        <button
          onClick={() => setActiveTab('referral')}
          className={`flex items-center justify-center gap-1 rounded-lg py-2 transition ${
            activeTab === 'referral'
              ? 'bg-white text-ink shadow-xs font-extrabold'
              : 'text-muted hover:text-ink'
          }`}
        >
          <span>👥 Referral</span>
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center justify-center gap-1 rounded-lg py-2 transition ${
            activeTab === 'simulator'
              ? 'bg-white text-ink shadow-xs font-extrabold'
              : 'text-muted hover:text-ink'
          }`}
        >
          <Zap size={13} className="text-amber-500" />
          <span>⚡ Simulator</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {simSuccessMsg && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800 animate-in fade-in">
          {simSuccessMsg}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: DEALER REWARDS MODULE (Continuous Dealer-to-Customer Sales Volume)  */}
      {/* ========================================================================= */}
      {activeTab === 'dealer' && (
        <div className="space-y-4">
          {/* Header Description & Default Ratio */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
            <div className="flex items-center justify-between gap-2 border-b border-line pb-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                Primary Revenue Framework
              </span>
              <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-extrabold text-amber-900">
                100 Pts / ₹10,000 (1T ≈ 100 Pts)
              </span>
            </div>
            <p className="text-xs font-bold text-ink leading-snug">
              Continuous Sales to Customers Yield Ongoing Dealer Points
            </p>
            <p className="mt-1 text-[11px] text-muted leading-tight">
              Dealers receive automated Reward Points upon each invoiced retail or institutional customer delivery.
            </p>
          </div>

          {/* Dealer Wallet Hero Card (Mobile-Optimized) */}
          <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-sm">
            <div className="header-gradient p-4 text-white">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black tracking-wider text-white uppercase">
                  DEALER WALLET
                </span>
                <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-black tracking-wider text-white">
                  {dealer.partnerStatus}
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold text-white/80 uppercase tracking-wide">
                    AVAILABLE REDEEMABLE POINTS
                  </p>
                  <div className="mt-0.5 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black tracking-tight leading-none">
                      {dealer.availablePoints.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-white/85">Pts</span>
                  </div>
                  <p className="mt-1 text-[11px] text-white/70 truncate max-w-[200px]">
                    {dealer.dealerName}
                  </p>
                </div>

                <div className="rounded-xl border border-white/20 bg-white/10 px-2.5 py-1.5 text-right backdrop-blur-xs">
                  <p className="text-[9px] font-bold text-white/70 uppercase">Tier</p>
                  <p className="text-xs font-black text-white">{dealer.tier}</p>
                </div>
              </div>

              {/* Progress Bar to Platinum */}
              <div className="mt-3 border-t border-white/15 pt-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-white/80">
                  <span>To {dealer.nextTier}</span>
                  <span>{progressToNextTier}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/25">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${progressToNextTier}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Metric Boxes (Lifetime Earned & Total Redeemed) */}
            <div className="grid grid-cols-2 divide-x divide-line bg-gray-50/70 p-3">
              <div className="pr-2">
                <p className="text-[9px] font-extrabold text-muted uppercase">LIFETIME EARNED</p>
                <p className="mt-0.5 text-lg font-black text-ink">
                  {dealer.lifetimeEarned.toLocaleString('en-IN')}{' '}
                  <span className="text-[10px] font-normal text-muted">Pts</span>
                </p>
                <p className="text-[10px] text-emerald-600 font-bold">
                  {dealer.customerSalesCount} Sales Invoiced
                </p>
              </div>
              <div className="pl-3">
                <p className="text-[9px] font-extrabold text-muted uppercase">TOTAL REDEEMED</p>
                <p className="mt-0.5 text-lg font-black text-ink">
                  {dealer.totalRedeemed.toLocaleString('en-IN')}{' '}
                  <span className="text-[10px] font-normal text-muted">Pts</span>
                </p>
                <p className="text-[10px] text-primary font-bold">
                  {dealer.giftsDelivered} Gifts Delivered
                </p>
              </div>
            </div>

            {/* Quick Demo CTA */}
            <div className="flex items-center justify-between bg-white px-3 py-2.5 border-t border-line">
              <span className="text-[11px] font-bold text-ink">
                Simulate Sale:
              </span>
              <Button
                variant="primary"
                className="h-7 px-2.5 text-[11px]"
                onClick={() => handleSimulateInvoice(50000, 'Apex Build')}
              >
                <Plus size={12} /> + ₹50k Sale (600 Pts)
              </Button>
            </div>
          </div>

          {/* System Architecture 6-Step Visual Cycle (Mobile Horizontal Scroll) */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black tracking-wider text-muted uppercase">
                System Architecture (6 Steps)
              </p>
              <span className="text-[10px] font-bold text-primary">Swipe ➔</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none snap-x">
              {[
                { step: '01', title: 'Customer Order', desc: 'Demand placed with dealer' },
                { step: '02', title: 'Invoice & Dispatch', desc: 'Logged with GST / ID' },
                { step: '03', title: 'Points Calc', desc: 'Multiplier logic applied' },
                { step: '04', title: 'Wallet Balance', desc: 'Securely stored in account' },
                { step: '05', title: 'Redemption Claim', desc: 'Merchandise requested' },
                { step: '06', title: 'HQ Dispatch', desc: 'Gift delivered to dealership' },
              ].map((s) => (
                <div
                  key={s.step}
                  className="w-[125px] shrink-0 snap-start rounded-xl border border-line bg-bg p-2.5"
                >
                  <span className="inline-block rounded-md bg-primary/10 px-1.5 py-0.5 text-[9px] font-black text-primary">
                    STEP {s.step}
                  </span>
                  <p className="mt-1 text-[11px] font-extrabold text-ink leading-tight">
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted leading-tight">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Volume-Based Reward Multipliers (Progressive Slabs - Mobile Cards) */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-line pb-2 mb-2.5">
              <div>
                <p className="text-[10px] font-black uppercase text-primary tracking-wider">
                  PROGRESSIVE SLABS
                </p>
                <h3 className="text-xs font-extrabold text-ink">
                  Volume Multipliers & Bonuses
                </h3>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                High-Basket
              </span>
            </div>

            <div className="space-y-1.5">
              {VOLUME_SLABS.map((s) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between rounded-xl border p-2.5 transition ${
                    s.isBonus
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-line bg-bg'
                  }`}
                >
                  <div>
                    <span className="text-xs font-black text-ink">{s.label}</span>
                    <p className={`text-[10px] font-bold mt-0.5 ${s.isBonus ? 'text-primary' : 'text-muted'}`}>
                      {s.commercialIncentive}
                    </p>
                  </div>
                  <span
                    className={`rounded-lg px-2 py-1 text-xs font-black ${
                      s.isBonus
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white text-ink border border-line'
                    }`}
                  >
                    {s.points} Pts
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2.5 rounded-xl border border-line bg-bg p-2.5 text-[11px] text-muted leading-relaxed">
              <strong className="text-ink font-bold">Commercial Objective:</strong>{' '}
              Higher multipliers on ₹50,000+ orders incentivize dealers to combine small demands into bulk billing.
            </div>
          </div>

          {/* Recent Invoices Feed */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-line pb-2 mb-2">
              <h3 className="text-xs font-extrabold text-ink uppercase tracking-wide">
                Recent Invoices & Claims
              </h3>
              <span className="text-[11px] text-muted font-bold">
                {transactions.length} records
              </span>
            </div>

            <div className="divide-y divide-line/60">
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="py-2 flex items-center justify-between">
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

          {/* Redemption Catalogue: 5 Official Merchandise Items */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-line pb-2 mb-3">
              <div>
                <p className="text-[10px] font-black uppercase text-primary tracking-wider">
                  CATALOGUE
                </p>
                <h3 className="text-xs font-extrabold text-ink">
                  Material Goods & Merchandise
                </h3>
              </div>
              <span className="text-[11px] font-bold text-muted">
                {dealer.availablePoints.toLocaleString('en-IN')} Pts
              </span>
            </div>

            <div className="space-y-2.5">
              {CATALOGUE_ITEMS.map((item) => {
                const canRedeem = dealer.availablePoints >= item.points
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-line bg-bg p-2.5 transition active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-2xl shrink-0 p-1 bg-white rounded-lg border border-line">
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-ink truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] font-bold text-primary truncate">
                          {item.subtitle}
                        </p>
                        <p className="text-[10px] font-black text-ink mt-0.5">
                          {item.points.toLocaleString('en-IN')}{' '}
                          <span className="text-muted font-normal">Points</span>
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={canRedeem ? 'primary' : 'outline'}
                      className="h-7 px-3 text-[11px] shrink-0"
                      disabled={!canRedeem}
                      onClick={() => setRedeemModalItem(item)}
                    >
                      {canRedeem ? 'Redeem' : 'Locked'}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REFERRAL ECOSYSTEM (Page 2 of 2 · Referral Logic)                  */}
      {/* ========================================================================= */}
      {activeTab === 'referral' && (
        <div className="space-y-4">
          {/* Header Card */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-line pb-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                Network Acquisition
              </span>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-black text-primary">
                Two-Way Linked Accrual
              </span>
            </div>
            <p className="text-xs font-bold text-ink leading-snug">
              The Customer Brings the Contractor into the Network
            </p>
            <p className="mt-1 text-[11px] text-muted leading-tight">
              Customer shares invite code with local contractor. When dealer fulfills invoiced steel, customer gets discount & contractor gets tier performance credits.
            </p>
          </div>

          {/* Tripartite Structural Workflow Stepper */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
            <p className="text-[10px] font-black text-muted uppercase tracking-wider mb-2">
              Tripartite Structural Workflow
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 rounded-xl border border-line bg-bg p-2.5">
                <span className="h-6 w-6 shrink-0 rounded-full bg-primary/15 text-primary text-[11px] font-black flex items-center justify-center">
                  1
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-ink">END CUSTOMER</p>
                  <p className="text-[10px] text-muted truncate">
                    Shares Unique Invite Code via App
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-line bg-bg p-2.5">
                <span className="h-6 w-6 shrink-0 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black flex items-center justify-center">
                  2
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-ink">CONTRACTOR ONBOARDS</p>
                  <p className="text-[10px] text-muted truncate">
                    Submits Site & Trade Details (Mobile OTP)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-line bg-bg p-2.5">
                <span className="h-6 w-6 shrink-0 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center justify-center">
                  3
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-ink">DEALER FULFILLS SALE</p>
                  <p className="text-[10px] text-muted truncate">
                    Invoiced Steel Delivery Unlocks Two-Way Points
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Referral Dashboard Card */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="text-[10px] font-black uppercase text-ink tracking-wider">
                CUSTOMER DASHBOARD
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800">
                SYSTEM ACTIVE
              </span>
            </div>

            {/* Invite Code Display */}
            <div className="mt-3 rounded-xl bg-ink p-4 text-center text-white">
              <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">
                CUSTOMER UNIQUE LINK / CODE
              </p>
              <p className="mt-1 text-2xl font-black tracking-[0.16em] text-accent font-mono">
                {referral.customerCode}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button
                  className="h-8 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                  onClick={() => {
                    const text = `Join Amba Shakti Partner App with my Referral Code: ${referral.customerCode} to earn reward points on your site deliveries!`
                    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
                    window.open(url, '_blank')
                    showToast('Opening WhatsApp invite...')
                  }}
                >
                  <Share2 size={13} /> WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="h-8 text-[11px] text-white bg-white/10 border-white/20 hover:bg-white/20"
                  onClick={() => {
                    navigator.clipboard?.writeText(referral.customerCode)
                    showToast('Code copied to clipboard!')
                  }}
                >
                  Copy Code
                </Button>
              </div>
            </div>

            {/* 3 Metric Counters */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-line bg-bg p-2">
                <p className="text-[8px] font-extrabold text-muted uppercase">INVITES</p>
                <p className="mt-0.5 text-lg font-black text-ink">
                  {String(referral.invitesSent).padStart(2, '0')}
                </p>
                <p className="text-[9px] text-muted truncate">Contractors</p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-2">
                <p className="text-[8px] font-extrabold text-amber-800 uppercase">VERIFYING</p>
                <p className="mt-0.5 text-lg font-black text-amber-900">
                  {String(referral.verifyingSites).padStart(2, '0')}
                </p>
                <p className="text-[9px] text-amber-700 truncate">Pending Site</p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-2">
                <p className="text-[8px] font-extrabold text-emerald-800 uppercase">ACTIVE</p>
                <p className="mt-0.5 text-lg font-black text-emerald-900">
                  {String(referral.purchasesVerified).padStart(2, '0')}
                </p>
                <p className="text-[9px] text-emerald-700 truncate">Invoiced</p>
              </div>
            </div>

            {/* Customer Referral Balance */}
            <div className="mt-3 rounded-xl header-gradient p-3 text-center text-white">
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/80">
                CUSTOMER REFERRAL BALANCE
              </p>
              <p className="mt-0.5 text-xl font-black tracking-tight">
                ₹{referral.discountValueRupees.toLocaleString('en-IN')} Discount /{' '}
                {referral.referralPoints.toLocaleString('en-IN')} Pts
              </p>
              <p className="text-[10px] text-white/70">
                Redeemable as discount on next TMT order
              </p>
            </div>

            <Button
              variant="outline"
              className="mt-3 w-full h-8 text-xs font-bold"
              onClick={() => setShowInviteModal(true)}
            >
              <Plus size={13} /> + Onboard New Contractor (Live Demo)
            </Button>
          </div>

          {/* Governance Rules & Fraud Safeguards (Enterprise Controls) */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-line pb-2 mb-2.5">
              <div>
                <p className="text-[10px] font-black uppercase text-primary tracking-wider">
                  ENTERPRISE CONTROLS
                </p>
                <h3 className="text-xs font-extrabold text-ink">
                  Governance Rules & Fraud Safeguards
                </h3>
              </div>
              <ShieldCheck size={16} className="text-emerald-600" />
            </div>

            <div className="space-y-2 text-[11px]">
              {[
                {
                  id: 1,
                  title: '1. Contractor Identity Verification',
                  desc: 'Mobile OTP & operational site details verified before binding.',
                },
                {
                  id: 2,
                  title: '2. First Commercial Order Rule',
                  desc: 'Referral points remain locked until contractor logs verified dealer invoice.',
                },
                {
                  id: 3,
                  title: '3. Reciprocal Benefit Allocation',
                  desc: 'Customer receives discount points; contractor receives tier reward credits.',
                },
                {
                  id: 4,
                  title: '4. Automated Duplicate & Loop Prevention',
                  desc: 'Contractors cannot cross-refer customer or share matching tax/bank details.',
                },
              ].map((r) => (
                <div key={r.id} className="rounded-xl border border-line bg-bg p-2.5">
                  <p className="font-bold text-ink leading-tight">{r.title}</p>
                  <p className="mt-0.5 text-muted leading-tight">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contractors List */}
          <div className="rounded-2xl border border-line bg-white p-3.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-line pb-2 mb-2">
              <h3 className="text-xs font-extrabold text-ink">
                Network Contractors ({referral.contractors.length})
              </h3>
              <span className="text-[10px] text-muted">ERP Mapped</span>
            </div>

            <div className="divide-y divide-line/60">
              {referral.contractors.map((c) => (
                <div key={c.id} className="py-2 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-ink truncate">{c.name}</p>
                    <p className="text-[10px] text-muted truncate">{c.site}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                        c.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {c.status}
                    </span>
                    <p className="text-[10px] text-primary font-bold mt-0.5">
                      {c.invoicedTons > 0 ? `${c.invoicedTons}T Delivered` : 'Pending Order'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LIVE INTERACTIVE SIMULATOR (Mobile Single-Column Layout!)          */}
      {/* ========================================================================= */}
      {activeTab === 'simulator' && (
        <div className="space-y-4">
          {/* Header Banner */}
          <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5">
              <Zap size={16} className="text-amber-600" />
              <h3 className="text-xs font-black text-amber-950">
                Live Sales & Rewards Demo Simulator
              </h3>
            </div>
            <p className="mt-1 text-[11px] text-amber-900 leading-tight">
              Test how customer invoice billing triggers the volume multipliers (+20% and +50% bonus) and automatically credits dealer points.
            </p>
          </div>

          {/* Controls Box - 100% Mobile Full-Width */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-sm space-y-3.5">
            <p className="text-[10px] font-black text-primary uppercase tracking-wider">
              INVOICE GENERATOR
            </p>

            <div>
              <label className="text-[11px] font-bold text-muted uppercase">
                Customer Name
              </label>
              <input
                type="text"
                value={simCustomer}
                onChange={(e) => setSimCustomer(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:outline-primary"
                placeholder="e.g. Apex Build or Shanti Infra"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-muted text-[11px] uppercase">Order Amount</span>
                <span className="text-ink font-black text-sm">
                  ₹{simAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={200000}
                step={5000}
                value={simAmount}
                onChange={(e) => setSimAmount(Number(e.target.value))}
                className="mt-2 w-full accent-primary cursor-pointer"
              />

              {/* 4 Preset Buttons in a 2x2 Clean Grid (Never breaks or wraps) */}
              <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSimAmount(10000)}
                  className={`rounded-xl py-2 px-2 border text-center transition ${
                    simAmount === 10000
                      ? 'border-primary bg-primary text-white font-black'
                      : 'border-line bg-bg text-ink'
                  }`}
                >
                  ₹10,000 (Base)
                </button>
                <button
                  type="button"
                  onClick={() => setSimAmount(25000)}
                  className={`rounded-xl py-2 px-2 border text-center transition ${
                    simAmount === 25000
                      ? 'border-primary bg-primary text-white font-black'
                      : 'border-line bg-bg text-ink'
                  }`}
                >
                  ₹25,000 (Linear)
                </button>
                <button
                  type="button"
                  onClick={() => setSimAmount(50000)}
                  className={`rounded-xl py-2 px-2 border text-center transition ${
                    simAmount === 50000
                      ? 'border-primary bg-primary text-white font-black'
                      : 'border-line bg-bg text-ink'
                  }`}
                >
                  ₹50,000 🔥 (+20%)
                </button>
                <button
                  type="button"
                  onClick={() => setSimAmount(100000)}
                  className={`rounded-xl py-2 px-2 border text-center transition ${
                    simAmount === 100000
                      ? 'border-primary bg-primary text-white font-black'
                      : 'border-line bg-bg text-ink'
                  }`}
                >
                  ₹1 Lakh 🔥🔥 (+50%)
                </button>
              </div>
            </div>

            {/* Calculated Preview Card */}
            <div className="rounded-xl border border-line bg-bg p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted text-[11px]">Reward to Issue:</span>
                <span className="text-base font-black text-emerald-600">
                  +{liveSimCalc.points.toLocaleString('en-IN')} Pts
                </span>
              </div>
              <div className="mt-1.5 border-t border-line/60 pt-1.5 flex items-center justify-between text-[10px]">
                <span className="text-muted">Multiplier Applied:</span>
                <span className="font-bold text-primary truncate max-w-[190px]">
                  {liveSimCalc.bonusRate}
                </span>
              </div>
            </div>

            <Button
              className="w-full h-11 text-xs"
              onClick={() => handleSimulateInvoice()}
            >
              <Plus size={14} /> Confirm & Dispatch (Credit Points)
            </Button>
          </div>

          {/* Live Wallet State Card (Below Controls in 1 Column) */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
            <p className="text-[10px] font-black text-muted uppercase tracking-wider mb-2.5">
              UPDATED WALLET BALANCE
            </p>

            <div className="rounded-xl header-gradient p-4 text-white">
              <p className="text-[10px] font-bold text-white/80 uppercase">
                Available Redeemable Points
              </p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-3xl font-black tracking-tight leading-none">
                  {dealer.availablePoints.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-white/85">Pts</span>
              </div>
              <p className="mt-1 text-[11px] text-white/70">
                Tier: <span className="font-bold text-white">{dealer.tier}</span>
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-line bg-bg p-2.5">
                <p className="text-muted text-[9px] uppercase font-bold">Lifetime Earned</p>
                <p className="mt-0.5 font-black text-ink text-sm">
                  {dealer.lifetimeEarned.toLocaleString('en-IN')} Pts
                </p>
              </div>
              <div className="rounded-xl border border-line bg-bg p-2.5">
                <p className="text-muted text-[9px] uppercase font-bold">Total Redeemed</p>
                <p className="mt-0.5 font-black text-ink text-sm">
                  {dealer.totalRedeemed.toLocaleString('en-IN')} Pts
                </p>
              </div>
            </div>

            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => {
                  resetToBlueprintDefault()
                  showToast('Reset back to 14,850 Pts!')
                }}
                className="text-[11px] font-bold text-muted hover:text-ink inline-flex items-center gap-1 active:scale-95 transition"
              >
                <RefreshCw size={11} /> Reset back to initial 14,850 Pts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redemption Confirmation Modal (Mobile-Centered) */}
      {redeemModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-[340px] rounded-[24px] border border-line bg-white p-5 shadow-2xl">
            <div className="text-center">
              <span className="text-4xl">{redeemModalItem.icon}</span>
              <h3 className="mt-2 text-base font-black text-ink">{redeemModalItem.title}</h3>
              <p className="text-xs font-bold text-primary">{redeemModalItem.subtitle}</p>
              <p className="mt-1.5 text-[11px] text-muted leading-tight">
                {redeemModalItem.specs}
              </p>
            </div>

            <div className="my-3 rounded-xl border border-line bg-bg p-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Item Points Cost:</span>
                <span className="font-extrabold text-ink">
                  {redeemModalItem.points.toLocaleString('en-IN')} Pts
                </span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-muted">Available Balance:</span>
                <span className="font-bold text-emerald-600">
                  {dealer.availablePoints.toLocaleString('en-IN')} Pts
                </span>
              </div>
              <div className="mt-1.5 border-t border-line/60 pt-1.5 flex justify-between">
                <span className="font-bold text-ink">Remaining:</span>
                <span className="font-black text-primary">
                  {(dealer.availablePoints - redeemModalItem.points).toLocaleString('en-IN')} Pts
                </span>
              </div>
            </div>

            {redeemSuccessMsg ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-center text-xs font-bold text-emerald-800">
                {redeemSuccessMsg}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-9 text-xs"
                  onClick={() => setRedeemModalItem(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="h-9 text-xs"
                  onClick={() => handleConfirmRedeem(redeemModalItem)}
                >
                  Confirm Claim
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Invite Contractor Modal (Mobile-Centered) */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs animate-in fade-in">
          <form
            onSubmit={handleSendInvite}
            className="w-full max-w-[340px] rounded-[24px] border border-line bg-white p-5 shadow-2xl space-y-3"
          >
            <h3 className="text-sm font-black text-ink">Invite Site Contractor</h3>
            <p className="text-[11px] text-muted">
              Sends automated invite code <code className="font-bold text-primary">{referral.customerCode}</code>
            </p>

            <div>
              <label className="text-[10px] font-bold text-muted uppercase">
                Contractor Name
              </label>
              <input
                type="text"
                required
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink"
                placeholder="e.g. Satish Mistri"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted uppercase">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={invitePhone}
                onChange={(e) => setInvitePhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink"
                placeholder="+91 98765 00000"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted uppercase">
                Site Coordinates
              </label>
              <input
                type="text"
                value={inviteSite}
                onChange={(e) => setInviteSite(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink"
                placeholder="e.g. Sector 128 Villa Site"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="h-9 text-xs"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="h-9 text-xs">
                Send Invite
              </Button>
            </div>
          </form>
        </div>
      )}
    </Page>
  )
}
