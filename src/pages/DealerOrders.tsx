import { useState } from 'react'
import { Badge, Button, Card, Page, PageHeader } from '../components/ui'
import { pendingDealerOrders } from '../data/mock'
import { useApp } from '../context/AppContext'

export default function DealerOrders() {
  const [list, setList] = useState(pendingDealerOrders)
  const { showToast } = useApp()

  return (
    <Page>
      <PageHeader title="Pending orders" subtitle="Accept within SLA" />
      <div className="space-y-3">
        {list.map((o) => (
          <Card key={o.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-ink">{o.id}</p>
                <p className="mt-1 text-sm text-muted">{o.customer}</p>
                <p className="mt-1 text-sm text-ink/80">
                  {o.product} · {o.qty}
                </p>
                <p className="mt-2 text-xs text-steel">
                  {o.area} · {o.distanceKm} km
                </p>
              </div>
              <Badge tone="warning">{o.slaMins}m SLA</Badge>
            </div>
            <p className="mt-3 text-xl font-extrabold text-ink">
              ₹{o.amount.toLocaleString('en-IN')}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setList((prev) => prev.filter((x) => x.id !== o.id))
                  showToast(`Rejected ${o.id}`)
                }}
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  setList((prev) => prev.filter((x) => x.id !== o.id))
                  showToast(`Accepted ${o.id}`)
                }}
              >
                Accept
              </Button>
            </div>
          </Card>
        ))}
        {!list.length && (
          <Card className="py-10 text-center text-sm text-muted">Inbox clear — nice work.</Card>
        )}
      </div>
    </Page>
  )
}
