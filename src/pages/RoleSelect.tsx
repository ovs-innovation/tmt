import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PhoneShell } from '../components/PhoneShell'
import { BrandMark, Button } from '../components/ui'
import { useApp } from '../context/AppContext'
import { roleImage } from '../data/images'
import type { Role } from '../data/mock'

const roles: {
  id: Role
  title: string
  desc: string
}[] = [
  {
    id: 'customer',
    title: 'Customer',
    desc: 'Buy TMT & track delivery',
  },
  {
    id: 'contractor',
    title: 'Contractor',
    desc: 'Earn rewards on sales',
  },
  {
    id: 'dealer',
    title: 'Dealer',
    desc: 'Orders & stock desk',
  },
  {
    id: 'admin',
    title: 'Admin',
    desc: 'Platform analytics',
  },
]

export default function RoleSelect() {
  const { setRole } = useApp()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Role>('customer')
  const activeRole = roles.find((r) => r.id === selected)!

  const continueAs = () => {
    setRole(selected)
    navigate(selected === 'admin' ? '/admin' : '/app/home')
  }

  return (
    <PhoneShell>
      <div className="flex h-full flex-col bg-bg">
        <div className="app-scroll flex-1 overflow-y-auto px-5 pt-14 pb-4">
          <BrandMark size="sm" className="mb-8" />

          <h1 className="text-center text-[26px] font-extrabold tracking-tight text-ink">
            Choose Your Role
          </h1>
          <p className="mx-auto mt-2 max-w-[280px] text-center text-[14px] leading-relaxed text-muted">
            Select the option that best describes you.
          </p>

          <div className="mx-auto mt-10 grid max-w-[320px] grid-cols-2 gap-x-5 gap-y-8">
            {roles.map((role) => {
              const active = selected === role.id
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelected(role.id)}
                  className="flex flex-col items-center text-center transition active:scale-95"
                >
                  <span className="relative">
                    <span
                      className={`block h-[96px] w-[96px] overflow-hidden rounded-full bg-[#111] shadow-md transition ${
                        active
                          ? 'ring-[3px] ring-primary ring-offset-[3px] ring-offset-bg'
                          : 'ring-1 ring-black/5'
                      }`}
                    >
                      <img
                        src={roleImage(role.id)}
                        alt={role.title}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-t from-black/35 to-transparent" />
                    </span>
                    {active && (
                      <span className="absolute -right-0.5 -bottom-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md ring-2 ring-bg">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    )}
                  </span>
                  <p
                    className={`mt-3.5 text-[15px] font-extrabold ${
                      active ? 'text-primary' : 'text-ink'
                    }`}
                  >
                    {role.title}
                  </p>
                  <p className="mt-1 max-w-[130px] text-[11px] leading-snug text-muted">
                    {role.desc}
                  </p>
                </button>
              )
            })}
          </div>

          <div className="mx-auto mt-10 flex max-w-[320px] items-center gap-3 rounded-2xl border border-line bg-white p-3">
            <img
              src={roleImage(activeRole.id)}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="min-w-0 text-left">
              <p className="text-[11px] font-bold tracking-wide text-secondary uppercase">
                Selected
              </p>
              <p className="text-[15px] font-extrabold text-ink">{activeRole.title}</p>
              <p className="text-[12px] text-muted">{activeRole.desc}</p>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-line bg-white px-5 pt-3 pb-8">
          <Button className="w-full" onClick={continueAs}>
            Continue as {activeRole.title}
          </Button>
        </div>
      </div>
    </PhoneShell>
  )
}
