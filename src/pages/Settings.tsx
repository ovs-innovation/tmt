import { Card, Page, PageHeader } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Settings() {
  const { darkMode, toggleDark, lang, toggleLang } = useApp()

  return (
    <Page>
      <PageHeader title="Settings" backTo="/app/profile" />
      <div className="space-y-3">
        {[
          ['Push notifications', 'Orders, rewards, dealer updates'],
          ['Location access', 'Nearby dealers & live price region'],
          ['Biometric unlock', 'Demo toggle only'],
        ].map(([title, sub]) => (
          <Card key={title}>
            <p className="font-bold text-ink">{title}</p>
            <p className="mt-1 text-sm text-muted">{sub}</p>
          </Card>
        ))}
        <Card>
          <p className="font-bold text-ink">Appearance</p>
          <button className="mt-2 text-sm font-bold text-primary" onClick={toggleDark}>
            {darkMode ? 'Switch to light' : 'Switch to dark'}
          </button>
        </Card>
        <Card>
          <p className="font-bold text-ink">Language</p>
          <button className="mt-2 text-sm font-bold text-primary" onClick={toggleLang}>
            {lang === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
          </button>
        </Card>
      </div>
    </Page>
  )
}
