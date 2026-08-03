import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'soft' | 'dark' | 'outline'
}) {
  const styles = {
    primary:
      'relative overflow-hidden brand-gradient text-white shadow-[0_8px_20px_rgba(215,25,32,0.22)] active:scale-[0.98]',
    secondary: 'bg-secondary text-white active:scale-[0.98]',
    ghost: 'bg-transparent text-ink',
    soft: 'bg-[#FFF1E8] text-secondary',
    dark: 'bg-ink text-white active:scale-[0.98]',
    outline: 'border border-line bg-white text-ink',
  }
  return (
    <button
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-[14px] px-5 text-[15px] font-bold transition duration-200 disabled:opacity-45 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Card({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-[16px] border border-line bg-white p-4 ${onClick ? 'cursor-pointer active:scale-[0.99] transition' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export function PageHeader({
  title,
  subtitle,
  backTo,
  right,
}: {
  title: string
  subtitle?: string
  backTo?: string
  right?: ReactNode
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {backTo && (
          <Link
            to={backTo}
            className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink"
          >
            ←
          </Link>
        )}
        <div>
          <h1 className="text-[24px] leading-tight font-extrabold tracking-tight text-ink">
            {title}
          </h1>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded-[20px] ${className}`} />
}

export function EmptyState({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 h-14 w-14 rounded-3xl brand-gradient-soft" />
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 max-w-xs text-sm text-muted">{subtitle}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function SectionTitle({
  title,
  action,
}: {
  title: string
  action?: ReactNode
}) {
  return (
    <div className="mb-3 flex h-7 items-center justify-between">
      <h2 className="text-[16px] font-extrabold text-ink">{title}</h2>
      {action}
    </div>
  )
}

export function Badge({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'brand' | 'live' | 'gold'
  className?: string
}) {
  const map = {
    neutral: 'bg-[#F3F1EC] text-ink',
    success: 'bg-[#E8F6EE] text-success',
    warning: 'bg-[#FFF4E8] text-secondary',
    brand: 'bg-[#FDECEC] text-primary',
    live: 'bg-primary text-white',
    gold: 'bg-[#FFF6D6] text-[#9A7400]',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${map[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export function StickyCta({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-40 -mx-5 mt-6 border-t border-line bg-[#FAFAF8]/96 px-5 py-4 backdrop-blur">
      {children}
    </div>
  )
}

export function Page({
  children,
  className = '',
  stickyCta,
}: {
  children: ReactNode
  className?: string
  stickyCta?: boolean
}) {
  return (
    <motion.div
      {...fade}
      className={`relative px-5 pt-4 ${stickyCta ? 'pb-24' : 'pb-6'} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35 }}
      className="pointer-events-none absolute inset-x-0 bottom-24 z-50 mx-auto w-fit max-w-[90%] rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-xl"
    >
      {message}
    </motion.div>
  )
}

export function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-ink/70">{label}</span>}
      <input
        className="h-12 w-full rounded-[14px] border border-line bg-white px-4 text-[15px] text-ink outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
        {...props}
      />
    </label>
  )
}

/** Transparent PNG only — never black background */
export function BrandMark({
  size = 'md',
  className = '',
  full = false,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  className?: string
  full?: boolean
}) {
  const box = full
    ? size === 'hero'
      ? 'h-[168px] w-auto max-w-[260px]'
      : size === 'xl'
        ? 'h-28 w-auto max-w-[200px]'
        : size === 'lg'
          ? 'h-[72px] w-auto max-w-[160px]'
          : 'h-14 w-auto max-w-[130px]'
    : size === 'hero'
      ? 'h-32 w-32'
      : size === 'xl'
        ? 'h-24 w-24'
        : size === 'lg'
          ? 'h-16 w-16'
          : size === 'md'
            ? 'h-12 w-12'
            : size === 'sm'
              ? 'h-9 w-9'
              : 'h-7 w-7'

  return (
    <img
      src={full ? '/logo-transparent.png' : '/logo-mark.png'}
      alt="Amba Shakti"
      className={`${box} object-contain ${className}`}
      draggable={false}
    />
  )
}
