import { useEffect, useState, type ReactNode } from 'react'

function useNativePhone() {
  const [native, setNative] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(max-width: 640px)').matches ||
      (window.matchMedia('(hover: none) and (pointer: coarse)').matches &&
        window.matchMedia('(max-width: 1024px)').matches)
    )
  })

  useEffect(() => {
    const mqNarrow = window.matchMedia('(max-width: 640px)')
    const mqTouch = window.matchMedia('(hover: none) and (pointer: coarse)')
    const mqTablet = window.matchMedia('(max-width: 1024px)')
    const sync = () => {
      setNative(mqNarrow.matches || (mqTouch.matches && mqTablet.matches))
    }
    sync()
    mqNarrow.addEventListener('change', sync)
    mqTouch.addEventListener('change', sync)
    mqTablet.addEventListener('change', sync)
    return () => {
      mqNarrow.removeEventListener('change', sync)
      mqTouch.removeEventListener('change', sync)
      mqTablet.removeEventListener('change', sync)
    }
  }, [])

  return native
}

function StatusBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,
        }),
      )
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="iphone-status-bar" aria-hidden>
      <span className="iphone-status-time">{time || '9:41'}</span>
      <div className="iphone-status-right">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0.5" y="3.5" width="3" height="8" rx="0.6" fill="currentColor" opacity="0.35" />
          <rect x="4.5" y="2" width="3" height="9.5" rx="0.6" fill="currentColor" opacity="0.55" />
          <rect x="8.5" y="0.5" width="3" height="11" rx="0.6" fill="currentColor" opacity="0.75" />
          <rect x="12.5" y="0" width="3.5" height="11.5" rx="0.6" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 2.2c2.2 0 4.2.8 5.8 2.2l-1.1 1.1A6.4 6.4 0 0 0 8 3.8c-1.7 0-3.2.6-4.4 1.7L2.5 4.4A7.9 7.9 0 0 1 8 2.2Zm0 3.1c1.4 0 2.6.5 3.6 1.3L10.5 7.7A3.7 3.7 0 0 0 8 6.8c-.9 0-1.8.3-2.5.9L4.4 6.6A5.2 5.2 0 0 1 8 5.3Zm0 3.1c.7 0 1.3.2 1.8.6L8 11.8 6.2 9c.5-.4 1.1-.6 1.8-.6Z"
            fill="currentColor"
          />
        </svg>
        <div className="iphone-battery">
          <div className="iphone-battery-body">
            <div className="iphone-battery-level" />
          </div>
          <div className="iphone-battery-cap" />
        </div>
      </div>
    </div>
  )
}

export function PhoneShell({
  children,
  dark,
}: {
  children: ReactNode
  dark?: boolean
}) {
  const native = useNativePhone()

  useEffect(() => {
    document.documentElement.classList.toggle('native-phone', native)
    return () => document.documentElement.classList.remove('native-phone')
  }, [native])

  if (native) {
    return (
      <div className={`native-shell ${dark ? 'native-shell-dark' : ''}`}>
        <div className="native-app">{children}</div>
      </div>
    )
  }

  return (
    <div className="phone-stage">
      <div className="iphone-glow" aria-hidden />
      <div className="iphone-device" aria-label="iPhone preview">
        <div className="iphone-bezel">
          <div className="iphone-shine" aria-hidden />

          <div className="iphone-side-btn iphone-silent" />
          <div className="iphone-side-btn iphone-vol-up" />
          <div className="iphone-side-btn iphone-vol-down" />
          <div className="iphone-side-btn iphone-power" />

          <div className={`iphone-screen ${dark ? 'iphone-screen-dark' : ''}`}>
            <div className="iphone-screen-reflection" aria-hidden />
            <StatusBar />
            <div className="iphone-dynamic-island">
              <span className="iphone-island-camera" />
              <span className="iphone-island-sensor" />
            </div>
            <div className="iphone-app">{children}</div>
            <div className="iphone-home-indicator" />
          </div>
        </div>
      </div>
    </div>
  )
}
