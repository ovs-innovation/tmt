import { Badge, Card, Page, PageHeader } from '../components/ui'
import { referrals } from '../data/mock'

export default function Leaderboard() {
  return (
    <Page>
      <PageHeader title="Leaderboard" subtitle="Top Amba Shakti partners" backTo="/app/rewards" />
      <div className="space-y-3">
        {referrals.leaderboard.map((row) => (
          <Card
            key={row.rank}
            className={`flex items-center justify-between ${row.you ? 'border-primary ring-1 ring-primary/20' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F3F1EC] font-extrabold text-ink">
                {row.rank}
              </span>
              <div>
                <p className="font-bold text-ink">{row.name}</p>
                <p className="text-xs text-steel">{row.city}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">{row.points.toLocaleString('en-IN')}</p>
              {row.you && <Badge tone="brand">You</Badge>}
            </div>
          </Card>
        ))}
      </div>
    </Page>
  )
}
