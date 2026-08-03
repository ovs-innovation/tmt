import { Badge, Card, Page, PageHeader } from '../components/ui'
import { notifications } from '../data/mock'

export default function Notifications() {
  return (
    <Page>
      <PageHeader title="Smart notifications" subtitle="Orders, rewards & quotes" backTo="/app/home" />
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card key={n.id} className={n.unread ? 'border-primary/30' : ''}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-ink">{n.title}</p>
                <p className="mt-1 text-sm text-muted">{n.body}</p>
                <p className="mt-2 text-xs text-steel">{n.time}</p>
              </div>
              {n.unread && <Badge tone="brand">New</Badge>}
            </div>
          </Card>
        ))}
      </div>
    </Page>
  )
}
