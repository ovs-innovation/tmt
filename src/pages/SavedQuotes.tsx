import { Link } from 'react-router-dom'
import { Badge, Button, Card, Page, PageHeader } from '../components/ui'
import { savedQuotes } from '../data/mock'

export default function SavedQuotes() {
  return (
    <Page>
      <PageHeader title="Saved quotations" backTo="/app/profile" />
      <div className="space-y-3">
        {savedQuotes.map((q) => (
          <Card key={q.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-ink">{q.id}</p>
                <p className="mt-1 text-sm text-muted">
                  {q.product} · {q.qty}
                </p>
                <p className="mt-2 text-xl font-extrabold text-ink">
                  ₹{q.amount.toLocaleString('en-IN')}
                </p>
                <p className="mt-1 text-xs text-steel">Valid till {q.validTill}</p>
              </div>
              <Badge tone={q.status === 'Valid' ? 'success' : 'neutral'}>{q.status}</Badge>
            </div>
            {q.status === 'Valid' && (
              <Link to="/app/checkout?product=tmt-12&qty=2.5" className="mt-4 block">
                <Button className="w-full">Order from quote</Button>
              </Link>
            )}
          </Card>
        ))}
      </div>
    </Page>
  )
}
