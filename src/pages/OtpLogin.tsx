import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BrandMark, Button, Input } from '../components/ui'
import { PhoneShell } from '../components/PhoneShell'

export default function OtpLogin() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('9876543210')
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [seconds, setSeconds] = useState(25)
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (step !== 'otp' || seconds <= 0) return
    const t = window.setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => window.clearInterval(t)
  }, [step, seconds])

  const sendOtp = () => {
    if (phone.length < 10) {
      setError('Enter a valid 10-digit mobile number')
      return
    }
    setError('')
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setStep('otp')
      setSeconds(25)
      setDigits(['', '', '', '', '', ''])
    }, 700)
  }

  const verify = () => {
    if (digits.join('').length < 6) {
      setError('Enter the 6-digit OTP')
      return
    }
    setError('')
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      navigate('/role')
    }, 700)
  }

  const onDigit = (i: number, val: string) => {
    const v = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i < 5) inputs.current[i + 1]?.focus()
  }

  return (
    <PhoneShell>
      <div className="app-scroll flex h-full flex-col overflow-y-auto bg-bg px-5 pt-14">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <BrandMark size="md" className="mb-5" />
          <h1 className="text-[30px] font-extrabold tracking-tight text-ink">
            {step === 'phone' ? 'Welcome Back!' : 'Enter OTP'}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {step === 'phone'
              ? 'Login to continue with Amba Shakti.'
              : `OTP sent to +91 ${phone}`}
          </p>
        </motion.div>

        <div className="mt-8 space-y-5">
          {step === 'phone' ? (
            <Input
              label="Mobile number"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="10-digit number"
            />
          ) : (
            <>
              <div className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3">
                <span className="text-sm font-semibold text-ink">+91 {phone}</span>
                <button className="text-sm font-bold text-primary" onClick={() => setStep('phone')}>
                  Change
                </button>
              </div>
              <div className="flex justify-between gap-2">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el
                    }}
                    value={d}
                    inputMode="numeric"
                    maxLength={1}
                    onChange={(e) => onDigit(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digits[i] && i > 0) {
                        inputs.current[i - 1]?.focus()
                      }
                    }}
                    className="h-12 w-11 rounded-xl border border-line bg-white text-center text-lg font-extrabold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                ))}
              </div>
              <p className="text-center text-sm text-muted">
                {seconds > 0 ? (
                  <>
                    Resend OTP in{' '}
                    <span className="font-bold text-ink">00:{String(seconds).padStart(2, '0')}</span>
                  </>
                ) : (
                  <button
                    className="font-bold text-primary"
                    onClick={() => {
                      setSeconds(25)
                      setDigits(['', '', '', '', '', ''])
                    }}
                  >
                    Resend OTP
                  </button>
                )}
              </p>
            </>
          )}
          {error && (
            <p className="rounded-2xl bg-[#FDECEC] px-3 py-2 text-sm font-medium text-primary">
              {error}
            </p>
          )}
        </div>

        <div className="mt-auto pt-8 pb-8">
          <Button
            className="btn-shine w-full"
            disabled={loading}
            onClick={step === 'phone' ? sendOtp : verify}
          >
            {loading ? 'Please wait…' : step === 'phone' ? 'Send OTP' : 'Verify & Continue'}
          </Button>
        </div>
      </div>
    </PhoneShell>
  )
}
