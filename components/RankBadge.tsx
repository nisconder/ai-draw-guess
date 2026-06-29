import { memo } from 'react'
import type { PlayerRank } from '@/lib/types'

interface RankBadgeProps {
  rank: PlayerRank
  size?: 'sm' | 'md' | 'lg'
}

interface RankInfo {
  icon: string
  name: string
  textClass: string
  borderClass: string
}

// Fixed literal class strings so Tailwind JIT detects every arbitrary color.
const RANK_INFO: Record<PlayerRank, RankInfo> = {
  bronze: { icon: '\uD83E\uDD89', name: '青铜', textClass: 'text-[#CD7F32]', borderClass: 'border-[#CD7F32]' },
  silver: { icon: '\uD83E\uDD48', name: '白银', textClass: 'text-[#C0C0C0]', borderClass: 'border-[#C0C0C0]' },
  gold: { icon: '\uD83E\uDD47', name: '黄金', textClass: 'text-[#FFD700]', borderClass: 'border-[#FFD700]' },
  diamond: { icon: '\uD83D\uDC8E', name: '钻石', textClass: 'text-[#B9F2FF]', borderClass: 'border-[#B9F2FF]' },
  master: { icon: '\uD83C\uDFC6', name: '大师', textClass: 'text-[#FF6B6B]', borderClass: 'border-[#FF6B6B]' },
  legend: { icon: '\uD83D\uDC51', name: '传说', textClass: 'text-[#FF00FF]', borderClass: 'border-[#FF00FF]' },
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-sm px-2 py-1 gap-1',
  md: 'text-base px-3 py-1.5 gap-2',
  lg: 'text-lg px-4 py-2 gap-2',
}

const ICON_SIZES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
}

function RankBadgeInner({ rank, size = 'md' }: RankBadgeProps) {
  const info = RANK_INFO[rank]

  return (
    <div
      className={`inline-flex items-center ${SIZE_CLASSES[size]} rounded-full border-2 ${info.borderClass} bg-white/90`}
    >
      <span className={ICON_SIZES[size]}>{info.icon}</span>
      <span className={`font-bold ${info.textClass}`}>{info.name}</span>
    </div>
  )
}

const RankBadge = memo(RankBadgeInner)
export default RankBadge
