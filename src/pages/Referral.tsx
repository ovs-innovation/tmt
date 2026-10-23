import { useState } from 'react'
import { Plus, Share2, ShieldCheck } from 'lucide-react'
import { Button, Card, Page, PageHeader } from '../components/ui'
import { useApp } from '../context/AppContext'
import { useRewards } from '../context/RewardsContext'

export default function Referral() {
  const { showToast } = useApp()
  const { referral, inviteContractor } = useRewards()

  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [site, setSite] = useState('')

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      showToast('Please enter contractor name and phone')
      return
    }
    inviteContractor(name, phone, site)
    showToast(`Invite sent to ${name}! Status: Verifying Site`)
    setShowModal(false)
    setName('')
    setPhone('')
    setSite('')
  }

  return (
    <Page>
      <PageHeader
        title="Referral Ecosystem"
        subtitle="Customer-Initiated Contractor & Site Fabricator Onboarding"
        backTo="/app/rewards"
      />

      {/* Hero Box */}
      <Card className="bg-ink text-center text-white p-5">
        <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-black tracking-wider text-emerald-400 uppercase">
          SYSTEM ACTIVE · TWO-WAY LINKED ACCRUAL
        </span>
        <p className="mt-3 text-xs text-white/60 uppercase tracking-widest">
          CUSTOMER UNIQUE LINK / CODE
        </p>
        <p className="mt-2 text-3xl font-black tracking-[0.2em] text-accent font-mono">
          {referral.customerCode}
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 text-xs"
            onClick={() => {
              const text = `Join Amba Shakti Partner App with my Referral Code: ${referral.customerCode} to earn reward points on your site deliveries!`
              const url = `https://wa.me/?text=${encodeURIComponent(text)}`
              window.open(url, '_blank')
              showToast('Opening WhatsApp invite...')
            }}
          >
            <Share2 size={15} />
            Share WhatsApp Invite
          </Button>
          <Button
            variant="outline"
            className="w-full text-xs text-white bg-white/10 border-white/20 hover:bg-white/20"
            onClick={() => {
              navigator.clipboard?.writeText(referral.customerCode)
              showToast('Referral code copied to clipboard!')
            }}
          >
            Copy Code
          </Button>
        </div>
      </Card>

      {/* 3 Metric Badges (Exact Blueprint Match) */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-line bg-white p-3.5 text-center shadow-xs">
          <p className="text-[10px] font-extrabold text-muted uppercase">INVITES SENT</p>
          <p className="mt-1 text-2xl font-black text-ink">
            {String(referral.invitesSent).padStart(2, '0')}
          </p>
          <p className="mt-0.5 text-[10px] text-muted">Contractors</p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 text-center shadow-xs">
          <p className="text-[10px] font-extrabold text-amber-800 uppercase">VERIFYING</p>
          <p className="mt-1 text-2xl font-black text-amber-900">
            {String(referral.verifyingSites).padStart(2, '0')}
          </p>
          <p className="mt-0.5 text-[10px] text-amber-700">Sites Pending</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-center shadow-xs">
          <p className="text-[10px] font-extrabold text-emerald-800 uppercase">
            PURCHASES VERIFIED
          </p>
          <p className="mt-1 text-2xl font-black text-emerald-900">
            {String(referral.purchasesVerified).padStart(2, '0')}
          </p>
          <p className="mt-0.5 text-[10px] text-emerald-700">Active Invoiced Sites</p>
        </div>
      </div>

      {/* Balance Card */}
      <div className="mt-4 rounded-2xl header-gradient p-5 text-center text-white shadow-sm">
        <p className="text-[11px] font-bold text-white/80 uppercase tracking-wider">
          CUSTOMER REFERRAL BALANCE
        </p>
        <p className="mt-1.5 text-3xl font-black tracking-tight">
          ₹{referral.discountValueRupees.toLocaleString('en-IN')} Discount Value /{' '}
          {referral.referralPoints.toLocaleString('en-IN')} Points
        </p>
        <p className="mt-1 text-xs text-white/70">
          Discount applies automatically at checkout on verified dealer deliveries
        </p>
      </div>

      {/* Button to simulate invite */}
      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full text-xs font-bold"
          onClick={() => setShowModal(true)}
        >
          <Plus size={14} /> + Onboard New Site Contractor (Live Demo)
        </Button>
      </div>

      {/* Governance Rules & Fraud Safeguards */}
      <div className="mt-6 rounded-[22px] border border-line bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div>
            <p className="text-[10px] font-black tracking-wider text-primary uppercase">
              ENTERPRISE CONTROLS
            </p>
            <h3 className="text-sm font-extrabold text-ink">
              Governance Rules & Fraud Safeguards
            </h3>
          </div>
          <ShieldCheck size={18} className="text-emerald-600" />
        </div>

        <div className="mt-3 space-y-2.5 text-xs">
          <div className="rounded-xl border border-line/70 bg-bg p-3">
            <p className="font-bold text-ink">1. Contractor Identity Verification</p>
            <p className="mt-0.5 text-muted leading-relaxed">
              Invited contractor submits operational site details and mobile OTP before binding.
            </p>
          </div>
          <div className="rounded-xl border border-line/70 bg-bg p-3">
            <p className="font-bold text-ink">2. First Commercial Order Rule</p>
            <p className="mt-0.5 text-muted leading-relaxed">
              Referral points remain strictly locked until the contractor's site logs a verified dealer invoice.
            </p>
          </div>
          <div className="rounded-xl border border-line/70 bg-bg p-3">
            <p className="font-bold text-ink">3. Reciprocal Benefit Allocation</p>
            <p className="mt-0.5 text-muted leading-relaxed">
              Customer receives referral points, and the contractor obtains verified tier reward credits.
            </p>
          </div>
          <div className="rounded-xl border border-line/70 bg-bg p-3">
            <p className="font-bold text-ink">4. Automated Duplicate & Loop Prevention</p>
            <p className="mt-0.5 text-muted leading-relaxed">
              Referred contractors cannot cross-refer the original customer or share matching tax/bank details.
            </p>
          </div>
        </div>
      </div>

      {/* Onboarded Contractors */}
      <div className="mt-6 rounded-[22px] border border-line bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="text-sm font-extrabold text-ink">
            Invited Contractors ({referral.contractors.length})
          </h3>
          <span className="text-xs text-muted">Real-time ERP binding</span>
        </div>

        <div className="mt-3 divide-y divide-line/60">
          {referral.contractors.map((c) => (
            <div key={c.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-ink">{c.name}</p>
                <p className="text-[11px] text-muted">{c.phone} · {c.site}</p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    c.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {c.status}
                </span>
                <p className="text-[10px] text-steel mt-0.5">
                  {c.invoicedTons > 0 ? `${c.invoicedTons}T Invoiced` : 'Pending Order'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleInviteSubmit}
            className="w-full max-w-sm rounded-[24px] border border-line bg-white p-5 shadow-2xl space-y-3"
          >
            <h3 className="text-base font-black text-ink">Onboard New Site Contractor</h3>
            <p className="text-xs text-muted">
              Sends automated invite code <code className="font-bold text-primary">{referral.customerCode}</code>
            </p>

            <div>
              <label className="text-[11px] font-bold text-muted uppercase">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink"
                placeholder="Contractor or Mason Name"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-muted uppercase">Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink"
                placeholder="+91 98000 00000"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-muted uppercase">Site Location</label>
              <input
                type="text"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink"
                placeholder="Plot / Project Address"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="h-10 text-xs"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="h-10 text-xs">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </Page>
  )
}
