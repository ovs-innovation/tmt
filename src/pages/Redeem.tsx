import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gift } from 'lucide-react'
import { Badge, Button, Card, Page, PageHeader, StickyCta } from '../components/ui'
import { useApp } from '../context/AppContext'
import { CATALOGUE_ITEMS, useRewards } from '../context/RewardsContext'

export default function Redeem() {
  const { showToast } = useApp()
  const { dealer, redeemGift } = useRewards()
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(CATALOGUE_ITEMS[2].id) // Default to Impact Drill Machine

  const selectedItem =
    CATALOGUE_ITEMS.find((o) => o.id === selectedId) || CATALOGUE_ITEMS[0]
  const canAfford = dealer.availablePoints >= selectedItem.points

  const handleRedeem = () => {
    const res = redeemGift(selectedItem)
    if (!res.success) {
      showToast(res.message)
      return
    }
    showToast(`✓ ${selectedItem.title} (${selectedItem.subtitle}) claimed!`)
    setTimeout(() => {
      navigate('/app/rewards')
    }, 1200)
  }

  return (
    <Page stickyCta>
      <PageHeader
        title="Redemption Catalogue"
        subtitle={`Available: ${dealer.availablePoints.toLocaleString('en-IN')} Pts · ${dealer.tier}`}
        backTo="/app/rewards"
      />

      <div className="mb-4 rounded-xl border border-line bg-white p-3 text-xs text-muted">
        <p className="font-extrabold text-ink uppercase tracking-wider text-[10px]">
          HQ Merchandise Fulfillment
        </p>
        <p className="mt-0.5">
          Corporate logistics will dispatch the claimed incentive directly to{' '}
          <strong className="text-ink">{dealer.dealerName}</strong> godown within 3 business days.
        </p>
      </div>

      <div className="space-y-3">
        {CATALOGUE_ITEMS.map((item) => {
          const isSelected = selectedId === item.id
          const affordable = dealer.availablePoints >= item.points

          return (
            <button
              key={item.id}
              className="w-full text-left"
              onClick={() => setSelectedId(item.id)}
            >
              <Card
                className={`transition ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/2'
                    : 'hover:border-line'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl p-1">{item.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-ink text-sm sm:text-base">
                          {item.title}
                        </p>
                        {item.tag && <Badge tone="gold">{item.tag}</Badge>}
                      </div>
                      <p className="text-xs font-bold text-primary">{item.subtitle}</p>
                      <p className="mt-1 text-xs text-muted leading-relaxed">
                        {item.specs}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm sm:text-base font-black text-ink">
                      {item.points.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] text-muted">Pts</span>
                    </p>
                    <span
                      className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        affordable
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-muted'
                      }`}
                    >
                      {affordable ? 'Available' : 'Need more pts'}
                    </span>
                  </div>
                </div>
              </Card>
            </button>
          )
        })}
      </div>

      <StickyCta>
        <Button
          className="w-full"
          disabled={!canAfford}
          onClick={handleRedeem}
        >
          <Gift size={16} />
          {canAfford
            ? `Claim ${selectedItem.subtitle} (${selectedItem.points.toLocaleString('en-IN')} Pts)`
            : `Insufficient Points (Need ${(selectedItem.points - dealer.availablePoints).toLocaleString('en-IN')} more)`}
        </Button>
      </StickyCta>
    </Page>
  )
}
