import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, Page, PageHeader, Badge } from '../components/ui'
import { CheckCircle2, XCircle, ScanLine } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ScanQr() {
  const [state, setState] = useState<'idle' | 'scanning' | 'success' | 'fail'>('idle')
  const { showToast } = useApp()

  const scan = () => {
    setState('scanning')
    window.setTimeout(() => {
      const ok = Math.random() > 0.15
      setState(ok ? 'success' : 'fail')
      showToast(ok ? 'Verified Original Product' : 'Verification failed')
    }, 1400)
  }

  return (
    <Page>
      <PageHeader title="QR Verification" subtitle="Confirm authenticity on delivery" />

      <div className="relative flex h-[360px] items-center justify-center overflow-hidden rounded-[28px] bg-[#121212] text-white">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(215,25,32,0.35), transparent 40%), radial-gradient(circle at 70% 80%, rgba(243,107,33,0.25), transparent 45%)',
        }} />

        <div className="absolute inset-10 rounded-[22px] border-2 border-white/25" />
        <div className="absolute top-10 left-10 h-6 w-6 border-t-4 border-l-4 border-primary" />
        <div className="absolute top-10 right-10 h-6 w-6 border-t-4 border-r-4 border-primary" />
        <div className="absolute bottom-10 left-10 h-6 w-6 border-b-4 border-l-4 border-primary" />
        <div className="absolute bottom-10 right-10 h-6 w-6 border-b-4 border-r-4 border-primary" />

        {state === 'idle' && (
          <div className="relative z-10 text-center">
            <ScanLine className="mx-auto mb-3 text-white/80" size={42} />
            <p className="text-sm text-white/70">Align QR within the frame</p>
          </div>
        )}

        {state === 'scanning' && (
          <motion.div
            className="absolute inset-x-14 top-14 z-10 h-0.5 brand-gradient shadow-[0_0_12px_rgba(215,25,32,0.8)]"
            animate={{ y: [0, 230, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {state === 'success' && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 text-center"
          >
            <CheckCircle2 className="mx-auto text-[#5CFF9A]" size={58} />
            <p className="mt-4 text-2xl font-extrabold">Verified</p>
            <p className="mt-1 text-sm text-white/75">Original Product</p>
          </motion.div>
        )}

        {state === 'fail' && (
          <div className="relative z-10 text-center">
            <XCircle className="mx-auto text-[#FF7A7A]" size={58} />
            <p className="mt-4 text-2xl font-extrabold">Not verified</p>
            <p className="mt-1 text-sm text-white/75">Invalid or already used</p>
          </div>
        )}
      </div>

      <Button className="mt-5 w-full" onClick={scan} disabled={state === 'scanning'}>
        {state === 'scanning' ? 'Scanning…' : state === 'idle' ? 'Scan QR Code' : 'Scan again'}
      </Button>

      {state === 'success' && (
        <Card className="mt-4 space-y-3">
          <Badge tone="success">Verified Original</Badge>
          {[
            ['Batch No', 'AS-BLR-24081'],
            ['Dealer', 'Shakti Steel Traders'],
            ['Mfg. Date', '12 Jun 2026'],
            ['Steel Grade', 'FE 550D'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-sm text-muted">{k}</span>
              <span className="text-sm font-bold text-ink">{v}</span>
            </div>
          ))}
        </Card>
      )}
    </Page>
  )
}
