'use client'

import { useState, useEffect } from 'react'

interface GameState {
  isPlaying: boolean
  currentWord: string
  currentHint: string
  description: string | null
  isGenerating: boolean
  score: number
  round: number
  totalRounds: number
  timeLeft: number
  showResult: boolean
  isCorrect: boolean
}

const wordList = [
  { word: '苹果', hint: '水果' },
  { word: '猫咪', hint: '宠物' },
  { word: '太阳', hint: '天体' },
  { word: '汽车', hint: '交通工具' },
  { word: '花', hint: '植物' },
  { word: '鱼', hint: '水中动物' },
  { word: '月亮', hint: '夜晚天体' },
  { word: '鸟', hint: '会飞动物' },
  { word: '树', hint: '植物' },
  { word: '房子', hint: '建筑' },
  { word: '狗', hint: '宠物' },
  { word: '手机', hint: '电子产品' },
  { word: '书本', hint: '物品' },
  { word: '眼镜', hint: '配饰' },
  { word: '雨伞', hint: '工具' },
  { word: '杯子', hint: '餐具' },
  { word: '椅子', hint: '家具' },
  { word: '时钟', hint: '计时器' },
  { word: '电脑', hint: '电子产品' },
  { word: '鞋子', hint: '服饰' },
]

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    currentWord: '',
    currentHint: '',
    description: null,
    isGenerating: false,
    score: 0,
    round: 1,
    totalRounds: 5,
    timeLeft: 60,
    showResult: false,
    isCorrect: false,
  })

  const [guessInput, setGuessInput] = useState('')
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState.isPlaying && gameState.timeLeft > 0 && !gameState.showResult) {
      timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }))
      }, 1000)
    } else if (gameState.timeLeft === 0 && !gameState.showResult) {
      handleGameOver(false)
    }
    return () => clearTimeout(timer)
  }, [gameState.isPlaying, gameState.timeLeft, gameState.showResult])

  const startGame = async () => {
    if (!apiKey.trim()) {
      alert('请输入智谱AI API密钥')
      return
    }

    const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    setGameState({
      isPlaying: true,
      currentWord: randomWord.word,
      currentHint: randomWord.hint,
      description: null,
      isGenerating: true,
      score: 0,
      round: 1,
      totalRounds: 5,
      timeLeft: 60,
      showResult: false,
      isCorrect: false,
    })

    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: randomWord.word,
          apiKey: apiKey,
        }),
      })

      const data = await response.json()

      if (data.error) {
        alert('描述生成失败: ' + data.error)
        setGameState(prev => ({ ...prev, isGenerating: false, isPlaying: false }))
      } else {
        setGameState(prev => ({
          ...prev,
          description: data.description,
          isGenerating: false,
        }))
      }
    } catch (error) {
      alert('描述生成失败，请检查API密钥')
      setGameState(prev => ({ ...prev, isGenerating: false, isPlaying: false }))
    }
  }

  const submitGuess = () => {
    const isCorrect = guessInput.trim().toLowerCase() === gameState.currentWord.toLowerCase()
    
    setGameState(prev => ({
      ...prev,
      showResult: true,
      isCorrect,
      score: isCorrect ? prev.score + 10 : prev.score,
    }))

    if (isCorrect && gameState.round < gameState.totalRounds) {
      setTimeout(() => nextRound(), 2000)
    }
  }

  const nextRound = async () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    setGameState(prev => ({
      ...prev,
      round: prev.round + 1,
      currentWord: randomWord.word,
      currentHint: randomWord.hint,
      description: null,
      isGenerating: true,
      showResult: false,
      timeLeft: 60,
    }))

    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: randomWord.word,
          apiKey: apiKey,
        }),
      })

      const data = await response.json()

      if (data.error) {
        alert('描述生成失败: ' + data.error)
        setGameState(prev => ({ ...prev, isGenerating: false }))
      } else {
        setGameState(prev => ({
          ...prev,
          description: data.description,
          isGenerating: false,
        }))
      }
    } catch (error) {
      alert('描述生成失败')
      setGameState(prev => ({ ...prev, isGenerating: false }))
    }
  }

  const handleGameOver = (isCorrect: boolean) => {
    setGameState(prev => ({
      ...prev,
      showResult: true,
      isCorrect,
      score: isCorrect ? prev.score + 10 : prev.score,
    }))
  }

  const resetGame = () => {
    setGameState({
      isPlaying: false,
      currentWord: '',
      currentHint: '',
      description: null,
      isGenerating: false,
      score: 0,
      round: 1,
      totalRounds: 5,
      timeLeft: 60,
      showResult: false,
      isCorrect: false,
    })
    setGuessInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">📝 AI文字描述猜词</h1>

        {!gameState.isPlaying && (
          <div className="text-center">
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2 text-gray-700">智谱AI API密钥</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="输入你的智谱AI API密钥"
                className="w-full max-w-md px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <p className="text-sm text-gray-500 mt-2">获取API密钥：<a href="https://open.bigmodel.cn/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">open.bigmodel.cn</a></p>
            </div>
            <p className="text-gray-600 mb-6">AI会用生动形象的文字描述一个物体或概念，你需要根据描述猜测出它是什么！</p>
            <button
              onClick={startGame}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              开始游戏
            </button>
          </div>
        )}

        {gameState.isPlaying && (
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
                  onKeyPress={(e) => e.key === 'Enter' && submitGuess()}
                />
                <button
                  onClick={submitGuess}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
                >
                  提交答案
                </button>
              </div>
            )}

            {gameState.showResult && (
              <div className="text-center">
                <div className={`mb-6 p-6 rounded-lg ${gameState.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                  <p className={`text-3xl font-bold mb-2 ${gameState.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {gameState.isCorrect ? '🎉 正确！' : '❌ 错误！'}
                  </p>
                  <p className="text-xl text-gray-700 mb-2">答案是: <span className="font-bold text-purple-600">{gameState.currentWord}</span></p>
                  {gameState.isCorrect && <p className="text-lg text-green-600">+10分</p>}
                </div>
                
                {gameState.round >= gameState.totalRounds ? (
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg mb-6">
                    <p className="text-2xl font-bold text-gray-800 mb-4">🏆 游戏结束！</p>
                    <p className="text-xl text-gray-700">最终得分: <span className="font-bold text-purple-600">{gameState.score}</span>分</p>
                    <p className="text-lg text-gray-600">完成轮次: {gameState.totalRounds}</p>
                    <p className="text-lg text-gray-600">准确率: {gameState.round > 0 ? Math.round((gameState.score / 10) / gameState.round * 100) : 0}%</p>
                  </div>
                ) : (
                  <button
                    onClick={nextRound}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    下一轮
                  </button>
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
