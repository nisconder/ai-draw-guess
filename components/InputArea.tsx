'use client'

import { memo, useState, useEffect, useCallback } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import type { ScreenEffect } from '@/lib/types'

interface InputAreaProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  disabled: boolean
  screenEffect: ScreenEffect | null
}

function InputAreaInner({ value, onChange, onSubmit, disabled, screenEffect }: InputAreaProps) {
  const [borderClass, setBorderClass] = useState('border-gray-300')

  // Flash the input border green/red on correct/wrong, then reset.
  useEffect(() => {
    if (!screenEffect) return
    if (screenEffect.type === 'correct') {
      setBorderClass('border-green-400')
      const t = setTimeout(() => setBorderClass('border-gray-300'), 400)
      return () => clearTimeout(t)
    }
    if (screenEffect.type === 'wrong') {
      setBorderClass('border-red-400')
      const t = setTimeout(() => setBorderClass('border-gray-300'), 600)
      return () => clearTimeout(t)
    }
  }, [screenEffect])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit()
      }
    },
    [onSubmit],
  )

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="输入你的猜测..."
        className={`flex-1 border-2 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-purple-500 transition-colors ${borderClass}`}
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled}
        className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 hover:bg-purple-700 transition-colors"
      >
        提交
      </button>
    </div>
  )
}

const InputArea = memo(InputAreaInner)
export default InputArea
