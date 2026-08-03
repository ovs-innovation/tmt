import { Link } from 'react-router-dom'
import { ChevronRight, Gift, Sparkles, Star, Trophy } from 'lucide-react'
import { Badge, Button, Page, PageHeader, SectionTitle } from '../components/ui'
import { referrals, rewards } from '../data/mock'
import { useApp } from '../context/AppContext'

export default function Rewards() {
  const { showToast, t } = useApp()
  const progress = Math.min(100, Math.round((rewards.lifetime / rewards.nextTierAt) * 100))
  const toNext = Math.max(0, rewards.nextTierAt - rewards.lifetime)

  return (
    <Page>
      <PageHeader title={t('Rewards', 'रिवॉर्ड्स')} subtitle={rewards.tier} />

      {/* Points wallet — clean hero */}
      <div className="overflow-hidden rounded-[22px] header-gradient p-5 text-white shadow-[0_12px_32px_rgba(215,25,32,0.28)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-white/80">
              <Sparkles size={14} className="text-accent" />
              Available balance
            </p>
            <p className="mt-2 text-[42px] leading-none font-extrabold tracking-tight">
              {rewards.balance.toLocaleString('en-IN')}
            </p>
            <p className="mt-1 text-[13px] font-semibold text-white/75">Amba Points</p>
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-extrabold">
            {rewards.tier}
          </span>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-white/75">
            <span>Next tier progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-white/65">
            {toNext.toLocaleString('en-IN')} pts more · lifetime{' '}
            {rewards.lifetime.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/app/redeem">
          <Button className="w-full">
            <Gift size={16} /> Redeem
          </Button>
        </Link>
        <Link to="/app/referral">
          <Button variant="outline" className="w-full">
            Refer & earn
          </Button>
        </Link>
      </div>

      {/* Campaign strip */}
      <Link
        to="/app/referral"
        className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-white p-3.5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF6D9] text-[#C48A00]">
          <Star size={20} fill="currentColor" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-extrabold text-ink">{rewards.campaign.title}</p>
          <p className="mt-0.5 text-[12px] text-muted">{rewards.campaign.subtitle}</p>
        </div>
        <ChevronRight size={18} className="text-steel" />
      </Link>

      {/* Redeem options — clean white cards */}
      <div className="mt-6">
        <SectionTitle title="Redeem for" />
        <div className="space-y-2.5">
          {rewards.redeemOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => showToast(`${o.title} selected`)}
              className="flex w-full items-center gap-3 rounded-2xl border border-line bg-white p-3.5 text-left active:scale-[0.99]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FDECEC] text-primary">
                <Gift size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-extrabold text-ink">{o.title}</p>
                  {o.tag && <Badge tone="gold">{o.tag}</Badge>}
                </div>
                <p className="mt-0.5 text-[12px] font-bold text-secondary">
                  {o.points.toLocaleString('en-IN')} points
                </p>
              </div>
              <ChevronRight size={18} className="text-steel" />
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard preview */}
      <div className="mt-6">
        <SectionTitle
          title="Leaderboard"
          action={
            <Link to="/app/leaderboard" className="text-sm font-bold text-primary">
              Full list
            </Link>
          }
        />
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          {referrals.leaderboard.slice(0, 3).map((row, i) => (
            <div
              key={row.rank}
              className={`flex items-center justify-between px-3.5 py-3 ${
                i < 2 ? 'border-b border-line' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ${
                    row.you ? 'bg-primary text-white' : 'bg-[#F3F1EC] text-ink'
                  }`}
                >
                  {row.rank === 1 ? <Trophy size={14} /> : row.rank}
                </span>
                <div>
                  <p className={`text-[14px] font-bold ${row.you ? 'text-primary' : 'text-ink'}`}>
                    {row.name}
                  </p>
                  <p className="text-[11px] text-steel">{row.city}</p>
                </div>
              </div>
              <p className="text-[13px] font-extrabold text-ink">
                {row.points.toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="mt-6">
        <SectionTitle title="Recent activity" />
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          {rewards.history.map((h, i) => (
            <div
              key={h.id}
              className={`flex items-center justify-between px-3.5 py-3.5 ${
                i < rewards.history.length - 1 ? 'border-b border-line' : ''
              }`}
            >
              <div className="min-w-0 pr-3">
                <p className="truncate text-[13px] font-bold text-ink">{h.title}</p>
                <p className="mt-0.5 text-[11px] text-steel">{h.date}</p>
              </div>
              <span
                className={`shrink-0 text-[14px] font-extrabold ${
                  h.points > 0 ? 'text-success' : 'text-secondary'
                }`}
              >
                {h.points > 0 ? '+' : ''}
                {h.points.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}
