import type { Difficulty } from './types'

/** Per-difficulty configuration for survival mode. */
export interface DifficultyConfig {
  difficulty: Difficulty
  wordTimeLimit: number
  lives: number
  comboHealThreshold: number
}

/** Preset shape: config + display metadata. */
export type DifficultyPreset = DifficultyConfig & {
  label: string
  description: string
}

/** Named presets keyed by Difficulty. */
export const PRESETS: Record<Difficulty, DifficultyPreset> = {
  easy: {
    difficulty: 'easy',
    wordTimeLimit: 60,
    lives: 5,
    comboHealThreshold: 5,
    label: '休闲',
    description: '宽松计时，轻松上手',
  },
  normal: {
    difficulty: 'normal',
    wordTimeLimit: 45,
    lives: 3,
    comboHealThreshold: 4,
    label: '普通',
    description: '标准难度，平衡体验',
  },
  hard: {
    difficulty: 'hard',
    wordTimeLimit: 30,
    lives: 1,
    comboHealThreshold: 3,
    label: '挑战',
    description: '紧张计时，高难度挑战',
  },
}

/** Return the preset for a given Difficulty level. */
export function getDifficultyConfig(d: Difficulty): DifficultyPreset {
  return PRESETS[d]
}
