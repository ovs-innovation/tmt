import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { PhoneShell } from '../components/PhoneShell'
import { Button } from '../components/ui'
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
      <div className="flex h-full flex-col bg-[#fafaf8] overflow-hidden justify-between py-4">
        {/* Top Header & Logo */}
        <div className="flex flex-col items-center pt-2">
          <img
            src="/logo-transparent.png"
            alt="Amba Shakti Logo"
            className="h-[68px] w-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Header Text */}
        <div className="text-center px-5">
          <h1 className="text-[22px] font-black leading-tight text-[#1e242b] tracking-tight">
            Choose Your Role
          </h1>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#6b7280]">
            Select the option that best describes you to continue
          </p>
        </div>

        {/* Roles Grid - Circular Selection Buttons */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-3 px-6 justify-items-center">
          {roles.map((role) => {
            const active = selected === role.id
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelected(role.id)}
                className="flex flex-col items-center text-center transition active:scale-95 cursor-pointer"
              >
                <div className="relative">
                  {/* Circular Avatar */}
                  <div
                    className={`block h-[96px] w-[96px] overflow-hidden rounded-full bg-[#111] shadow-md transition-all ${
                      active
                        ? 'ring-[3px] ring-[#d71920] ring-offset-[3px] ring-offset-[#fafaf8]'
                        : 'ring-1 ring-black/5'
                    }`}
                  >
                    <img
                      src={roleImage(role.id)}
                      alt={role.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/25 to-transparent" />
                  </div>
                  
                  {/* Active Check Indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeRoleCheck"
                      className="absolute -right-0.5 -bottom-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#d71920] text-white shadow-md ring-2 ring-[#fafaf8] z-10"
                    >
                      <Check size={12} strokeWidth={3} />
                    </motion.div>
                  )}
                </div>

                {/* Typography below Circle */}
                <p
                  className={`mt-2.5 text-[14px] font-black transition-colors ${
                    active ? 'text-[#d71920]' : 'text-[#303841]'
                  }`}
                >
                  {role.title}
                </p>
                <p className="mt-0.5 max-w-[120px] text-[10px] leading-snug text-[#6b7280]">
                  {role.desc}
                </p>
              </button>
            )
          })}
        </div>

        {/* Selected Role Summary Footer Card */}
        <div className="mx-4 mt-3 flex items-center gap-3.5 rounded-[20px] border border-[#ece8e2]/80 bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-[#ece8e2] shrink-0">
            <img
              src={roleImage(activeRole.id)}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 text-left">
            <span className="inline-block text-[8px] font-bold tracking-wider text-[#d71920] uppercase bg-[#FDECEC] px-2 py-0.5 rounded-full mb-0.5">
              Active Selection
            </span>
            <h3 className="text-[13px] font-black text-[#1e242b] leading-tight">{activeRole.title}</h3>
            <p className="text-[10.5px] text-[#6b7280] mt-0.5 leading-snug">{activeRole.desc}</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-4 pb-2">
          <Button className="btn-shine w-full" onClick={continueAs}>
            Continue as {activeRole.title}
          </Button>
        </div>
      </div>
    </PhoneShell>
  )
}
