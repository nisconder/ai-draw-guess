'use client'

import { memo, useEffect } from 'react'
import type { Achievement } from '@/lib/types'

interface AchievementBannerProps {
  achievement: Achievement | null
  visible: boolean
  onDismiss: () => void
}

function AchievementBannerInner({ achievement, visible, onDismiss }: AchievementBannerProps) {
  // Auto-dismiss after 2.5s when visible.
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onDismiss, 2500)
    return () => clearTimeout(timer)
  }, [visible, onDismiss])

  if (!achievement) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg transition-transform duration-300 ${
        visible ? 'animate-banner-slide-in' : '-translate-y-full'
      }`}
      role="alert"
    >
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
        <span className="text-4xl">{achievement.icon}</span>
        <div className="flex-1 text-left">
          <div className="font-bold text-lg">{'\uD83C\uDFC6'} {achievement.name}</div>
          <div className="text-sm text-white/90">{achievement.description}</div>
        </div>
      </div>
    </div>
  )
}

const AchievementBanner = memo(AchievementBannerInner)
export default AchievementBanner
