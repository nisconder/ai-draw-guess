'use client'

import { useState, useEffect, useRef } from 'react'
import type { WordItem, GameState, GamePhase, GameMode, ProviderType, RoundResult, Difficulty } from '@/lib/types'
import { getSessionWords } from '@/lib/words'

export default function Home() {
  const roundDuration = 60
  const roundsPerGame = 5
  const autoNextDelay = 1800
  const maxRetryCount = 1

  const [gameState, setGameState] = useState<GameState>({
    phase: 'idle',
    currentWord: '',
    currentHint: '',
    description: null,
    isGenerating: false,
    score: 0,
    round: 1,
    totalRounds: roundsPerGame,
    timeLeft: roundDuration,
    totalTime: roundDuration,
    streak: 0,
    roundScores: [],
    mode: 'classic',
    provider: 'zhipu',
    showResult: false,
    resultType: null,
  })

  const [guessInput, setGuessInput] = useState('')
  const [sessionWords, setSessionWords] = useState<WordItem[]>([])
  const requestIdRef = useRef(0)
  const nextRoundTimerRef = useRef<NodeJS.Timeout | null>(null)

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

    setGameState(prev => ({
      ...prev,
      phase: 'playing',
      currentWord: selectedWord.word,
      currentHint: selectedWord.hint,
      description: null,
      isGenerating: true,
      score: resetScore ? 0 : prev.score,
      round: roundIndex + 1,
      totalRounds: words.length,
      timeLeft: roundDuration,
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

    setGameState(prev => ({
      ...prev,
      showResult: true,
      resultType,
      score: isCorrect ? prev.score + 10 : prev.score,
    }))

    const isLastRound = gameState.round >= gameState.totalRounds
    if (!isLastRound) {
      nextRoundTimerRef.current = setTimeout(() => {
        void loadRound(sessionWords, gameState.round)
      }, autoNextDelay)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if ((gameState.phase === 'playing' || gameState.phase === 'round_active') && gameState.timeLeft > 0 && !gameState.showResult) {
      timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }))
      }, 1000)
    } else if (gameState.timeLeft === 0 && !gameState.showResult) {
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

  const startGame = async () => {
    const words = getSessionWords('classic', 'all', roundsPerGame)
    if (words.length === 0) {
      alert('词库为空，无法开始游戏')
      return
    }

    setSessionWords(words)
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
    setGameState({
      phase: 'idle',
      currentWord: '',
      currentHint: '',
      description: null,
      isGenerating: false,
      score: 0,
      round: 1,
      totalRounds: roundsPerGame,
      timeLeft: roundDuration,
      totalTime: roundDuration,
      streak: 0,
      roundScores: [],
      mode: 'classic',
      provider: 'zhipu',
      showResult: false,
      resultType: null,
    })
    setGuessInput('')
    setSessionWords([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">📝 AI文字描述猜词</h1>

        {gameState.phase === 'idle' && (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">请先在服务端环境变量中配置 ZHIPU_API_KEY</p>
            <p className="text-gray-600 mb-6">AI会用生动形象的文字描述一个物体或概念，你需要根据描述猜测出它是什么！</p>
            <button
              onClick={startGame}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              开始游戏
            </button>
          </div>
        )}

        {gameState.phase !== 'idle' && (
          <div>
            <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg">
              <div className="text-lg">
                <span className="font-semibold text-gray-700">得分: </span>
                <span className="font-bold text-purple-600">{gameState.score}</span>
              </div>
              <div className="text-lg">
                <span className="font-semibold text-gray-700">第 {gameState.round}/{gameState.totalRounds} 轮</span>
              </div>
              <div className="text-lg">
                <span className="font-semibold text-gray-700">剩余时间: </span>
                <span className={`font-bold ${gameState.timeLeft <= 10 ? 'text-red-600' : 'text-green-600'}`}>
                  {gameState.timeLeft}秒
                </span>
              </div>
            </div>

            {gameState.description && (
              <div className="mb-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-4">
                  <p className="text-center text-lg font-semibold text-gray-700">
                    💡 类别提示: {gameState.currentHint}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border-2 border-purple-200 shadow-inner">
                  {gameState.isGenerating ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-xl font-semibold text-gray-700">AI正在生成描述...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-2xl leading-relaxed text-gray-800 font-medium">
                        {gameState.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!gameState.showResult && !gameState.isGenerating && gameState.description && (
              <div className="flex gap-4">
                <input
                  type="text"
                  value={guessInput}
                  onChange={(e) => setGuessInput(e.target.value)}
                  placeholder="输入你的猜测..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
                  onKeyDown={(e) => e.key === 'Enter' && submitGuess()}
                />
                <button
                  onClick={submitGuess}
                  disabled={!guessInput.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
                >
                  提交答案
                </button>
              </div>
            )}

            {gameState.showResult && (
              <div className="text-center">
                <div className={`mb-6 p-6 rounded-lg ${gameState.resultType === 'correct' ? 'bg-green-100' : gameState.resultType === 'timeout' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                  <p className={`text-3xl font-bold mb-2 ${gameState.resultType === 'correct' ? 'text-green-600' : gameState.resultType === 'timeout' ? 'text-yellow-700' : 'text-red-600'}`}>
                    {gameState.resultType === 'correct' ? '🎉 正确！' : gameState.resultType === 'timeout' ? '⏰ 超时！' : '❌ 错误！'}
                  </p>
                  <p className="text-xl text-gray-700 mb-2">答案是: <span className="font-bold text-purple-600">{gameState.currentWord}</span></p>
                  {gameState.resultType === 'correct' && <p className="text-lg text-green-600">+10分</p>}
                </div>
                
                {gameState.round >= gameState.totalRounds ? (
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg mb-6">
                    <p className="text-2xl font-bold text-gray-800 mb-4">🏆 游戏结束！</p>
                    <p className="text-xl text-gray-700">最终得分: <span className="font-bold text-purple-600">{gameState.score}</span>分</p>
                    <p className="text-lg text-gray-600">完成轮次: {gameState.totalRounds}</p>
                    <p className="text-lg text-gray-600">准确率: {gameState.round > 0 ? Math.round((gameState.score / 10) / gameState.round * 100) : 0}%</p>
                  </div>
                ) : (
                  <p className="text-lg text-gray-600 mb-4">即将进入下一轮...</p>
                )}
                
                <button
                  onClick={resetGame}
                  className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  重新开始
                </button>
              </div>
            )}

            {gameState.isGenerating && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600 mx-auto mb-4"></div>
                <p className="text-xl font-semibold text-gray-700">AI正在为你生成描述，请稍候...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
