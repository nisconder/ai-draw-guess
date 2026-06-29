import { memo } from 'react'
import type { ScreenEffect } from '@/lib/types'

interface ScreenOverlayProps {
  effect: ScreenEffect | null
}

/** Resolve the animation + background classes for a given screen effect. */
function resolveEffectClasses(effect: ScreenEffect): { animation: string; bg: string } | null {
  switch (effect.type) {
    case 'correct':
      return { animation: 'animate-[screen-flash_400ms_ease-out]', bg: '' }
    case 'wrong':
      return { animation: 'animate-shake-heavy', bg: 'bg-red-500/20' }
    case 'timeout':
      return { animation: 'animate-[screen-flash-red_400ms_ease-out]', bg: '' }
    case 'combo':
      if (effect.intensity >= 8) {
        return { animation: 'animate-[border-golden_500ms_ease-in-out]', bg: '' }
      }
      if (effect.intensity >= 6) {
        return { animation: 'animate-[border-pulse-purple_500ms_ease-in-out]', bg: '' }
      }
      if (effect.intensity >= 4) {
        return { animation: 'animate-[border-pulse-blue_500ms_ease-in-out]', bg: '' }
      }
      return null
    case 'game-over':
      return { animation: 'animate-[screen-dim_2000ms_ease-out_forwards]', bg: '' }
    case 'achievement':
      return { animation: 'animate-[golden-burst_3000ms_ease-out_forwards]', bg: '' }
    default:
      return null
  }
}

function ScreenOverlayInner({ effect }: ScreenOverlayProps) {
  if (!effect) return null
  const resolved = resolveEffectClasses(effect)
  if (!resolved) return null

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 ${resolved.animation} ${resolved.bg}`}
      aria-hidden="true"
    />
  )
}

const ScreenOverlay = memo(ScreenOverlayInner)
export default ScreenOverlay
