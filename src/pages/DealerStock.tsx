import { useState } from 'react'
import { Badge, Button, Card, Page, PageHeader } from '../components/ui'
import { stockItems } from '../data/mock'
import { useApp } from '../context/AppContext'

export default function DealerStock() {
  const [stock, setStock] = useState(stockItems)
  const { showToast } = useApp()

  const tone = (s: string) =>
    s === 'Healthy' ? 'success' : s === 'Low' ? 'warning' : 'brand'

  return (
    <Page>
      <PageHeader title="Update stock" subtitle="Tap + / − to adjust demo stock" />
      <div className="space-y-3">
        {stock.map((item) => (
          <Card key={item.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-ink">{item.sku}</p>
                <p className="mt-1 text-sm text-muted">
                  {item.available} {item.unit}
                </p>
              </div>
              <Badge tone={tone(item.status) as 'success' | 'warning' | 'brand'}>
                {item.status}
              </Badge>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button
                variant="outline"
                className="!px-4"
                onClick={() =>
                  setStock((prev) =>
                    prev.map((s) =>
                      s.id === item.id
                        ? {
                            ...s,
                            available: Math.max(0, Number((s.available - 0.5).toFixed(1))),
                            status:
                              s.available - 0.5 <= 1.5
                                ? 'Critical'
                                : s.available - 0.5 <= 4
                                  ? 'Low'
                                  : 'Healthy',
                          }
                        : s,
                    ),
                  )
                }
              >
                −
              </Button>
              <Button
                variant="outline"
                className="!px-4"
                onClick={() =>
                  setStock((prev) =>
                    prev.map((s) =>
                      s.id === item.id
                        ? {
                            ...s,
                            available: Number((s.available + 0.5).toFixed(1)),
                            status:
                              s.available + 0.5 <= 1.5
                                ? 'Critical'
                                : s.available + 0.5 <= 4
                                  ? 'Low'
                                  : 'Healthy',
                          }
                        : s,
                    ),
                  )
                }
              >
                +
              </Button>
              <Button className="flex-1" onClick={() => showToast(`${item.sku} stock saved`)}>
                Save
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <p className="font-bold text-ink">Delivery status</p>
        <p className="mt-1 text-sm text-muted">Mark AS-24081 progress for the walkthrough.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {['Packed', 'Out for delivery', 'Delivered', 'Issue'].map((s) => (
            <Button key={s} variant="soft" onClick={() => showToast(`Marked ${s}`)}>
              {s}
            </Button>
          ))}
        </div>
      </Card>
    </Page>
  )
}
