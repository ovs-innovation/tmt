import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Bell, Gift, Home, Menu, Package, QrCode, User, ClipboardList, Boxes } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { BrandMark, Toast } from './ui'
import { SideDrawer } from './SideDrawer'
import { PhoneShell } from './PhoneShell'

export { PhoneShell }

export function AppShell() {
  const { role, toast, setDrawerOpen } = useApp()
  const location = useLocation()
  const hideNav =
    location.pathname.includes('/checkout') ||
    location.pathname.includes('/success') ||
    location.pathname.includes('/quote')
  const isHome = location.pathname.endsWith('/home')

  const sideTabs =
    role === 'dealer'
      ? [
          { to: '/app/home', label: 'Home', icon: Home },
          { to: '/app/dealer/orders', label: 'Orders', icon: ClipboardList },
          { to: '/app/rewards', label: 'Rewards', icon: Gift },
          { to: '/app/dealer/stock', label: 'Stock', icon: Boxes },
        ]
      : [
          { to: '/app/home', label: 'Home', icon: Home },
          { to: '/app/orders', label: 'Orders', icon: Package },
          { to: '/app/rewards', label: 'Rewards', icon: Gift },
          { to: '/app/profile', label: 'Profile', icon: User },
        ]

  return (
    <PhoneShell dark={isHome}>
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
        <SideDrawer />

        {!isHome && (
          <div className="z-10 flex shrink-0 items-center justify-between border-b border-line bg-bg px-4 pt-14 pb-2.5">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white"
            >
              <Menu size={18} className="text-ink" />
            </button>
            <BrandMark size="xs" />
            <NavLink
              to="/app/notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white"
            >
              <Bell size={17} className="text-ink" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </NavLink>
          </div>
        )}

        <div className="app-scroll relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-bg">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </div>

        {!hideNav && (
          <nav className="relative z-30 shrink-0 border-t border-line bg-white/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
            <div className="relative grid grid-cols-5 items-end px-1 pt-2.5 pb-1">
              {sideTabs.slice(0, 2).map((tab) => {
                const Icon = tab.icon
                return (
                  <NavLink
                    key={tab.to}
                    to={tab.to}
                    className="flex flex-col items-center gap-0.5 py-1 text-[10px] font-bold"
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                            isActive ? 'bg-[#FDECEC]' : ''
                          }`}
                        >
                          <Icon
                            size={20}
                            className={isActive ? 'text-primary' : 'text-steel'}
                            strokeWidth={isActive ? 2.4 : 1.9}
                            fill={isActive ? 'currentColor' : 'none'}
                            fillOpacity={isActive ? 0.18 : 0}
                          />
                        </span>
                        <span className={isActive ? 'text-primary' : 'text-steel'}>{tab.label}</span>
                      </>
                    )}
                  </NavLink>
                )
              })}

              <div className="relative flex flex-col items-center">
                <NavLink
                  to="/app/scan"
                  className="-mt-8 flex h-[56px] w-[56px] items-center justify-center rounded-full brand-gradient text-white shadow-[0_12px_28px_rgba(215,25,32,0.4)] ring-[5px] ring-white"
                >
                  <QrCode size={24} strokeWidth={2.4} />
                </NavLink>
                <span className="mt-1 text-[10px] font-bold text-primary">Scan</span>
              </div>

              {sideTabs.slice(2).map((tab) => {
                const Icon = tab.icon
                return (
                  <NavLink
                    key={tab.to}
                    to={tab.to}
                    className="flex flex-col items-center gap-0.5 py-1 text-[10px] font-bold"
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                            isActive ? 'bg-[#FDECEC]' : ''
                          }`}
                        >
                          <Icon
                            size={20}
                            className={isActive ? 'text-primary' : 'text-steel'}
                            strokeWidth={isActive ? 2.4 : 1.9}
                            fill={isActive ? 'currentColor' : 'none'}
                            fillOpacity={isActive ? 0.18 : 0}
                          />
                        </span>
                        <span className={isActive ? 'text-primary' : 'text-steel'}>{tab.label}</span>
                      </>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </nav>
        )}

        <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
      </div>
    </PhoneShell>
  )
}
