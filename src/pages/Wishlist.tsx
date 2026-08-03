import { Link } from 'react-router-dom'
import { Badge, Button, Card, EmptyState, Page, PageHeader } from '../components/ui'
import { products, wishlist as seed } from '../data/mock'
import { useApp } from '../context/AppContext'

export default function Wishlist() {
  const { wishlistIds, toggleWishlist } = useApp()
  const items = products.filter((p) => wishlistIds.includes(p.id))

  return (
    <Page>
      <PageHeader title="Wishlist" subtitle={`${items.length} saved`} backTo="/app/profile" />
      {!items.length ? (
        <EmptyState
          title="Wishlist is empty"
          subtitle="Save TMT sizes you need for upcoming pours."
          action={
            <Link to="/app/catalogue">
              <Button>Browse catalogue</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {items.map((p) => {
            const note = seed.find((w) => w.productId === p.id)?.note
            return (
              <Card key={p.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-ink">
                      {p.name} · {p.dia}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      ₹{p.price.toLocaleString('en-IN')} / ton
                    </p>
                    {note && (
                      <div className="mt-2">
                        <Badge tone="neutral">{note}</Badge>
                      </div>
                    )}
                  </div>
                  <button
                    className="text-sm font-bold text-primary"
                    onClick={() => toggleWishlist(p.id)}
                  >
                    Remove
                  </button>
                </div>
                <Link
                  to={`/app/product/${p.id}`}
                  className="mt-3 inline-flex text-sm font-bold text-primary"
                >
                  View product →
                </Link>
              </Card>
            )
          })}
        </div>
      )}
    </Page>
  )
}
