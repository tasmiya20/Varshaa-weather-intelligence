import type { PropsWithChildren, HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export function Card({ children, className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn('rounded-xl2 border border-border bg-surface p-5 shadow-card', className)} {...rest}>
      {children}
    </div>
  )
}
