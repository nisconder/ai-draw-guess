'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import type { Difficulty, PlayerRank } from '@/lib/types'
import RankBadge from './RankBadge'

interface StartScreenProps {
  bestScore: number
  rank: PlayerRank
  achievementsCount: number
  onStart: (difficulty: Difficulty) => void
  apiKeys: Record<string, string>
  selectedProvider: string
  onProviderChange: (p: string) => void
  onApiKeyChange: (provider: string, key: string) => void
}

interface DiffOption {
  difficulty: Difficulty
  label: string
  desc: string
  cardClass: string
}

interface ProviderOption {
  value: string
  label: string
}

const DIFF_OPTIONS: DiffOption[] = [
  {
    difficulty: 'easy',
    label: '休闲',
    desc: '60秒/词 · 5条命 · 轻松上手',
    cardClass: 'bg-green-50 border-green-200',
  },
  {
    difficulty: 'normal',
    label: '普通',
    desc: '45秒/词 · 3条命 · 平衡体验',
    cardClass: 'bg-yellow-50 border-yellow-200',
  },
  {
    difficulty: 'hard',
    label: '挑战',
    desc: '30秒/词 · 1条命 · 高难挑战',
    cardClass: 'bg-red-50 border-red-200',
  },
]

const PROVIDER_OPTIONS: ProviderOption[] = [
  { value: 'zhipu', label: '智谱AI' },
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'qwen', label: '通义千问' },
  { value: 'kimi', label: '月之暗面' },
  { value: 'openai', label: 'OpenAI' },
]

function StartScreenInner({
  bestScore,
  rank,
  achievementsCount,
  onStart,
  apiKeys,
  selectedProvider,
  onProviderChange,
  onApiKeyChange,
}: StartScreenProps) {
  const [configOpen, setConfigOpen] = useState(true)
  // Local mirror of the key input so typing is responsive; committed to parent on blur.
  const storedKey = apiKeys[selectedProvider] ?? ''
  const [keyInput, setKeyInput] = useState(storedKey)

  // Sync local input when the selected provider or its stored key changes
  // (e.g. switching provider, or initial load from localStorage).
  useEffect(() => {
    setKeyInput(apiKeys[selectedProvider] ?? '')
  }, [selectedProvider, apiKeys])

  const handleStart = useCallback(
    (difficulty: Difficulty) => {
      onStart(difficulty)
    },
    [onStart],
  )

  const handleProviderSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onProviderChange(e.target.value)
    },
    [onProviderChange],
  )

  const handleKeyBlur = useCallback(() => {
    onApiKeyChange(selectedProvider, keyInput)
  }, [onApiKeyChange, selectedProvider, keyInput])

  const isConfigured = storedKey.trim().length > 0

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-8">
      {/* API 配置 (collapsible) */}
      <div className="text-left rounded-2xl border-2 border-purple-200 bg-purple-50/60 overflow-hidden">
        <button
          type="button"
          onClick={() => setConfigOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-100/60 transition-colors cursor-pointer"
          aria-expanded={configOpen}
        >
          <span>{'\u2699\uFE0F'} API 配置</span>
          <span className="flex items-center gap-2">
            {isConfigured ? (
              <span className="text-green-600 text-xs">{'\u2713'} 已配置</span>
            ) : (
              <span className="text-gray-400 text-xs">未配置</span>
            )}
            <span className="text-purple-400 text-xs">{configOpen ? '▾' : '▸'}</span>
          </span>
        </button>

        {configOpen && (
          <div className="px-4 pb-4 space-y-3">
            {/* Provider dropdown */}
            <div className="space-y-1">
              <label
                htmlFor="provider-select"
                className="block text-xs font-medium text-gray-600 text-left"
              >
                AI 提供商
              </label>
              <select
                id="provider-select"
                value={selectedProvider}
                onChange={handleProviderSelect}
                className="w-full rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              >
                {PROVIDER_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* API key input */}
            <div className="space-y-1">
              <label
                htmlFor="api-key-input"
                className="block text-xs font-medium text-gray-600 text-left"
              >
                API 密钥
              </label>
              <input
                id="api-key-input"
                type="password"
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                onBlur={handleKeyBlur}
                placeholder="在此粘贴 API 密钥"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Privacy notice */}
            <p className="text-xs text-gray-400 text-left">
              密钥仅保存在浏览器本地，不会上传
            </p>
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
        {'\uD83D\uDD25'} 生存竞速
      </h1>

      {/* Rank badge */}
      <div className="flex justify-center">
        <RankBadge rank={rank} size="md" />
      </div>

      {/* Stats row */}
      <div className="flex justify-center gap-8">
        <div>
          <div className="text-2xl font-bold text-purple-600">{bestScore}</div>
          <div className="text-sm text-gray-500">最高分</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-yellow-500">{achievementsCount}</div>
          <div className="text-sm text-gray-500">成就解锁</div>
        </div>
      </div>

      {/* Difficulty cards */}
      <div className="flex flex-row gap-4 justify-center">
        {DIFF_OPTIONS.map((opt) => (
          <button
            key={opt.difficulty}
            type="button"
            onClick={() => handleStart(opt.difficulty)}
            className={`flex-1 max-w-xs p-6 rounded-2xl border-2 ${opt.cardClass} hover:scale-105 hover:shadow-lg transition-all cursor-pointer text-center`}
          >
            <div className="text-2xl font-bold text-gray-800 mb-2">{opt.label}</div>
            <div className="text-sm text-gray-600">{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

const StartScreen = memo(StartScreenInner)
export default StartScreen
