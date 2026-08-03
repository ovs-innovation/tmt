import { useMemo, useState } from 'react'
import { Card, Input, Page, PageHeader } from '../components/ui'

export default function Calculator() {
  const [length, setLength] = useState('20')
  const [breadth, setBreadth] = useState('30')
  const [floors, setFloors] = useState('2')
  const [dia, setDia] = useState('12')

  const estimate = useMemo(() => {
    const area = (Number(length) || 0) * (Number(breadth) || 0) * (Number(floors) || 1)
    const tons = Number((area * 0.0045 * (Number(dia) / 12)).toFixed(2))
    const cost = Math.round(tons * 58420)
    return { area, tons, cost }
  }, [length, breadth, floors, dia])

  return (
    <Page>
      <PageHeader
        title="Construction calculator"
        subtitle="Rough steel estimate for demo"
        backTo="/app/home"
      />
      <div className="space-y-3">
        <Input label="Length (ft)" value={length} onChange={(e) => setLength(e.target.value)} />
        <Input label="Breadth (ft)" value={breadth} onChange={(e) => setBreadth(e.target.value)} />
        <Input label="Floors" value={floors} onChange={(e) => setFloors(e.target.value)} />
        <Input label="Primary dia (mm)" value={dia} onChange={(e) => setDia(e.target.value)} />
      </div>
      <Card className="mt-5 bg-ink text-white">
        <p className="text-sm text-white/55">Estimated requirement</p>
        <p className="mt-2 text-4xl font-extrabold">{estimate.tons} ton</p>
        <p className="mt-2 text-sm text-white/55">
          Built-up ~{estimate.area.toLocaleString('en-IN')} sq.ft
        </p>
        <p className="mt-4 text-2xl font-extrabold text-accent">
          ≈ ₹{estimate.cost.toLocaleString('en-IN')}
        </p>
        <p className="mt-2 text-xs text-white/40">
          Indicative only — final quote depends on site BOQ & dealer assignment.
        </p>
      </Card>
    </Page>
  )
}
