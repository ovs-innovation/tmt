import { Badge, Button, Page, PageHeader } from '../components/ui'
import { dealers } from '../data/mock'
import { dealerImage } from '../data/images'
import { useApp } from '../context/AppContext'
import { useState } from 'react'
import { MapPin, Navigation, Phone, Search, Star } from 'lucide-react'

export default function Dealers() {
  const { showToast } = useApp()
  const [q, setQ] = useState('')
  const filtered = dealers.filter(
    (d) =>
      d.name.toLowerCase().includes(q.toLowerCase()) ||
      d.area.toLowerCase().includes(q.toLowerCase()) ||
      d.city.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <Page>
      <PageHeader
        title="Authorized dealers"
        subtitle="Amba Shakti stockists near your site"
        backTo="/app/home"
      />

      <div className="relative mb-3">
        <Search size={16} className="absolute top-3.5 left-3.5 text-steel" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Okhla, Ghaziabad, Faridabad…"
          className="h-11 w-full rounded-xl border border-line bg-white pr-4 pl-10 text-[15px] outline-none focus:border-primary/40"
        />
      </div>

      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-muted">
        <MapPin size={13} className="text-primary" />
        Sorted by distance from Greater Noida West · {filtered.length} dealers
      </div>

      <div className="space-y-3">
        {filtered.map((d) => (
          <div key={d.id} className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="relative h-[120px]">
              <img src={dealerImage(d.id)} alt={d.name} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-3">
                <div>
                  <p className="text-[15px] font-extrabold text-white">{d.name}</p>
                  <p className="text-[11px] text-white/80">
                    {d.area}, {d.city}
                  </p>
                </div>
                <Badge tone={d.open ? 'success' : 'neutral'} className="!bg-white">
                  {d.open ? 'Open' : 'Closed'}
                </Badge>
              </div>
            </div>
            <div className="p-3">
              <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold">
                <span className="inline-flex items-center gap-1 text-[#C48A00]">
                  <Star size={11} fill="currentColor" /> {d.rating}
                </span>
                <span className="text-steel">{d.distanceKm} km</span>
                <span className="rounded-full bg-[#FDECEC] px-2 py-0.5 text-primary">{d.stock}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="!h-10 !px-2 text-xs"
                  onClick={() => showToast(`Calling ${d.name}`)}
                >
                  <Phone size={14} /> Call
                </Button>
                <Button
                  variant="soft"
                  className="!h-10 !px-2 text-xs"
                  onClick={() => showToast('WhatsApp opened')}
                >
                  Chat
                </Button>
                <Button className="!h-10 !px-2 text-xs" onClick={() => showToast('Navigation started')}>
                  <Navigation size={14} /> Go
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}
