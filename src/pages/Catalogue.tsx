import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { Badge, Page, PageHeader } from '../components/ui'
import { products } from '../data/mock'
import { productImage } from '../data/images'
import { useApp } from '../context/AppContext'

const filters = ['All', '8–10 mm', '12–16 mm', 'Flexion', 'MS sections']

export default function Catalogue() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All')
  const { showToast } = useApp()

  const list = useMemo(() => {
    return products.filter((p) => {
      const matchQ =
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.dia.toLowerCase().includes(q.toLowerCase()) ||
        p.grade.toLowerCase().includes(q.toLowerCase())
      const matchF =
        filter === 'All' ||
        (filter === '8–10 mm' && (p.id === 'tmt-8' || p.id === 'tmt-10')) ||
        (filter === '12–16 mm' && (p.id === 'tmt-12' || p.id === 'tmt-16')) ||
        (filter === 'Flexion' && p.name.includes('Flexion')) ||
        (filter === 'MS sections' && (p.id.includes('angle') || p.id.includes('channel')))
      return matchQ && matchF
    })
  }, [q, filter])

  return (
    <Page>
      <PageHeader title="Buy TMT" subtitle={`${list.length} products · Delhi NCR rates`} backTo="/app/home" />

      <div className="relative mb-3">
        <Search size={16} className="absolute top-3.5 left-3.5 text-steel" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="8 mm, Fe 550D, angle…"
          className="h-11 w-full rounded-xl border border-line bg-white pr-4 pl-10 text-[15px] outline-none focus:border-primary/40"
        />
      </div>

      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`h-8 shrink-0 rounded-full px-3.5 text-xs font-bold ${
              filter === f ? 'bg-primary text-white' : 'border border-line bg-white text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {list.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-line bg-white">
            <Link to={`/app/product/${p.id}`} className="relative block aspect-square bg-[#111]">
              <img src={productImage(p.id)} alt="" className="h-full w-full object-cover" />
              {p.badge && (
                <span className="absolute top-2 left-2 rounded bg-primary px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                  {p.badge}
                </span>
              )}
            </Link>
            <div className="p-2.5">
              <p className="text-[10px] font-bold text-secondary">{p.grade}</p>
              <Link to={`/app/product/${p.id}`}>
                <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                  {p.id.startsWith('tmt') ? `${p.dia} TMT` : `${p.name} ${p.dia}`}
                </p>
              </Link>
              <div className="mt-2 flex items-center justify-between gap-1">
                <p className="text-[13px] font-extrabold text-ink">
                  ₹{p.price.toLocaleString('en-IN')}
                  <span className="text-[9px] font-medium text-muted">/t</span>
                </p>
                <button
                  onClick={() => showToast(`${p.dia} added to quote`)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
                >
                  <Plus size={15} strokeWidth={2.6} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!list.length && (
        <div className="mt-10 text-center">
          <Badge tone="neutral">No match — try another size</Badge>
        </div>
      )}
    </Page>
  )
}
