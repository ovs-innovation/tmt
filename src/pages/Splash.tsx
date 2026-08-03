import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { images } from '../data/images'
import { PhoneShell } from '../components/PhoneShell'
import { BrandMark } from '../components/ui'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = window.setTimeout(() => navigate('/welcome'), 3400)
    return () => window.clearTimeout(t)
  }, [navigate])

  return (
    <PhoneShell dark>
      <div className="relative flex h-full flex-col overflow-hidden bg-[#0A0A0A]">
        <motion.img
          src={images.dusk}
          alt=""
          initial={{ scale: 1.1, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/92" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <BrandMark full size="hero" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="mt-5 text-[11px] font-semibold tracking-[0.28em] text-white/55 uppercase"
            >
              Trusted Steel Since 1974
            </motion.p>
          </motion.div>
        </div>

        <div className="relative z-10 px-10 pb-12">
          <p className="mb-4 text-center text-[13px] text-white/60">
            Building a stronger tomorrow
          </p>
          <div className="mx-auto h-[2px] w-36 overflow-hidden rounded-full bg-white/15">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.3, duration: 2.6, ease: 'easeInOut' }}
              className="brand-gradient h-full"
            />
          </div>
        </div>
      </div>
    </PhoneShell>
  )
}
