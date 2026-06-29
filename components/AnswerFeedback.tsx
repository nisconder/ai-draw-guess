import { memo } from 'react'
import type { RoundResult, ScreenEffect } from '@/lib/types'

interface AnswerFeedbackProps {
  resultType: RoundResult
  correctWord: string
  screenEffect: ScreenEffect | null
}

/**
 * Predefined animation-delay classes for the typewriter reveal.
 * Literal strings so Tailwind JIT detects every arbitrary property.
 */
const TYPEWRITER_DELAYS = [
  '[animation-delay:0ms]',
  '[animation-delay:80ms]',
  '[animation-delay:160ms]',
  '[animation-delay:240ms]',
  '[animation-delay:320ms]',
  '[animation-delay:400ms]',
  '[animation-delay:480ms]',
  '[animation-delay:560ms]',
  '[animation-delay:640ms]',
  '[animation-delay:720ms]',
  '[animation-delay:800ms]',
  '[animation-delay:880ms]',
]

function AnswerFeedbackInner({ resultType, correctWord, screenEffect }: AnswerFeedbackProps) {
  if (!resultType) return null

  // correct: pop a celebratory label
  if (resultType === 'correct') {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <span className="text-5xl font-bold text-green-500 animate-score-pop [text-shadow:0_0_20px_rgba(34,197,94,0.6)]">
          {'\u2713'} 答对了！
        </span>
      </div>
    )
  }

  // wrong / timeout: reveal the correct word with a staggered typewriter
  const chars = Array.from(correctWord)

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">答案是：</p>
        <p className="text-3xl font-bold text-red-500">
          {chars.map((char, i) => (
            <span
              key={i}
              className={`inline-block opacity-0 animate-[fade-in-char_300ms_ease-out_forwards] ${
                TYPEWRITER_DELAYS[i % TYPEWRITER_DELAYS.length]
              }`}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

const AnswerFeedback = memo(AnswerFeedbackInner)
export default AnswerFeedback
