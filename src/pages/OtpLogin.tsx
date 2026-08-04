import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui'
import { PhoneShell } from '../components/PhoneShell'

export default function OtpLogin() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('9876543210')
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [seconds, setSeconds] = useState(25)
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useRef(useNavigate()).current

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
      setSuccess(true)
      window.setTimeout(() => {
        navigate('/role')
      }, 1200)
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
      <div className="relative flex h-full flex-col bg-[#fafaf8] overflow-hidden justify-between pb-4">
        {/* Banner Image at top with motion animation */}
        <div className="relative w-full h-[170px] shrink-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src="/logo.png"
            alt="Amba Shakti Banner"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Welcome back text & custom indicator */}
        <div className="px-5 mt-10 text-center flex flex-col items-center">
          <h1 className="text-[26px] font-black leading-tight text-[#1a202c] tracking-tight">
            Welcome <span className="text-[#d71920]">Back!</span>
          </h1>
          <p className="mt-1 text-[13.5px] font-semibold text-[#6b7280]">
            Login to continue with <span className="text-[#d71920]">Amba Shakti</span>
          </p>
          <div className="flex items-center justify-center gap-1 mt-2.5">
            <div className="h-[4px] w-8 rounded-full bg-[#f36b21]"></div>
            <div className="h-[4px] w-[4px] rounded-full bg-[#f36b21]"></div>
          </div>
        </div>


        {/* Login Card */}
        <div className="relative mx-4 mt-3 bg-white rounded-[20px] border border-[#ece8e2]/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] p-4 min-h-[120px] flex flex-col justify-center">
          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center justify-center py-2 text-center"
            >
              <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-[13px] font-bold text-ink">OTP Verified Successfully</span>
              <span className="text-[10px] text-[#6b7280] mt-0.5">Logging in...</span>
            </motion.div>
          ) : step === 'phone' ? (
            <>
              <span className="block text-[11px] font-bold text-[#6b7280] uppercase tracking-wider mb-1.5 text-left">Mobile Number</span>
              <div className="relative flex items-center h-11 rounded-[12px] border border-[#ece8e2] bg-white px-3 focus-within:border-[#d71920]/40 transition">
                {/* Phone Icon */}
                <div className="h-7 w-7 rounded-[8px] bg-[#FDECEC] text-[#d71920] flex items-center justify-center shrink-0 mr-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                {/* Input field */}
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-sm font-bold text-ink outline-none bg-transparent"
                  placeholder="Enter mobile number"
                />
                {/* Verified Green Badge */}
                {phone.length === 10 && (
                  <div className="text-emerald-500 shrink-0 ml-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="mt-2 text-[10px] text-[#6b7280] text-left">
                We will send you a <span className="font-bold text-ink">one-time password (OTP)</span>
              </p>
              
              {error && (
                <p className="mt-2 rounded-[10px] bg-[#FDECEC] px-3 py-1.5 text-xs font-medium text-[#d71920]">
                  {error}
                </p>
              )}
            </>
          ) : (
            /* OTP state */
            <>
              <span className="block text-[11px] font-bold text-[#6b7280] uppercase tracking-wider mb-1.5 text-left">Enter 6-digit OTP</span>
              <div className="flex items-center justify-between rounded-xl border border-[#ece8e2] bg-[#fafaf8] px-3 py-2 mb-3">
                <span className="text-xs font-bold text-ink">+91 {phone}</span>
                <button className="text-xs font-bold text-[#d71920]" onClick={() => setStep('phone')}>
                  Change
                </button>
              </div>
              <div className="flex justify-between gap-1">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el
                    }}
                    value={d}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    onChange={(e) => onDigit(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digits[i] && i > 0) {
                        inputs.current[i - 1]?.focus()
                      }
                    }}
                    className="h-10 w-9 rounded-lg border border-[#ece8e2] bg-white text-center text-base font-bold text-ink outline-none focus:border-[#d71920] focus:ring-4 focus:ring-[#d71920]/10"
                  />
                ))}
              </div>
              <p className="text-center text-[10px] text-[#6b7280] mt-3">
                {seconds > 0 ? (
                  <>
                    Resend OTP in{' '}
                    <span className="font-bold text-ink">00:{String(seconds).padStart(2, '0')}</span>
                  </>
                ) : (
                  <button
                    className="font-bold text-[#d71920]"
                    onClick={() => {
                      setSeconds(25)
                      setDigits(['', '', '', '', '', ''])
                    }}
                  >
                    Resend OTP
                  </button>
                )}
              </p>
              
              {error && (
                <p className="mt-2 rounded-[10px] bg-[#FDECEC] px-3 py-1.5 text-xs font-medium text-[#d71920]">
                  {error}
                </p>
              )}
            </>
          )}
        </div>

        {/* Unified Submit Button at bottom */}
        {!success && (
          <div className="px-4">
            <Button
              className="btn-shine w-full"
              disabled={loading}
              onClick={step === 'phone' ? sendOtp : verify}
            >
              {loading ? 'Please wait…' : step === 'phone' ? 'Send OTP' : 'Verify & Continue'}
            </Button>
          </div>
        )}

        {/* OR Divider */}
        <div className="relative flex py-2.5 items-center px-4">
          <div className="flex-grow border-t border-[#ece8e2]"></div>
          <span className="flex-shrink mx-3.5 text-[10px] font-bold text-[#a0aec0]">OR</span>
          <div className="flex-grow border-t border-[#ece8e2]"></div>
        </div>

        {/* Email button and Footer */}
        <div className="px-4 space-y-3.5">
          <button
            onClick={() => navigate('/login')}
            className="w-full h-[44px] rounded-[10px] border border-[#ece8e2] bg-white text-ink text-[13px] font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d71920" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Login with Email</span>
          </button>
          
          <p className="text-center text-[11px] font-semibold text-[#6b7280]">
            New to Amba Shakti?{' '}
            <span className="text-[#d71920] cursor-pointer font-bold" onClick={() => navigate('/login')}>
              Create an account
            </span>
          </p>
        </div>
      </div>
    </PhoneShell>
  )
}
