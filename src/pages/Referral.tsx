import { Button, Card, Page, PageHeader } from '../components/ui'
import { referrals } from '../data/mock'
import { useApp } from '../context/AppContext'

export default function Referral() {
  const { showToast } = useApp()

  return (
    <Page>
      <PageHeader title="Referral code" subtitle="Invite builders & contractors" backTo="/app/rewards" />
      <Card className="bg-ink text-center text-white">
        <p className="text-sm text-white/55">Your code</p>
        <p className="mt-3 text-3xl font-extrabold tracking-[0.12em] text-accent">
          {referrals.code}
        </p>
        <p className="mt-2 text-xs text-white/40">{referrals.link}</p>
        <Button
          className="mt-5 w-full"
          onClick={() => {
            navigator.clipboard?.writeText(referrals.code)
            showToast('Referral code copied')
          }}
        >
          Copy code
        </Button>
      </Card>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          ['Invited', referrals.invited],
          ['Joined', referrals.joined],
          ['Rewarded', referrals.rewarded],
        ].map(([label, value]) => (
          <Card key={label as string} className="text-center">
            <p className="text-2xl font-extrabold text-ink">{value}</p>
            <p className="mt-1 text-xs text-muted">{label}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <p className="text-sm text-muted">Referral earnings</p>
        <p className="mt-1 text-2xl font-extrabold text-ink">
          ₹{referrals.earnings.toLocaleString('en-IN')}
        </p>
      </Card>
    </Page>
  )
}
