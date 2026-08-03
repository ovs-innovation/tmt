import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button, Page } from '../components/ui'

export default function OrderSuccess() {
  return (
    <Page>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="brand-gradient flex h-24 w-24 items-center justify-center rounded-full text-white shadow-[0_16px_40px_rgba(215,25,32,0.3)]"
        >
          <Check size={40} strokeWidth={2.5} />
        </motion.div>
        <h1 className="mt-6 text-3xl font-extrabold text-ink">Order placed</h1>
        <p className="mt-2 max-w-xs text-sm text-muted">
          AS-24081 is assigned to Shakti Steel Traders. Live updates will follow.
        </p>
        <div className="mt-8 grid w-full gap-3">
          <Link to="/app/orders/AS-24081">
            <Button className="w-full">Track order</Button>
          </Link>
          <Link to="/app/home">
            <Button variant="ghost" className="w-full">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </Page>
  )
}
