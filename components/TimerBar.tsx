import { memo } from 'react'
import type { ScreenEffect } from '@/lib/types'

interface TimerBarProps {
  timeLeft: number
  totalTime: number
  screenEffect: ScreenEffect | null
}

function TimerBarInner({ timeLeft, totalTime, screenEffect }: TimerBarProps) {
  const pct =
    totalTime > 0
      ? Math.max(0, Math.min(100, (timeLeft / totalTime) * 100))
      : 0

  let barColor = ''
  let animClass = ''

  if (timeLeft > 20) {
    barColor = 'bg-green-500'
  } else if (timeLeft > 10) {
    barColor = 'bg-yellow-500'
  } else {
    barColor = 'bg-red-500'
    animClass = 'animate-timer-pulse'
  }

  // Timeout effect collapses/desaturates the bar.
  if (screenEffect?.type === 'timeout') {
    animClass = 'animate-[timer-desaturate_500ms_ease-out_forwards]'
  }

  const showCountdown = timeLeft <= 10 && timeLeft > 0

  return (
    <div
      className="w-full h-8 bg-gray-200 rounded-full overflow-hidden relative"
      role="progressbar"
      aria-valuenow={timeLeft}
      aria-valuemin={0}
      aria-valuemax={totalTime}
    >
      <div
        className={`h-full ${barColor} ${animClass} transition-[width] duration-1000 linear flex items-center justify-center`}
        style={{ width: `${pct}%` }}
      >
        {showCountdown && (
          <span className="text-2xl font-bold text-white drop-shadow">
            {timeLeft}
          </span>
        )}
      </div>
    </div>
  )
}

const TimerBar = memo(TimerBarInner)
export default TimerBar
