'use client'

import { memo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface ScreenShakeProps {
  intensity: number
  children: ReactNode
}

/** Resolve shake animation class from intensity tier. */
function resolveShakeClass(intensity: number): string {
  if (intensity >= 7) return 'animate-shake-heavy'
  if (intensity >= 4) return 'animate-shake-light'
  return ''
}

function ScreenShakeInner({ intensity, children }: ScreenShakeProps) {
  const [active, setActive] = useState(true)

  // Re-arm the shake whenever intensity changes so a new event re-triggers it.
  useEffect(() => {
    setActive(true)
  }, [intensity])

  const shakeClass = resolveShakeClass(intensity)

  if (!shakeClass) {
    return <div>{children}</div>
  }

  return (
    <div
      className={active ? shakeClass : ''}
      onAnimationEnd={() => setActive(false)}
    >
      {children}
    </div>
  )
}

const ScreenShake = memo(ScreenShakeInner)
export default ScreenShake
