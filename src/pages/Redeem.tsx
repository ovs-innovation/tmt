import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Page, PageHeader, StickyCta } from '../components/ui'
import { rewards } from '../data/mock'
import { useApp } from '../context/AppContext'

export default function Redeem() {
  const [selected, setSelected] = useState(rewards.redeemOptions[0].id)
  const { showToast } = useApp()
  const navigate = useNavigate()
  const option = rewards.redeemOptions.find((o) => o.id === selected)!

  return (
    <Page stickyCta>
      <PageHeader title="Redeem rewards" subtitle={`Balance ${rewards.balance} pts`} backTo="/app/rewards" />
      <div className="space-y-3">
        {rewards.redeemOptions.map((o) => (
          <button key={o.id} className="w-full text-left" onClick={() => setSelected(o.id)}>
            <Card className={selected === o.id ? 'border-primary ring-2 ring-primary/15' : ''}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-ink">{o.title}</p>
                  <p className="mt-1 text-sm text-muted">{o.points} points</p>
                </div>
                {o.tag && <Badge tone="gold">{o.tag}</Badge>}
              </div>
            </Card>
          </button>
        ))}
      </div>
      <StickyCta>
        <Button
          className="w-full"
          onClick={() => {
            if (option.points > rewards.balance) {
              showToast('Not enough points')
              return
            }
            showToast(`${option.title} redeemed`)
            navigate('/app/rewards')
          }}
        >
          Redeem {option.title}
        </Button>
      </StickyCta>
    </Page>
  )
}
