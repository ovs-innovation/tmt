import { Link } from 'react-router-dom'
import { Badge, Button, Card, Page, PageHeader, SectionTitle } from '../components/ui'
import { referrals, rewards } from '../data/mock'
import { useApp } from '../context/AppContext'

export default function Rewards() {
  const { showToast, t } = useApp()
  const progress = Math.min(100, Math.round((rewards.lifetime / rewards.nextTierAt) * 100))

  return (
    <Page>
      <PageHeader title={t('Rewards', 'रिवॉर्ड्स')} subtitle={rewards.tier} />

      <Card className="relative overflow-hidden bg-ink text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FFC928]/20 blur-2xl" />
        <div className="absolute -bottom-12 left-8 h-32 w-32 rounded-full bg-[#D71920]/30 blur-2xl" />
        <div className="relative flex items-center gap-5">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg viewBox="0 0 96 96" className="absolute inset-0 h-24 w-24 -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.12)" strokeWidth="8" fill="none" />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="url(#rg)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
              />
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D71920" />
                  <stop offset="55%" stopColor="#F36B21" />
                  <stop offset="100%" stopColor="#FFC928" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-extrabold text-accent">{progress}%</span>
          </div>
          <div>
            <p className="text-sm text-white/60">Total Points</p>
            <p className="mt-1 text-4xl font-extrabold tracking-tight">
              {rewards.balance.toLocaleString('en-IN')}
            </p>
            <p className="mt-2 text-xs text-white/50">
              Lifetime {rewards.lifetime.toLocaleString('en-IN')} · next tier{' '}
              {rewards.nextTierAt.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/app/redeem">
          <Button className="w-full">Redeem</Button>
        </Link>
        <Link to="/app/referral">
          <Button variant="dark" className="w-full">
            Referrals
          </Button>
        </Link>
      </div>

      <div className="mt-7">
        <SectionTitle title="Gift cards" />
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {rewards.redeemOptions.map((o) => (
            <Card key={o.id} className="w-[180px] shrink-0 bg-gradient-to-br from-ink to-[#3a424c] text-white border-0">
              <Badge tone="gold">{o.tag ?? 'Reward'}</Badge>
              <p className="mt-4 text-[15px] font-bold">{o.title}</p>
              <p className="mt-2 text-sm text-accent">{o.points} pts</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <SectionTitle
          title="Leaderboard"
          action={
            <Link to="/app/leaderboard" className="text-sm font-bold text-primary">
              Full list
            </Link>
          }
        />
        <Card className="space-y-3">
          {referrals.leaderboard.slice(0, 3).map((row) => (
            <div key={row.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F1EC] text-sm font-extrabold text-ink">
                  {row.rank}
                </span>
                <div>
                  <p className={`font-bold ${row.you ? 'text-primary' : 'text-ink'}`}>{row.name}</p>
                  <p className="text-xs text-steel">{row.city}</p>
                </div>
              </div>
              <p className="text-sm font-bold">{row.points.toLocaleString('en-IN')}</p>
            </div>
          ))}
        </Card>
      </div>

      <div className="mt-7">
        <SectionTitle title="History" />
        <div className="space-y-3">
          {rewards.history.map((h) => (
            <Card key={h.id} className="flex items-center justify-between py-4">
              <div>
                <p className="font-bold text-ink">{h.title}</p>
                <p className="text-xs text-steel">{h.date}</p>
              </div>
              <Badge tone={h.type === 'earn' ? 'success' : 'gold'}>
                {h.points > 0 ? '+' : ''}
                {h.points}
              </Badge>
            </Card>
          ))}
        </div>
      </div>

      <button className="mt-4 text-sm font-bold text-muted" onClick={() => showToast('Rewards synced')}>
        Refresh balance
      </button>
    </Page>
  )
}
