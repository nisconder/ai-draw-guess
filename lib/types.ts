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
export type GamePhase = 'idle' | 'playing' | 'round_active' | 'showing_result' | 'game_over'

// Game modes
export type GameMode = 'classic' | 'practice' | 'timed' | 'hard'

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

// Game settings
export interface GameSettings {
  mode: GameMode
  difficulty: Difficulty | 'all'
  provider: ProviderType
  totalRounds: number
  roundDuration: number
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
  round: number
  totalRounds: number
  timeLeft: number
  totalTime: number
  showResult: boolean
  resultType: RoundResult
  streak: number
  roundScores: number[]
  mode: GameMode
  provider: ProviderType
}

// Game history entry
export interface GameHistory {
  date: string
  mode: GameMode
  score: number
  totalRounds: number
  correctCount: number
  accuracy: number
  averageTime: number
  bestStreak: number
}

// Aggregate game stats
export interface GameStats {
  totalGames: number
  totalScore: number
  averageScore: number
  winRate: number
  bestStreak: number
  totalCorrect: number
  totalRounds: number
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
