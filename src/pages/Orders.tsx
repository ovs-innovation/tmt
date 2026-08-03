import { Link } from 'react-router-dom'
import { Badge, Card, EmptyState, Page, PageHeader, Button } from '../components/ui'
import { orders } from '../data/mock'
import { productImage } from '../data/images'
import { ChevronRight, Truck } from 'lucide-react'

export default function Orders() {
  if (!orders.length) {
    return (
      <Page>
        <PageHeader title="Orders" />
        <EmptyState
          title="No orders yet"
          subtitle="Get a quote and place your first Amba Shakti order."
          action={
            <Link to="/app/quote">
              <Button>Get quote</Button>
            </Link>
          }
        />
      </Page>
    )
  }

  return (
    <Page className="!pt-3">
      <PageHeader title="Orders" subtitle="Active & history" />
      <div className="space-y-3">
        {orders.map((o) => (
          <Link key={o.id} to={`/app/orders/${o.id}`}>
            <Card className="!overflow-hidden !p-0">
              <div className="flex">
                <div className="h-[100px] w-[84px] shrink-0 bg-[#151515]">
                  <img
                    src={productImage(o.product.includes('12') ? 'tmt-12' : 'tmt-10')}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-extrabold text-ink">{o.id}</p>
                      <p className="mt-0.5 truncate text-sm text-muted">{o.product}</p>
                    </div>
                    <Badge tone={o.status === 'Delivered' ? 'success' : 'warning'}>{o.status}</Badge>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-steel">
                    {o.qty} · ₹{o.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-primary">
                    <Truck size={12} />
                    {o.eta}
                    <ChevronRight size={12} className="ml-auto text-steel" />
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Page>
  )
}
