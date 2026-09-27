import type { PropsWithChildren } from 'react'
import { useState } from 'react'

export function Tooltip({ label, children }: PropsWithChildren<{ label: string }>) {
  const [show, setShow] = useState(false)
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 text-[11px] font-medium text-white shadow-panel">
          {label}
        </span>
      )}
    </span>
  )
}
