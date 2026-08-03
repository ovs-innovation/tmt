import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Card, Input, Page, PageHeader, StickyCta } from '../components/ui'
import { products } from '../data/mock'
import { productImage } from '../data/images'

export default function Quote() {
  const [params] = useSearchParams()
  const initial = params.get('product') ?? 'tmt-12'
  const [productId, setProductId] = useState(initial)
  const [qty, setQty] = useState(params.get('qty') ?? '2.5')
  const [city, setCity] = useState('Patna')
  const [date, setDate] = useState('05 Aug 2026')
  const [done, setDone] = useState(Boolean(params.get('qty')))
  const navigate = useNavigate()

  const product = products.find((p) => p.id === productId) ?? products[0]
  const pricePerTon = product.price
  const subTotal = useMemo(() => Math.round(pricePerTon * (Number(qty) || 0)), [pricePerTon, qty])
  const gst = Math.round(subTotal * 0.18)
  const delivery = 1450
  const total = subTotal + gst + delivery

  if (!done) {
    return (
      <Page stickyCta>
        <PageHeader title="Get Quote" subtitle="Instant regional estimate" backTo="/app/home" />

        <div className="mb-4 overflow-hidden rounded-[20px] border border-line bg-white shadow-sm">
          <div className="flex items-center gap-3 p-3">
            <img
              src={productImage(product.id)}
              alt=""
              className="h-16 w-16 rounded-2xl object-cover"
            />
            <div>
              <p className="text-sm font-extrabold text-ink">{product.name}</p>
              <p className="text-xs text-muted">
                {product.dia} · {product.grade}
              </p>
              <p className="mt-1 text-sm font-extrabold text-primary">
                ₹{product.price.toLocaleString('en-IN')}/t
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink/70">Product</span>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] outline-none"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.grade} · {p.dia}
                </option>
              ))}
            </select>
          </label>
          <Input label="Quantity (Ton)" value={qty} onChange={(e) => setQty(e.target.value)} />
          <Input label="Delivery location" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <StickyCta>
          <Button className="w-full" onClick={() => setDone(true)}>
            Generate Quotation
          </Button>
        </StickyCta>
      </Page>
    )
  }

  return (
    <Page stickyCta>
      <PageHeader title="Quote Summary" subtitle="Valid for 6 hours" backTo="/app/catalogue" />

      <div className="mb-4 overflow-hidden rounded-[20px]">
        <div className="relative h-28">
          <img src={productImage(product.id)} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-3 left-3 text-white">
            <p className="text-sm font-extrabold">
              {product.name} · {product.dia}
            </p>
            <p className="text-xs text-white/70">
              {qty} ton · {city}
            </p>
          </div>
        </div>
      </div>

      <Card className="space-y-3.5">
        {[
          ['Product', `${product.name} · ${product.dia}`],
          ['Quantity', `${qty} Ton`],
          ['Price / Ton', `₹${pricePerTon.toLocaleString('en-IN')}`],
          ['Sub Total', `₹${subTotal.toLocaleString('en-IN')}`],
          ['GST (18%)', `₹${gst.toLocaleString('en-IN')}`],
          ['Delivery Charges', `₹${delivery.toLocaleString('en-IN')}`],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0"
          >
            <span className="text-sm text-muted">{k}</span>
            <span className="text-sm font-bold text-ink">{v}</span>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-2xl bg-[#F7F5F1] px-4 py-3">
          <span className="font-extrabold text-ink">Total Amount</span>
          <span className="text-xl font-extrabold text-primary">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
      </Card>

      <Card className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Delivery Location</span>
          <span className="font-bold text-ink">{city}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Preferred Date</span>
          <span className="font-bold text-ink">{date}</span>
        </div>
        <Input label="Update location" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input label="Update date" value={date} onChange={(e) => setDate(e.target.value)} />
      </Card>

      <StickyCta>
        <Button
          className="w-full"
          onClick={() => navigate(`/app/checkout?product=${product.id}&qty=${qty}`)}
        >
          Confirm Request
        </Button>
      </StickyCta>
    </Page>
  )
}
