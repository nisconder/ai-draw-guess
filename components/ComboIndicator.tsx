import { memo } from 'react'
import type { ScreenEffect } from '@/lib/types'

interface ComboIndicatorProps {
  combo: number
  screenEffect: ScreenEffect | null
}

interface ComboTier {
  color: string
  icon: string
  extra: string
}

/** Resolve the display tier for a given combo count. */
function resolveComboTier(combo: number): ComboTier | null {
  if (combo >= 10) {
    return {
      color: 'text-orange-500',
      icon: '\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25',
      extra: 'animate-combo-rotate [text-shadow:0_0_12px_rgba(249,115,22,0.8)]',
    }
  }
  if (combo >= 8) {
    return {
      color: 'text-yellow-400',
      icon: '\uD83D\uDD25x3',
      extra: 'animate-combo-rotate',
    }
  }
  if (combo >= 5) {
    return {
      color: 'text-purple-500',
      icon: '\uD83D\uDD25x2',
      extra: '[text-shadow:0_0_8px_rgba(168,85,247,0.6)]',
    }
  }
  if (combo >= 3) {
    return {
      color: 'text-blue-400',
      icon: '\uD83D\uDD25x1',
      extra: '',
    }
  }
  return null
}

function ComboIndicatorInner({ combo, screenEffect }: ComboIndicatorProps) {
  const tier = resolveComboTier(combo)
  if (!tier) return null

  const classes = [
    'text-4xl',
    'font-bold',
    'text-center',
    tier.color,
    tier.extra,
  ]
  if (screenEffect?.type === 'combo') {
    classes.push('animate-combo-bounce')
  }

  return (
    <div className={classes.join(' ')} aria-live="polite">
      {tier.icon} {combo} 连击
    </div>
  )
}

const ComboIndicator = memo(ComboIndicatorInner)
export default ComboIndicator
