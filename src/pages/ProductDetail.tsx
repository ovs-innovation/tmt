import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus, ShieldCheck, Droplets, BadgeCheck, Leaf } from 'lucide-react'
import { Badge, Button, Page, PageHeader, StickyCta } from '../components/ui'
import { products } from '../data/mock'
import { productImage } from '../data/images'

const sizes = ['8', '10', '12', '16', '20', '25', '32']
const certs = [
  { label: 'Earthquake Resistant', icon: ShieldCheck },
  { label: 'Corrosion Resistant', icon: Droplets },
  { label: 'ISI Certified', icon: BadgeCheck },
  { label: 'GreenPro', icon: Leaf },
]

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id) ?? products[2]
  const [size, setSize] = useState(product.dia.replace(' mm', '').replace('mm', ''))
  const [qty, setQty] = useState(2.5)
  const [unit, setUnit] = useState<'Ton' | 'Kg'>('Ton')

  return (
    <Page stickyCta>
      <PageHeader
        title={`${product.grade} TMT`}
        subtitle={product.name}
        backTo="/app/catalogue"
      />

      <div className="relative mb-4 overflow-hidden rounded-[20px] bg-[#111]">
        <img
          src={productImage(product.id)}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-3xl font-extrabold">{size} mm</p>
          <p className="text-sm text-white/80">{product.grade} · {product.name}</p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {certs.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.label}
              className="flex items-center gap-2 rounded-[14px] border border-line bg-white px-3 py-2.5"
            >
              <Icon size={15} className="shrink-0 text-primary" />
              <span className="text-[11px] font-bold text-ink">{c.label}</span>
            </div>
          )
        })}
      </div>

      <p className="mb-5 text-[14px] leading-relaxed text-muted">{product.desc}</p>

      <p className="mb-2.5 text-sm font-extrabold text-ink">Choose Size</p>
      <div className="mb-5 flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`h-11 min-w-11 rounded-[12px] px-3 text-sm font-extrabold transition ${
              size === s
                ? 'brand-gradient text-white'
                : 'border border-line bg-white text-ink'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-extrabold text-ink">Quantity</p>
        <div className="flex rounded-full border border-line bg-white p-0.5">
          {(['Ton', 'Kg'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                unit === u ? 'bg-ink text-white' : 'text-muted'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-line bg-white"
          onClick={() => setQty((q) => Math.max(0.5, Number((q - 0.5).toFixed(1))))}
        >
          <Minus size={16} />
        </button>
        <p className="min-w-12 text-center text-xl font-extrabold text-ink">{qty}</p>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-line bg-white"
          onClick={() => setQty((q) => Number((q + 0.5).toFixed(1)))}
        >
          <Plus size={16} />
        </button>
        <Badge tone="neutral">{unit}</Badge>
      </div>

      <StickyCta>
        <Link to={`/app/quote?product=${product.id}&qty=${qty}&size=${size}`}>
          <Button className="w-full">GET QUOTATION</Button>
        </Link>
      </StickyCta>
    </Page>
  )
}
