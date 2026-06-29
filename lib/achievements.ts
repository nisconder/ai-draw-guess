import type { Achievement, PlayerRank } from './types'

/** All achievement definitions for survival rush mode. */
export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-game',
    name: '初出茅庐',
    description: '完成第一局游戏',
    icon: '🔰',
    condition: '完成第一局游戏',
  },
  {
    id: 'combo-3',
    name: '三连击',
    description: '单局达到3连击',
    icon: '🔥',
    condition: '单局达到3连击',
  },
  {
    id: 'combo-5',
    name: '五连击',
    description: '单局达到5连击',
    icon: '🔥🔥',
    condition: '单局达到5连击',
  },
  {
    id: 'combo-10',
    name: '十连击',
    description: '单局达到10连击',
    icon: '🔥🔥🔥',
    condition: '单局达到10连击',
  },
  {
    id: 'speed-demon',
    name: '秒答',
    description: '3秒内答对',
    icon: '⚡',
    condition: '3秒内答对',
  },
  {
    id: 'comeback',
    name: '起死回生',
    description: '从1❤️恢复到3❤️+',
    icon: '💪',
    condition: '从1❤️恢复到3❤️+',
  },
  {
    id: 'no-damage',
    name: '无伤',
    description: '整局不丢命（至少10词）',
    icon: '🛡️',
    condition: '整局不丢命（至少10词）',
  },
  {
    id: 'hundred-words',
    name: '百词斩',
    description: '累计答对100词',
    icon: '🏅',
    condition: '累计答对100词',
  },
  {
    id: 'accuracy-master',
    name: '精准',
    description: '单局准确率≥90%（至少10词）',
    icon: '🎯',
    condition: '单局准确率≥90%（至少10词）',
  },
  {
    id: 'legend-rank',
    name: '登峰造极',
    description: '达到传说段位',
    icon: '👑',
    condition: '达到传说段位',
  },
]

/** Per-game result used by checkAchievements to evaluate unlocks. */
export interface GameResultInput {
  wordsCompleted: number
  longestStreak: number
  livesLost: number
  /** Accuracy as a 0-1 ratio (0.9 = 90%). */
  accuracy: number
  /** Fastest correct-answer time in seconds this game (for speed-demon). */
  fastestAnswerSeconds?: number
  /** Lowest lives count reached this game (for comeback). */
  minLivesReached?: number
  /** Highest lives count reached after a recovery this game (for comeback). */
  maxLivesAfterRecovery?: number
}

/** Cumulative stats across all prior games used by checkAchievements. */
export interface CumulativeInput {
  totalWordsCompleted: number
  /** Cumulative total score across all games (for legend-rank). */
  totalScore?: number
}

/**
 * Evaluate which achievement conditions are satisfied by a game result.
 * Returns the IDs of all achievements whose conditions are met — the caller
 * is responsible for filtering out already-unlocked IDs.
 */
export function checkAchievements(
  gameResult: GameResultInput,
  cumulative: CumulativeInput
): string[] {
  const unlocked: string[] = []

  // first-game: any completed game satisfies this
  unlocked.push('first-game')

  if (gameResult.longestStreak >= 3) unlocked.push('combo-3')
  if (gameResult.longestStreak >= 5) unlocked.push('combo-5')
  if (gameResult.longestStreak >= 10) unlocked.push('combo-10')

  if (
    gameResult.fastestAnswerSeconds !== undefined &&
    gameResult.fastestAnswerSeconds <= 3
  ) {
    unlocked.push('speed-demon')
  }

  if (
    gameResult.minLivesReached !== undefined &&
    gameResult.minLivesReached <= 1 &&
    gameResult.maxLivesAfterRecovery !== undefined &&
    gameResult.maxLivesAfterRecovery >= 3
  ) {
    unlocked.push('comeback')
  }

  if (gameResult.livesLost === 0 && gameResult.wordsCompleted >= 10) {
    unlocked.push('no-damage')
  }

  if (cumulative.totalWordsCompleted + gameResult.wordsCompleted >= 100) {
    unlocked.push('hundred-words')
  }

  if (gameResult.accuracy >= 0.9 && gameResult.wordsCompleted >= 10) {
    unlocked.push('accuracy-master')
  }

  if (
    cumulative.totalScore !== undefined &&
    getRank(cumulative.totalScore) === 'legend'
  ) {
    unlocked.push('legend-rank')
  }

  return unlocked
}

/** Score thresholds for each rank tier. */
const RANK_THRESHOLDS: ReadonlyArray<[PlayerRank, number]> = [
  ['legend', 10000],
  ['master', 5000],
  ['diamond', 3000],
  ['gold', 1500],
  ['silver', 500],
  ['bronze', 0],
]

/** Map a cumulative total score to its player rank tier. */
export function getRank(totalScore: number): PlayerRank {
  for (const [rank, threshold] of RANK_THRESHOLDS) {
    if (totalScore >= threshold) return rank
  }
  return 'bronze'
}

/** Display metadata (icon, color, localized name) for each rank tier. */
const RANK_DISPLAY: Record<PlayerRank, { icon: string, color: string, name: string }> = {
  bronze: { icon: '🥉', color: '#CD7F32', name: '青铜' },
  silver: { icon: '🥈', color: '#C0C0C0', name: '白银' },
  gold: { icon: '🥇', color: '#FFD700', name: '黄金' },
  diamond: { icon: '💎', color: '#B9F2FF', name: '钻石' },
  master: { icon: '🏆', color: '#FF6B6B', name: '大师' },
  legend: { icon: '👑', color: '#FF00FF', name: '传说' },
}

/** Return display metadata (icon, color, name) for a given rank. */
export function getRankDisplay(rank: PlayerRank): { icon: string, color: string, name: string } {
  return RANK_DISPLAY[rank]
}
