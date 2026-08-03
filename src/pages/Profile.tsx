import { Link } from 'react-router-dom'
import {
  ChevronRight,
  FileText,
  Heart,
  HelpCircle,
  Languages,
  Moon,
  PlayCircle,
  Settings,
} from 'lucide-react'
import { Card, Page, PageHeader } from '../components/ui'
import { profileUser } from '../data/mock'
import { images } from '../data/images'
import { useApp } from '../context/AppContext'

const links = [
  { to: '/app/saved-quotes', label: 'Saved quotations', icon: FileText },
  { to: '/app/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/app/training', label: 'Training videos', icon: PlayCircle },
  { to: '/app/support', label: 'Help & Support', icon: HelpCircle },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Profile() {
  const { darkMode, toggleDark, lang, toggleLang, t, setRole, role } = useApp()

  return (
    <Page>
      <PageHeader title={t('Profile', 'प्रोफ़ाइल')} />

      <Card className="mb-4 flex items-center gap-4 !p-4">
        <img
          src={images.avatar}
          alt={profileUser.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-[20px] font-extrabold text-ink">{profileUser.name}</p>
          <p className="text-sm capitalize text-muted">{role ?? 'Customer'}</p>
          <p className="mt-0.5 text-xs text-steel">
            {profileUser.phone} · {profileUser.city}
          </p>
        </div>
      </Card>

      <div className="space-y-2.5">
        <Card className="flex items-center justify-between !py-3.5">
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-ink" />
            <span className="font-bold">Dark mode</span>
          </div>
          <button
            onClick={toggleDark}
            className={`relative h-7 w-12 rounded-full transition ${darkMode ? 'bg-primary' : 'bg-line'}`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${darkMode ? 'left-6' : 'left-1'}`}
            />
          </button>
        </Card>

        <Card className="flex items-center justify-between !py-3.5">
          <div className="flex items-center gap-3">
            <Languages size={18} className="text-ink" />
            <span className="font-bold">Language</span>
          </div>
          <button
            onClick={toggleLang}
            className="rounded-full bg-[#F3F1EC] px-3 py-1 text-sm font-bold"
          >
            {lang === 'en' ? 'English' : 'हिन्दी'}
          </button>
        </Card>

        {links.map((l) => {
          const Icon = l.icon
          return (
            <Link key={l.to} to={l.to}>
              <Card className="flex items-center justify-between !py-3.5">
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-muted" />
                  <span className="font-bold text-ink">{l.label}</span>
                </div>
                <ChevronRight size={18} className="text-steel" />
              </Card>
            </Link>
          )
        })}
      </div>

      <button
        className="mt-6 w-full rounded-[14px] border border-primary py-3 text-sm font-bold text-primary"
        onClick={() => {
          setRole(null)
          window.location.href = '/role'
        }}
      >
        Switch role / Logout
      </button>
    </Page>
  )
}
