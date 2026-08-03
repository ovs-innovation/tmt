import { Card, Page, PageHeader, Badge } from '../components/ui'
import { livePrice } from '../data/mock'

export default function PriceDetail() {
  return (
    <Page>
      <PageHeader title="Live steel price" subtitle={livePrice.region} backTo="/app/home" />
      <Card className="brand-gradient border-0 text-white">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/75">As of {livePrice.asOf}</p>
          <Badge tone="live">LIVE</Badge>
        </div>
        <p className="mt-3 text-4xl font-extrabold">
          ₹{livePrice.pricePerTon.toLocaleString('en-IN')}
          <span className="ml-1 text-base font-semibold text-white/75">/ton</span>
        </p>
        <p className="mt-2 text-sm text-white/90">↑ {livePrice.change}% today</p>
      </Card>
      <Card className="mt-4 space-y-3">
        {livePrice.breakup.map((b) => (
          <div key={b.label} className="flex justify-between text-sm">
            <span className="text-muted">{b.label}</span>
            <span className="font-bold text-ink">₹{b.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </Card>
    </Page>
  )
}
