'use client'

import { memo, useState, useCallback } from 'react'
import { getGameHistory, getGameStats, getAchievements, clearAllData } from '@/lib/storage'
import { ALL_ACHIEVEMENTS, getRank, getRankDisplay } from '@/lib/achievements'

/** Format ISO date string to a readable short date. */
function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

/** Map difficulty to Chinese label and color. */
function difficultyLabel(d: string): { text: string; color: string } {
  switch (d) {
    case 'easy': return { text: '简单', color: 'text-green-400' }
    case 'hard': return { text: '困难', color: 'text-red-400' }
    default: return { text: '普通', color: 'text-yellow-300' }
  }
}

function HistoryPanelInner() {
  // Incrementing key to force re-read from localStorage after clear
  const [tick, setTick] = useState(0)

  const history = getGameHistory()
  const stats = getGameStats()
  const achievements = getAchievements()
  const rank = getRank(stats.totalScore)
  const rankDisplay = getRankDisplay(rank)
  const unlockedCount = achievements.filter(a => a.unlocked).length

  const handleClear = useCallback(() => {
    if (!window.confirm('确定要清除所有游戏数据吗？此操作不可撤销。')) return
    clearAllData()
    setTick(t => t + 1)
  }, [])

  return (
    <div className="space-y-6 text-white" key={tick}>
      {/* ─── Stats Summary ─── */}
      <section className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/20">
        <h2 className="text-lg font-bold mb-4">📊 数据统计</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <StatCard label="总场次" value={stats.totalGames} />
          <StatCard label="最高分" value={stats.bestScore} />
          <StatCard label="最高连击" value={stats.bestStreak} />
          <StatCard label="累计答对" value={stats.totalWordsCompleted} />
          <div className="flex flex-col items-center justify-center rounded-xl bg-white/10 p-3 border border-white/10">
            <span className="text-2xl">{rankDisplay.icon}</span>
            <span className="text-sm text-white/60 mt-1">当前段位</span>
            <span className="font-bold" style={{ color: rankDisplay.color }}>{rankDisplay.name}</span>
          </div>
        </div>
      </section>

      {/* ─── Recent History ─── */}
      <section className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/20">
        <h2 className="text-lg font-bold mb-4">🕐 最近游戏记录</h2>
        {history.length === 0 ? (
          <p className="text-white/50 text-sm text-center py-4">暂无游戏记录，快去玩一局吧！</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-white/60 border-b border-white/10">
                  <th className="pb-2 pr-3 font-medium">日期</th>
                  <th className="pb-2 pr-3 font-medium">难度</th>
                  <th className="pb-2 pr-3 font-medium text-right">得分</th>
                  <th className="pb-2 pr-3 font-medium text-right">答对</th>
                  <th className="pb-2 pr-3 font-medium text-right">最高连击</th>
                  <th className="pb-2 pr-3 font-medium text-right">丢命</th>
                  <th className="pb-2 font-medium text-right">成就</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 20).map((game, i) => {
                  const diff = difficultyLabel(game.difficulty)
                  return (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-2 pr-3 whitespace-nowrap">{formatDate(game.date)}</td>
                      <td className={`py-2 pr-3 font-medium ${diff.color}`}>{diff.text}</td>
                      <td className="py-2 pr-3 text-right font-mono">{game.score}</td>
                      <td className="py-2 pr-3 text-right font-mono">{game.wordsCompleted}</td>
                      <td className="py-2 pr-3 text-right font-mono">{game.longestStreak}</td>
                      <td className="py-2 pr-3 text-right font-mono text-red-300">{game.livesLost}</td>
                      <td className="py-2 text-right font-mono text-yellow-300">{game.achievementsUnlocked.length}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ─── Achievements ─── */}
      <section className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/20">
        <h2 className="text-lg font-bold mb-1">🏆 成就</h2>
        <p className="text-sm text-white/50 mb-4">已解锁 {unlockedCount}/{ALL_ACHIEVEMENTS.length} 成就</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {ALL_ACHIEVEMENTS.map((ach) => {
            const progress = achievements.find(a => a.achievementId === ach.id)
            const unlocked = progress?.unlocked ?? false
            return (
              <div
                key={ach.id}
                className={`flex flex-col items-center text-center rounded-xl p-3 border transition-all ${
                  unlocked
                    ? 'bg-green-50/15 border-green-300/40'
                    : 'bg-gray-50/10 border-gray-300/20 opacity-50'
                }`}
              >
                <span className="text-3xl mb-1">{ach.icon}</span>
                <span className="text-sm font-bold">{ach.name}</span>
                <span className="text-xs text-white/50 mt-0.5">{ach.description}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── Clear Data ─── */}
      <div className="flex justify-center">
        <button
          onClick={handleClear}
          className="px-6 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium transition-colors"
        >
          🗑️ 清除所有数据
        </button>
      </div>
    </div>
  )
}

/** Small stat card used in the summary section. */
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white/10 p-3 border border-white/10">
      <span className="text-2xl font-bold font-mono">{value}</span>
      <span className="text-sm text-white/60 mt-1">{label}</span>
    </div>
  )
}

const HistoryPanel = memo(HistoryPanelInner)
export default HistoryPanel
