import type { GameHistory, GameStats, AchievementProgress } from './types'
import { ALL_ACHIEVEMENTS } from './achievements'

const HISTORY_KEY = 'survival-rush-history'
const ACHIEVEMENTS_KEY = 'survival-rush-achievements'
const MAX_HISTORY = 100

/** Stored achievements map: achievementId -> unlockedAt ISO timestamp. */
type StoredAchievements = Record<string, string>

/** Safely read a localStorage key; returns null if storage is unavailable. */
function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

/** Safely write a localStorage key; silently fails if storage is unavailable. */
function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // private browsing / quota exceeded — ignore
  }
}

/** Safely remove a localStorage key; silently fails if storage is unavailable. */
function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

/** Prepend a game result to history, capping at MAX_HISTORY entries. */
export function saveGameResult(result: Omit<GameHistory, 'date'>): void {
  const history = getGameHistory()
  const entry: GameHistory = {
    ...result,
    date: new Date().toISOString(),
  }
  const updated = [entry, ...history].slice(0, MAX_HISTORY)
  safeSetItem(HISTORY_KEY, JSON.stringify(updated))
}

/** Read full game history; returns [] on missing/corrupt data. */
export function getGameHistory(): GameHistory[] {
  const raw = safeGetItem(HISTORY_KEY)
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as GameHistory[]
  } catch {
    return []
  }
}

/** Aggregate all history entries into summary stats. */
export function getGameStats(): GameStats {
  const history = getGameHistory()

  if (history.length === 0) {
    return {
      totalGames: 0,
      totalScore: 0,
      totalWordsCompleted: 0,
      totalLivesLost: 0,
      averageScore: 0,
      bestScore: 0,
      bestStreak: 0,
      totalAchievements: 0,
    }
  }

  let totalScore = 0
  let totalWordsCompleted = 0
  let totalLivesLost = 0
  let bestScore = 0
  let bestStreak = 0
  let totalAchievements = 0

  for (const h of history) {
    totalScore += h.score
    totalWordsCompleted += h.wordsCompleted
    totalLivesLost += h.livesLost
    if (h.score > bestScore) bestScore = h.score
    if (h.longestStreak > bestStreak) bestStreak = h.longestStreak
    totalAchievements += h.achievementsUnlocked.length
  }

  return {
    totalGames: history.length,
    totalScore,
    totalWordsCompleted,
    totalLivesLost,
    averageScore: totalScore / history.length,
    bestScore,
    bestStreak,
    totalAchievements,
  }
}

/** Read the raw stored achievements map; returns {} on missing/corrupt data. */
function getStoredAchievements(): StoredAchievements {
  const raw = safeGetItem(ACHIEVEMENTS_KEY)
  if (!raw) return {}
  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {}
    }
    return parsed as StoredAchievements
  } catch {
    return {}
  }
}

/** Persist the raw achievements map. */
function saveStoredAchievements(data: StoredAchievements): void {
  safeSetItem(ACHIEVEMENTS_KEY, JSON.stringify(data))
}

/** Mark an achievement as unlocked (no-op if already unlocked). */
export function saveAchievement(achievementId: string): void {
  const stored = getStoredAchievements()
  if (achievementId in stored) return
  stored[achievementId] = new Date().toISOString()
  saveStoredAchievements(stored)
}

/** Return progress state for every defined achievement (locked and unlocked). */
export function getAchievements(): AchievementProgress[] {
  const stored = getStoredAchievements()
  return ALL_ACHIEVEMENTS.map(a => {
    const isUnlocked = a.id in stored
    return {
      achievementId: a.id,
      unlocked: isUnlocked,
      unlockedAt: isUnlocked ? stored[a.id] : undefined,
    }
  })
}

/** Return only the IDs of unlocked achievements. */
export function getUnlockedAchievementIds(): string[] {
  const stored = getStoredAchievements()
  return Object.keys(stored)
}

/** Remove all survival-rush data from localStorage. */
export function clearAllData(): void {
  safeRemoveItem(HISTORY_KEY)
  safeRemoveItem(ACHIEVEMENTS_KEY)
}
