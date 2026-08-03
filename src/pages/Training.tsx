import { Card, Page, PageHeader, Badge } from '../components/ui'
import { trainingVideos } from '../data/mock'
import { useApp } from '../context/AppContext'
import { Play } from 'lucide-react'

export default function Training() {
  const { showToast } = useApp()

  return (
    <Page>
      <PageHeader title="Training videos" subtitle="Short site-ready lessons" backTo="/app/profile" />
      <div className="space-y-3">
        {trainingVideos.map((v) => (
          <button
            key={v.id}
            className="w-full text-left"
            onClick={() => showToast(`Playing: ${v.title}`)}
          >
            <Card>
              <div className="relative mb-3 flex h-28 items-center justify-center rounded-2xl bg-ink text-white">
                <Play size={28} />
                <span className="absolute right-3 bottom-3 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold">
                  {v.duration}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <p className="font-bold text-ink">{v.title}</p>
                <Badge>{v.tag}</Badge>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </Page>
  )
}
