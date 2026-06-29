import { memo } from 'react'
import type { ScreenEffect } from '@/lib/types'

interface HeartsDisplayProps {
  lives: number
  maxLives: number
  screenEffect: ScreenEffect | null
}

function HeartsDisplayInner({ lives, maxLives, screenEffect }: HeartsDisplayProps) {
  const effectType = screenEffect?.type
  const isHeartLose = effectType === 'heart-lose'
  const isHeartGain = effectType === 'heart-gain'
  const isWarning = lives === 1

  const hearts = Array.from({ length: maxLives }, (_, i) => {
    // The heart at index `lives` is the one just lost — show it filled while it explodes.
    const showAsFilled = i < lives || (isHeartLose && i === lives)
    const isExploding = isHeartLose && i === lives
    const isPoppingIn = isHeartGain && i === lives - 1

    const classes: string[] = ['text-2xl select-none']
    if (isExploding) classes.push('animate-heart-explode')
    if (isPoppingIn) classes.push('animate-heart-pop-in')
    if (isWarning) classes.push('animate-pulse')
    if (!showAsFilled) classes.push('opacity-30 grayscale')

    return (
      <span key={i} className={classes.join(' ')}>
        {'\u2764\uFE0F'}
      </span>
    )
  })

  return (
    <div
      className="flex flex-row gap-1 justify-center items-center"
      aria-label={`生命值 ${lives}/${maxLives}`}
      role="status"
    >
      {hearts}
    </div>
  )
}

const HeartsDisplay = memo(HeartsDisplayInner)
export default HeartsDisplay
