import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FileText,
  Heart,
  HelpCircle,
  Info,
  LogOut,
  MapPin,
  Moon,
  Package,
  User,
  Bell,
  X,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { images } from '../data/images'

const links = [
  { to: '/app/profile', label: 'My Profile', icon: User },
  { to: '/app/saved-quotes', label: 'Saved Quotes', icon: FileText },
  { to: '/app/orders', label: 'My Orders', icon: Package },
  { to: '/app/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/app/dealers', label: 'Address / Dealers', icon: MapPin },
  { to: '/app/notifications', label: 'Notifications', icon: Bell, badge: 2 },
  { to: '/app/support', label: 'Help & Support', icon: HelpCircle },
  { to: '/app/training', label: 'About Us', icon: Info },
]

export function SideDrawer() {
  const { drawerOpen, setDrawerOpen, userName, role, darkMode, toggleDark, lang, toggleLang, setRole } =
    useApp()

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 z-50 bg-ink/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
          />
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 z-50 flex w-[82%] max-w-[320px] flex-col bg-white shadow-2xl"
          >
            <div className="brand-gradient px-5 pt-10 pb-6 text-white">
              <div className="mb-4 flex items-start justify-between">
                <img
                  src={images.avatar}
                  alt={userName}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-white/40 shadow-lg"
                />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full bg-white/15 p-2"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xl font-extrabold">{userName}</p>
              <p className="mt-1 text-sm text-white/80 capitalize">
                {role ?? 'Customer'} · Amba Shakti
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              {links.map((l) => {
                const Icon = l.icon
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setDrawerOpen(false)}
                    className="mb-1 flex items-center justify-between rounded-2xl px-3 py-3.5 text-ink hover:bg-[#F7F5F1]"
                  >
                    <span className="flex items-center gap-3 text-[15px] font-semibold">
                      <Icon size={18} className="text-primary" />
                      {l.label}
                    </span>
                    {l.badge ? (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                        {l.badge}
                      </span>
                    ) : null}
                  </Link>
                )
              })}

              <div className="mt-2 space-y-2 border-t border-line px-3 pt-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-semibold text-ink">Language</span>
                  <button
                    onClick={toggleLang}
                    className="rounded-full bg-[#F3F1EC] px-3 py-1 text-xs font-bold"
                  >
                    {lang === 'en' ? 'English' : 'हिन्दी'}
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Moon size={16} className="text-primary" /> Dark Mode
                  </span>
                  <button
                    onClick={toggleDark}
                    className={`relative h-7 w-12 rounded-full transition ${darkMode ? 'bg-primary' : 'bg-line'}`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${darkMode ? 'left-6' : 'left-1'}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <button
              className="m-4 flex items-center justify-center gap-2 rounded-2xl border border-line py-3.5 text-sm font-bold text-primary"
              onClick={() => {
                setDrawerOpen(false)
                setRole(null)
                window.location.href = '/role'
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
