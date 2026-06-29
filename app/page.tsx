'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { ChangeEvent } from 'react'
import type { WordItem, GameState, GameStats, Difficulty, Achievement, RoundResult, ProviderType } from '@/lib/types'
import { getSessionWords } from '@/lib/words'
import { saveGameResult, getGameStats, getAchievements, getUnlockedAchievementIds, saveAchievement } from '@/lib/storage'
import { ALL_ACHIEVEMENTS, checkAchievements, getRank } from '@/lib/achievements'
import { getDifficultyConfig } from '@/lib/game-difficulty'
import ErrorBoundary from '@/components/ErrorBoundary'
import ScreenOverlay from '@/components/ScreenOverlay'
import ScreenShake from '@/components/ScreenShake'
import HeartsDisplay from '@/components/HeartsDisplay'
import ComboIndicator from '@/components/ComboIndicator'
import TimerBar from '@/components/TimerBar'
import WordCard from '@/components/WordCard'
import InputArea from '@/components/InputArea'
import AnswerFeedback from '@/components/AnswerFeedback'
import GameOverScreen from '@/components/GameOverScreen'
import StartScreen from '@/components/StartScreen'
import AchievementBanner from '@/components/AchievementBanner'
import RankBadge from '@/components/RankBadge'
import HistoryPanel from '@/components/HistoryPanel'

