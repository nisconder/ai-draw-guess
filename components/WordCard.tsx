import { memo } from 'react'
import type { ScreenEffect } from '@/lib/types'

interface WordCardProps {
  description: string | null
  hint: string
  isGenerating: boolean
  screenEffect: ScreenEffect | null
}

function WordCardInner({ description, hint, isGenerating, screenEffect }: WordCardProps) {
  const isWrong = screenEffect?.type === 'wrong'

  const containerClass = isWrong
    ? 'bg-red-50 border-2 border-red-200'
    : 'bg-gradient-to-br from-blue-50 to-purple-50'

  return (
    <div className={`rounded-2xl p-6 shadow-md ${containerClass}`}>
      {/* Hint badge */}
      <div className="inline-block mb-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
        {'\uD83D\uDCA1'} {hint}
      </div>

      {/* Content */}
      {isGenerating ? (
        <div className="space-y-3" aria-label="正在生成描述">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
        </div>
      ) : description ? (
        <p className="text-2xl leading-relaxed text-gray-800">{description}</p>
      ) : (
        <p className="text-2xl leading-relaxed text-gray-400">等待描述生成...</p>
      )}
    </div>
  )
}

const WordCard = memo(WordCardInner)
export default WordCard
