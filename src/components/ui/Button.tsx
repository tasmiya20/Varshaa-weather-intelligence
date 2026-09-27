import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md'
}

const VARIANT: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  ghost: 'text-ink-muted hover:bg-canvas',
  outline: 'border border-border text-ink hover:border-primary hover:text-primary',
}
const SIZE: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm',
}

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn('inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:opacity-50', VARIANT[variant], SIZE[size], className)}
      {...rest}
    />
  )
}