export default function Home() {
  const wordTimeLimit = 60
  const initialLives = 3
  const autoNextDelay = 1800
  const maxRetryCount = 1
  const survivalWordPool = 50

  const API_KEYS_STORAGE_KEY = 'survival-rush-api-keys'

  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('zhipu')
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({})

  const [gameState, setGameState] = useState<GameState>({
    phase: 'idle',
    currentWord: '',
    currentHint: '',
    description: null,
    isGenerating: false,
    score: 0,
    lives: initialLives,
    maxLives: initialLives,
    combo: 0,
    wordsCompleted: 0,
    longestStreak: 0,
    timeLeft: wordTimeLimit,
    wordTimeLimit,
    startTime: 0,
    wordStartTime: 0,
    showResult: false,
    resultType: null,
    screenEffect: null,
    unlockedAchievements: [],
    mode: 'survival',
    provider: selectedProvider,
  })

  const [guessInput, setGuessInput] = useState('')
  const [sessionWords, setSessionWords] = useState<WordItem[]>([])
  const [stats, setStats] = useState<GameStats | null>(null)
  const [achievementsCount, setAchievementsCount] = useState(0)
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([])
  const [bannerQueue, setBannerQueue] = useState<Achievement[]>([])
  const [bannerVisible, setBannerVisible] = useState(false)

  const requestIdRef = useRef(0)
  const nextRoundTimerRef = useRef<NodeJS.Timeout | null>(null)
  const wordIndexRef = useRef(0)
  const wordTimeLimitRef = useRef(wordTimeLimit)
  const difficultyRef = useRef<Difficulty>('normal')

  const clearNextRoundTimer = () => {
    if (nextRoundTimerRef.current) {
      clearTimeout(nextRoundTimerRef.current)
      nextRoundTimerRef.current = null
    }
  }

  const generateDescription = async (word: string) => {
    const response = await fetch('/api/generate-description', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word,
        provider: selectedProvider,
        apiKey: apiKeys[selectedProvider] || '',
      }),
    })

    const data = await response.json()

    if (!response.ok || data.error) {
      throw new Error(data.error || '描述生成失败')
    }

    return data.description as string
  }

  const loadRound = async (words: WordItem[], roundIndex: number, resetScore = false) => {
    const selectedWord = words[roundIndex]
    if (!selectedWord) {
      return
    }

    clearNextRoundTimer()
    const requestId = ++requestIdRef.current
    setGuessInput('')
    wordIndexRef.current = roundIndex

    setGameState(prev => ({
      ...prev,
      phase: 'playing',
      currentWord: selectedWord.word,
      currentHint: selectedWord.hint,
      description: null,
      isGenerating: true,
      score: resetScore ? 0 : prev.score,
      timeLeft: wordTimeLimitRef.current,
      wordStartTime: Date.now(),
      showResult: false,
      resultType: null,
    }))

    let lastError: unknown = null

    for (let attempt = 0; attempt <= maxRetryCount; attempt += 1) {
      try {
        const description = await generateDescription(selectedWord.word)
        if (requestId !== requestIdRef.current) {
          return
        }

        setGameState(prev => ({
          ...prev,
          description,
          isGenerating: false,
        }))
        return
      } catch (error) {
        lastError = error
      }
    }

    if (requestId !== requestIdRef.current) {
      return
    }

    const message = lastError instanceof Error ? lastError.message : '描述生成失败，请稍后重试'
    alert(`描述生成失败，已自动重试1次：${message}`)
    setGameState(prev => ({ ...prev, isGenerating: false, phase: 'idle' }))
  }

  const finishCurrentRound = (resultType: Exclude<RoundResult, null>) => {
    if (gameState.showResult) {
      return
    }

    const isCorrect = resultType === 'correct'
    const now = Date.now()
    const newCombo = isCorrect ? gameState.combo + 1 : 0
    const newLives = isCorrect ? gameState.lives : Math.max(0, gameState.lives - 1)
    const newWordsCompleted = isCorrect ? gameState.wordsCompleted + 1 : gameState.wordsCompleted
    const newLongestStreak = Math.max(gameState.longestStreak, newCombo)
    const newScore = isCorrect ? gameState.score + 10 : gameState.score
    const effectType = isCorrect ? 'correct' : resultType === 'timeout' ? 'timeout' : 'wrong'
    const isGameOver = newLives <= 0
    const hasMoreWords = wordIndexRef.current + 1 < sessionWords.length
    const shouldEndGame = isGameOver || !hasMoreWords

    let unlockedAchs: Achievement[] = []

    if (shouldEndGame) {
      const livesLost = gameState.maxLives - newLives
      const accuracy = newWordsCompleted > 0 ? (newWordsCompleted - livesLost) / newWordsCompleted : 0

      const statsBefore = getGameStats()
      const cumulative = {
        totalWordsCompleted: statsBefore.totalWordsCompleted,
        totalScore: statsBefore.totalScore,
      }

      const unlockedIds = checkAchievements(
        {
          wordsCompleted: newWordsCompleted,
          longestStreak: newLongestStreak,
          livesLost,
          accuracy,
        },
        cumulative,
      )

      const alreadyUnlocked = getUnlockedAchievementIds()
      const newIds = unlockedIds.filter(id => !alreadyUnlocked.includes(id))
      newIds.forEach(id => saveAchievement(id))

      unlockedAchs = newIds
        .map(id => ALL_ACHIEVEMENTS.find(a => a.id === id))
        .filter((a): a is Achievement => a !== undefined)

      saveGameResult({
        mode: 'survival',
        difficulty: difficultyRef.current,
        score: newScore,
        wordsCompleted: newWordsCompleted,
        livesLost,
        longestStreak: newLongestStreak,
        accuracy,
        achievementsUnlocked: newIds,
      })

      if (unlockedAchs.length > 0) {
        setBannerQueue(unlockedAchs)
      }

      setStats(getGameStats())
      setAchievementsCount(getAchievements().filter(a => a.unlocked).length)
      setNewAchievements(unlockedAchs)
    }

    setGameState(prev => ({
      ...prev,
      showResult: true,
      resultType,
      score: newScore,
      combo: newCombo,
      lives: newLives,
      wordsCompleted: newWordsCompleted,
      longestStreak: newLongestStreak,
      screenEffect: { type: effectType, intensity: 5, timestamp: now },
      phase: shouldEndGame ? 'game_over' : prev.phase,
    }))

    if (!shouldEndGame) {
      const nextIndex = wordIndexRef.current + 1
      nextRoundTimerRef.current = setTimeout(() => {
        void loadRound(sessionWords, nextIndex)
      }, autoNextDelay)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState.phase === 'playing' && gameState.timeLeft > 0 && !gameState.showResult) {
      timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }))
      }, 1000)
    } else if (gameState.timeLeft === 0 && !gameState.showResult && gameState.phase === 'playing') {
      finishCurrentRound('timeout')
    }
    return () => clearTimeout(timer)
  }, [gameState.phase, gameState.timeLeft, gameState.showResult])

  useEffect(() => {
    return () => {
      clearNextRoundTimer()
      requestIdRef.current += 1
    }
  }, [])

  // Load API keys from localStorage on mount (client-side only).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(API_KEYS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, string>
        setApiKeys(parsed)
      }
    } catch {
      // Ignore malformed/missing storage — env-var fallback still works.
    }
  }, [])

  useEffect(() => {
    setStats(getGameStats())
    setAchievementsCount(getAchievements().filter(a => a.unlocked).length)
  }, [gameState.phase])

  useEffect(() => {
    if (bannerQueue.length > 0 && !bannerVisible) {
      setBannerVisible(true)
    }
  }, [bannerQueue, bannerVisible])

  const startGame = async (difficulty: Difficulty) => {
    const config = getDifficultyConfig(difficulty)
    const words = getSessionWords('survival', difficulty, survivalWordPool)
    if (words.length === 0) {
      alert('词库为空，无法开始游戏')
      return
    }

    difficultyRef.current = difficulty
    wordTimeLimitRef.current = config.wordTimeLimit
    setSessionWords(words)
    wordIndexRef.current = 0
    setNewAchievements([])
    setBannerQueue([])
    setBannerVisible(false)
    setGameState(prev => ({
      ...prev,
      score: 0,
      lives: config.lives,
      maxLives: config.lives,
      combo: 0,
      wordsCompleted: 0,
      longestStreak: 0,
      wordTimeLimit: config.wordTimeLimit,
      timeLeft: config.wordTimeLimit,
      unlockedAchievements: [],
      provider: selectedProvider,
    }))
    await loadRound(words, 0, true)
  }

  const submitGuess = () => {
    if (!guessInput.trim() || gameState.showResult || gameState.isGenerating) {
      return
    }

    const isCorrect = guessInput.trim().toLowerCase() === gameState.currentWord.toLowerCase()

    finishCurrentRound(isCorrect ? 'correct' : 'wrong')
  }

  const resetGame = () => {
    clearNextRoundTimer()
    requestIdRef.current += 1
    wordIndexRef.current = 0
    wordTimeLimitRef.current = wordTimeLimit
    difficultyRef.current = 'normal'
    setGameState({
      phase: 'idle',
      currentWord: '',
      currentHint: '',
      description: null,
      isGenerating: false,
      score: 0,
      lives: initialLives,
      maxLives: initialLives,
      combo: 0,
      wordsCompleted: 0,
      longestStreak: 0,
      timeLeft: wordTimeLimit,
      wordTimeLimit,
      startTime: 0,
      wordStartTime: 0,
      showResult: false,
      resultType: null,
      screenEffect: null,
      unlockedAchievements: [],
      mode: 'survival',
      provider: selectedProvider,
    })
    setGuessInput('')
    setSessionWords([])
    setNewAchievements([])
    setBannerQueue([])
    setBannerVisible(false)
  }

  const handleGuessChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setGuessInput(e.target.value)
  }, [])

  const handleBannerDismiss = useCallback(() => {
    setBannerVisible(false)
    setBannerQueue(q => q.slice(1))
  }, [])

  const handleProviderChange = useCallback((p: string) => {
    setSelectedProvider(p as ProviderType)
  }, [])

  const handleApiKeyChange = useCallback((provider: string, key: string) => {
    setApiKeys(prev => {
      const next = { ...prev, [provider]: key }
      try {
        localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Storage may be unavailable (private mode); in-memory key still works for the session.
      }
      return next
    })
  }, [])

  const livesLost = gameState.maxLives - gameState.lives
  const accuracy = gameState.wordsCompleted > 0
    ? (gameState.wordsCompleted - livesLost) / gameState.wordsCompleted
    : 0
  const currentRank = getRank(stats?.totalScore ?? 0)
  const currentBanner = bannerQueue[0] ?? null

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
        <ScreenOverlay effect={gameState.screenEffect} />
        <AchievementBanner
          achievement={currentBanner}
          visible={bannerVisible}
          onDismiss={handleBannerDismiss}
        />

        <div className="max-w-4xl w-full mx-auto space-y-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              {'\uD83D\uDCDD'} AI文字描述猜词
            </h1>

            {gameState.phase === 'idle' && (
              <StartScreen
                bestScore={stats?.bestScore ?? 0}
                rank={currentRank}
                achievementsCount={achievementsCount}
                onStart={startGame}
                apiKeys={apiKeys}
                selectedProvider={selectedProvider}
                onProviderChange={handleProviderChange}
                onApiKeyChange={handleApiKeyChange}
              />
            )}

            {(gameState.phase === 'playing' || gameState.phase === 'showing_result') && (
              <ScreenShake intensity={gameState.screenEffect?.intensity ?? 0}>
                <div className="relative space-y-4">
                  <div className="flex justify-between items-center gap-4 flex-wrap">
                    <div className="text-lg">
                      <span className="font-semibold text-gray-700">得分: </span>
                      <span className="font-bold text-purple-600">{gameState.score}</span>
                    </div>
                    <HeartsDisplay
                      lives={gameState.lives}
                      maxLives={gameState.maxLives}
                      screenEffect={gameState.screenEffect}
                    />
                    <ComboIndicator
                      combo={gameState.combo}
                      screenEffect={gameState.screenEffect}
                    />
                  </div>

                  <TimerBar
                    timeLeft={gameState.timeLeft}
                    totalTime={gameState.wordTimeLimit}
                    screenEffect={gameState.screenEffect}
                  />

                  <WordCard
                    description={gameState.description}
                    hint={gameState.currentHint}
                    isGenerating={gameState.isGenerating}
                    screenEffect={gameState.screenEffect}
                  />

                  <InputArea
                    value={guessInput}
                    onChange={handleGuessChange}
                    onSubmit={submitGuess}
                    disabled={gameState.showResult || gameState.isGenerating}
                    screenEffect={gameState.screenEffect}
                  />

                  <AnswerFeedback
                    resultType={gameState.resultType}
                    correctWord={gameState.currentWord}
                    screenEffect={gameState.screenEffect}
                  />
                </div>
              </ScreenShake>
            )}

            {gameState.phase === 'game_over' && (
              <GameOverScreen
                score={gameState.score}
                wordsCompleted={gameState.wordsCompleted}
                longestStreak={gameState.longestStreak}
                accuracy={accuracy}
                livesLost={livesLost}
                rank={currentRank}
                newAchievements={newAchievements}
                onRestart={resetGame}
              />
            )}
          </div>

          {gameState.phase === 'idle' && <HistoryPanel />}
        </div>
      </div>
    </ErrorBoundary>
  )
}
