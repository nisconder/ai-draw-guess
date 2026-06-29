// Difficulty levels for words
export type Difficulty = 'easy' | 'normal' | 'hard'

// A word item in the game
export interface WordItem {
  word: string
  hint: string
  category: string
  difficulty: Difficulty
}

// Game phases
export type GamePhase = 'idle' | 'playing' | 'showing_result' | 'game_over'

// Game modes
export type GameMode = 'survival'

// Round result
export type RoundResult = 'correct' | 'wrong' | 'timeout' | null

// AI provider type
export type ProviderType = 'zhipu' | 'deepseek' | 'qwen' | 'kimi' | 'openai'

// Provider configuration
export interface ProviderConfig {
  name: string
  displayName: string
  baseUrl: string
  model: string
  description: string
}

// Screen effect types for survival rush feedback
export type ScreenEffectType = 'correct' | 'wrong' | 'timeout' | 'combo' | 'heart-lose' | 'heart-gain' | 'achievement' | 'game-over'

// A transient screen effect triggered by gameplay events
export interface ScreenEffect {
  type: ScreenEffectType
  intensity: number // 0-10
  timestamp: number
}

// An achievement definition
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string // emoji or text icon
  condition: string // human-readable condition description
  unlockedAt?: string // ISO timestamp
}

// Progress tracking for a single achievement
export interface AchievementProgress {
  achievementId: string
  unlocked: boolean
  unlockedAt?: string
}

// Player rank tiers based on performance
export type PlayerRank = 'bronze' | 'silver' | 'gold' | 'diamond' | 'master' | 'legend'

// Game settings (survival mode)
export interface GameSettings {
  difficulty: Difficulty
  wordTimeLimit: number
  initialLives: number
  comboHealThreshold: number
  provider: ProviderType
  allowHints: boolean
  showCategory: boolean
}

// Game state (read-only, managed by hook)
export interface GameState {
  phase: GamePhase
  currentWord: string
  currentHint: string
  description: string | null
  isGenerating: boolean
  score: number
  lives: number
  maxLives: number
  combo: number
  wordsCompleted: number
  longestStreak: number
  timeLeft: number
  wordTimeLimit: number
  startTime: number
  wordStartTime: number
  showResult: boolean
  resultType: RoundResult
  screenEffect: ScreenEffect | null
  unlockedAchievements: string[]
  mode: GameMode
  provider: ProviderType
}

// Game history entry (survival mode)
export interface GameHistory {
  date: string
  mode: GameMode
  difficulty: Difficulty
  score: number
  wordsCompleted: number
  livesLost: number
  longestStreak: number
  accuracy: number
  achievementsUnlocked: string[]
}

// Aggregate game stats (survival mode)
export interface GameStats {
  totalGames: number
  totalScore: number
  totalWordsCompleted: number
  totalLivesLost: number
  averageScore: number
  bestScore: number
  bestStreak: number
  totalAchievements: number
}

// API request/response types
export interface GenerateRequest {
  word: string
  provider?: ProviderType
}

export interface GenerateResponse {
  description: string
}

export interface ErrorResponse {
  error: string
}
