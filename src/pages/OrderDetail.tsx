import { useParams, Link } from 'react-router-dom'
import { Check, Truck } from 'lucide-react'
import { Badge, Button, Card, Page, PageHeader } from '../components/ui'
import { orders } from '../data/mock'

export default function OrderDetail() {
  const { id } = useParams()
  const order = orders.find((o) => o.id === id) ?? orders[0]
  const currentIdx = order.timeline.findIndex((s) => !s.done)

  return (
    <Page>
      <PageHeader title="Track Order" subtitle={order.id} backTo="/app/orders" />

      <Card className="brand-gradient border-0 text-white">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/80">Current status</p>
          <Badge tone="live">{order.status}</Badge>
        </div>
        <p className="mt-3 text-2xl font-extrabold">{order.eta}</p>
        <p className="mt-1 text-sm text-white/80">{order.dealer}</p>
      </Card>

      <Card className="mt-4">
        <p className="mb-5 font-extrabold text-ink">Live delivery timeline</p>
        <div className="space-y-0">
          {order.timeline.map((step, idx) => {
            const isCurrent = idx === (currentIdx === -1 ? order.timeline.length - 1 : currentIdx - 1) ||
              (!step.done && idx === currentIdx)
            const active = step.done || isCurrent
            return (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      step.done
                        ? 'bg-success text-white'
                        : isCurrent
                          ? 'bg-primary text-white'
                          : 'bg-line text-steel'
                    }`}
                  >
                    {step.done ? (
                      <Check size={14} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Truck size={14} />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                  {idx < order.timeline.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 min-h-10 ${step.done ? 'bg-success/40' : 'bg-line'}`}
                    />
                  )}
                </div>
                <div className="pb-6">
                  <p className={`text-sm font-extrabold ${active ? 'text-ink' : 'text-steel'}`}>
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-xs text-steel">{step.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Product</span>
          <span className="max-w-[60%] text-right font-bold text-ink">{order.product}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Quantity</span>
          <span className="font-bold text-ink">{order.qty}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Amount</span>
          <span className="font-bold text-ink">₹{order.amount.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Address</span>
          <span className="max-w-[60%] text-right font-bold text-ink">{order.address}</span>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/app/scan">
          <Button variant="outline" className="w-full">
            Scan QR
          </Button>
        </Link>
        <Button className="w-full" onClick={() => window.alert('Calling dealer…')}>
          Call dealer
        </Button>
      </div>
    </Page>
  )
}
