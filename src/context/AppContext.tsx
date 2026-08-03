import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Role } from '../data/mock'

type Lang = 'en' | 'hi'

type AppContextValue = {
  role: Role | null
  setRole: (r: Role | null) => void
  userName: string
  darkMode: boolean
  toggleDark: () => void
  lang: Lang
  toggleLang: () => void
  wishlistIds: string[]
  toggleWishlist: (id: string) => void
  toast: string | null
  showToast: (msg: string) => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  t: (en: string, hi: string) => string
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [wishlistIds, setWishlistIds] = useState<string[]>(['tmt-12', 'tmt-16'])
  const [toast, setToast] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2400)
  }

  const value = useMemo<AppContextValue>(
    () => ({
      role,
      setRole,
      userName: 'Dristy',
      darkMode,
      toggleDark: () => {
        setDarkMode((d) => {
          const next = !d
          document.documentElement.classList.toggle('dark', next)
          document.body.classList.toggle('dark-mode', next)
          return next
        })
      },
      lang,
      toggleLang: () => setLang((l) => (l === 'en' ? 'hi' : 'en')),
      wishlistIds,
      toggleWishlist: (id) =>
        setWishlistIds((ids) =>
          ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
        ),
      toast,
      showToast,
      drawerOpen,
      setDrawerOpen,
      t: (en, hi) => (lang === 'hi' ? hi : en),
    }),
    [role, darkMode, lang, wishlistIds, toast, drawerOpen],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
