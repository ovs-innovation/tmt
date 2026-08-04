import { useNavigate } from 'react-router-dom'
import { PhoneShell } from '../components/PhoneShell'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <PhoneShell>
      <div className="flex h-full flex-col bg-[#fafaf8] overflow-hidden justify-between py-4">

        {/* Content Heading & Subheading */}
        <div className="text-center px-5 pt-8">
          <h1 className="text-[23px] font-black leading-[1.25] text-[#1e242b] tracking-tight">
            Build Strong.
            <br />
            Build with <span className="text-[#d71920]">Amba Shakti.</span>
          </h1>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#6b7280] px-2">
            Order genuine TMT bars, get instant quotes, track deliveries, and find authorized dealers with complete transparency.
          </p>
        </div>

        {/* Center Product Image - Edge-to-Edge */}
        <div className="w-full flex-1 flex justify-center items-center overflow-hidden my-1">
          <img
            src="/tmt_bars.png"
            alt="Amba Shakti TMT Bars"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Features Card */}
        <div className="mx-4 mb-3 bg-white rounded-[20px] border border-[#ece8e2]/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] py-3 px-1.5">
          <div className="flex items-center justify-between">
            {/* Verified Quality */}
            <div className="flex-1 flex flex-col items-center text-center px-0.5">
              <div className="h-8 w-8 flex items-center justify-center mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#303841" />
                  <path d="m9 11 2 2 4-4" stroke="#FFE043" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-[#303841] leading-tight">
                Verified<br />Quality
              </span>
            </div>

            {/* Divider */}
            <div className="h-7 w-[1px] bg-[#ece8e2]"></div>

            {/* Instant Quotes */}
            <div className="flex-1 flex flex-col items-center text-center px-0.5">
              <div className="h-8 w-8 flex items-center justify-center mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#E2E8F0" stroke="#303841" strokeWidth="1.2" />
                  <path d="M14 2v6h6" fill="#CBD5E1" stroke="#303841" strokeWidth="1.2" />
                  <path d="M9 11h4.5M9 13.5h4M9 11a2.2 2.2 0 0 0 0-4.4h4.4" stroke="#d71920" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M11.5 13.5l2.5 3" stroke="#d71920" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-[#303841] leading-tight">
                Instant<br />Quotes
              </span>
            </div>

            {/* Divider */}
            <div className="h-7 w-[1px] bg-[#ece8e2]"></div>

            {/* Fast & Safe Delivery */}
            <div className="flex-1 flex flex-col items-center text-center px-0.5">
              <div className="h-8 w-8 flex items-center justify-center mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2 9h3M2 13h2" stroke="#d71920" strokeWidth="1.8" strokeLinecap="round" />
                  <rect x="6" y="6" width="10" height="9" rx="1" fill="#4A5568" stroke="#303841" strokeWidth="1.2" />
                  <path d="M16 8.5h3.5l2.5 2.5v4H16z" fill="#d71920" stroke="#303841" strokeWidth="1.2" />
                  <circle cx="9" cy="18" r="2" fill="#1A202C" />
                  <circle cx="17" cy="18" r="2" fill="#d71920" />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-[#303841] leading-tight">
                Fast & Safe<br />Delivery
              </span>
            </div>

            {/* Divider */}
            <div className="h-7 w-[1px] bg-[#ece8e2]"></div>

            {/* Dealer Near You */}
            <div className="flex-1 flex flex-col items-center text-center px-0.5">
              <div className="h-8 w-8 flex items-center justify-center mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#d71920" stroke="#303841" strokeWidth="1.2" />
                  <circle cx="12" cy="10" r="3.5" fill="#FFF" stroke="#303841" strokeWidth="1" />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-[#303841] leading-tight">
                Dealer<br />Near You
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 px-4 pb-2">
          <button
            onClick={() => navigate('/login')}
            className="w-full h-[48px] rounded-[12px] bg-[#c21a22] text-white text-[15px] font-bold active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(194,26,34,0.15)] cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full h-[48px] rounded-[12px] border border-[#c21a22] bg-white text-[#c21a22] text-[15px] font-bold active:scale-[0.98] transition-all cursor-pointer"
          >
            I already have an account
          </button>
        </div>
      </div>
    </PhoneShell>
  )
}
