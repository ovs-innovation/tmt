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
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="h-12 w-12 rounded-full overflow-hidden border border-[#ece8e2]/80 bg-[#fafaf8] shrink-0">
                  <img
                    src={row.avatar}
                    alt={row.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Overlay Rank Badge - Bottom-Right Corner */}
                <span className={`absolute bottom-0 right-0 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[8.5px] font-black text-white shadow-sm ring-1.5 ring-white ${
                  row.rank === 1
                    ? 'bg-gradient-to-br from-[#FFE043] to-[#FFB800] shadow-[0_1.5px_4px_rgba(255,184,0,0.35)]'
                    : row.rank === 2
                      ? 'bg-gradient-to-br from-[#E2E8F0] to-[#94A3B8]'
                      : row.rank === 3
                        ? 'bg-gradient-to-br from-[#EDAE80] to-[#B45309]'
                        : 'bg-[#8a9099]'
                }`}>
                  {row.rank}
                </span>
              </div>
              <div>
                <p className="font-bold text-ink text-[14px]">{row.name}</p>
                <p className="text-[11px] text-steel">{row.city}</p>
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
