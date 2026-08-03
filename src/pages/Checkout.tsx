import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Card, Input, Page, PageHeader, StickyCta, Badge } from '../components/ui'
import { dealers, products } from '../data/mock'

export default function Checkout() {
  const [params] = useSearchParams()
  const product = products.find((p) => p.id === params.get('product')) ?? products[2]
  const qty = Number(params.get('qty') ?? 2.5)
  const amount = Math.round(product.price * qty)
  const [address, setAddress] = useState('Plot 14, Greater Noida West')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <Page stickyCta>
      <PageHeader title="Checkout" subtitle="Confirm delivery details" backTo="/app/catalogue" />

      <Card>
        <p className="font-bold text-ink">
          {product.name} · {product.dia}
        </p>
        <p className="mt-1 text-sm text-muted">{qty} ton</p>
        <p className="mt-3 text-2xl font-extrabold text-ink">₹{amount.toLocaleString('en-IN')}</p>
      </Card>

      <div className="mt-4 space-y-4">
        <Input label="Delivery address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <p className="font-bold text-ink">Assigned dealer</p>
            <Badge tone="success">Best match</Badge>
          </div>
          <p className="text-sm text-muted">{dealers[0].name}</p>
          <p className="text-xs text-steel">
            {dealers[0].area} · {dealers[0].distanceKm} km away
          </p>
        </Card>
        <Card>
          <p className="font-bold text-ink">Payment</p>
          <p className="mt-1 text-sm text-muted">Cash on delivery · Online pay demo stub</p>
        </Card>
      </div>

      <StickyCta>
        <Button
          className="w-full"
          disabled={loading}
          onClick={() => {
            setLoading(true)
            window.setTimeout(() => navigate('/app/success'), 900)
          }}
        >
          {loading ? 'Placing order…' : 'Place order'}
        </Button>
      </StickyCta>
    </Page>
  )
}
