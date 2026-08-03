import { Button, Card, Input, Page, PageHeader } from '../components/ui'
import { useApp } from '../context/AppContext'
import { useState } from 'react'

export default function Support() {
  const [msg, setMsg] = useState('')
  const { showToast } = useApp()

  return (
    <Page>
      <PageHeader title="Support" subtitle="We usually reply within 2 hours" backTo="/app/profile" />
      <Card className="space-y-3">
        {['Order issue', 'QR / authenticity', 'Reward not credited', 'Dealer complaint'].map((t) => (
          <button
            key={t}
            className="w-full rounded-2xl bg-[#F3F1EC] px-4 py-3 text-left text-sm font-bold text-ink"
            onClick={() => setMsg(t)}
          >
            {t}
          </button>
        ))}
      </Card>
      <div className="mt-4 space-y-3">
        <Input
          label="Describe your issue"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type here…"
        />
        <Button
          className="w-full"
          onClick={() => {
            showToast('Ticket submitted')
            setMsg('')
          }}
        >
          Submit ticket
        </Button>
      </div>
    </Page>
  )
}
