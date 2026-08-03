import { useNavigate } from 'react-router-dom'
import { Button, BrandMark } from '../components/ui'
import { PhoneShell } from '../components/PhoneShell'
import { images } from '../data/images'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <PhoneShell>
      <div className="flex h-full flex-col bg-bg">
        <div className="px-5 pt-14">
          <BrandMark size="md" />
        </div>

        <div className="relative mx-5 mt-6 h-[220px] overflow-hidden rounded-[18px]">
          <img src={images.rebar} alt="Amba Shakti TMT" className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-1 flex-col px-5 pt-6 pb-8">
          <h1 className="text-[26px] leading-[1.2] font-extrabold tracking-tight text-ink">
            Strength You Can Trust,
            <br />
            Quality You Can Build On.
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            Order genuine TMT, get instant quotes, find authorized dealers, and verify deliveries with
            QR authenticity.
          </p>

          <div className="mt-auto space-y-3 pt-8">
            <Button className="w-full" onClick={() => navigate('/login')}>
              Get Started
            </Button>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2 text-sm font-bold text-muted"
            >
              I already have an account
            </button>
          </div>
        </div>
      </div>
    </PhoneShell>
  )
}
