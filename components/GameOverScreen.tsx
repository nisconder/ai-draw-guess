'use client'

import { memo } from 'react'
import type { PlayerRank, Achievement } from '@/lib/types'
import RankBadge from './RankBadge'

interface GameOverScreenProps {
  score: number
  wordsCompleted: number
  longestStreak: number
  accuracy: number
  livesLost: number
  rank: PlayerRank
  newAchievements: Achievement[]
  onRestart: () => void
}

interface StatItem {
  label: string
  value: string | number
  color: string
}

function GameOverScreenInner({
  score,
  wordsCompleted,
  longestStreak,
  accuracy,
  livesLost,
  rank,
  newAchievements,
  onRestart,
}: GameOverScreenProps) {
  const accuracyPercent = Math.round(accuracy * 100)

  const stats: StatItem[] = [
    { label: '得分', value: score, color: 'text-purple-600' },
    { label: '答对词语', value: wordsCompleted, color: 'text-green-600' },
    { label: '最长连击', value: longestStreak, color: 'text-orange-500' },
    { label: '准确率', value: `${accuracyPercent}%`, color: 'text-blue-600' },
    { label: '损失生命', value: livesLost, color: 'text-red-500' },
  ]

  return (
    <div className="max-w-lg mx-auto text-center space-y-6 py-8">
      {/* Title */}
      <h1 className="text-5xl font-black text-gray-800 animate-title-explode">
        GAME OVER
      </h1>

      {/* Rank badge */}
      <div className="flex justify-center">
        <RankBadge rank={rank} size="lg" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/80 rounded-xl p-4 border border-gray-200"
          >
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* New achievements */}
      {newAchievements.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-700">{'\uD83C\uDFC6'} 新成就解锁</h2>
          {newAchievements.map((ach) => (
            <div
              key={ach.id}
              className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-3 border border-yellow-200"
            >
              <span className="text-3xl">{ach.icon}</span>
              <div className="text-left">
                <div className="font-bold text-gray-800">{ach.name}</div>
                <div className="text-sm text-gray-500">{ach.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Restart button */}
      <button
        type="button"
        onClick={onRestart}
        className="bg-purple-600 text-white rounded-full py-3 px-8 font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg"
      >
        再来一局
      </button>
    </div>
  )
}

const GameOverScreen = memo(GameOverScreenInner)
export default GameOverScreen
