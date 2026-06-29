import type { WordItem } from './types'

const wordList: WordItem[] = [
  // ===== 水果 (Fruit) - Easy =====
  { word: '苹果', hint: '水果', category: '水果', difficulty: 'easy' },
  { word: '香蕉', hint: '水果', category: '水果', difficulty: 'easy' },
  { word: '西瓜', hint: '水果', category: '水果', difficulty: 'easy' },
  { word: '草莓', hint: '水果', category: '水果', difficulty: 'easy' },
  { word: '葡萄', hint: '水果', category: '水果', difficulty: 'easy' },
  { word: '橙子', hint: '水果', category: '水果', difficulty: 'easy' },
  { word: '桃子', hint: '水果', category: '水果', difficulty: 'easy' },
  { word: '梨', hint: '水果', category: '水果', difficulty: 'easy' },
  { word: '芒果', hint: '水果', category: '水果', difficulty: 'easy' },
  { word: '樱桃', hint: '水果', category: '水果', difficulty: 'easy' },

  // ===== 宠物 (Pets) - Easy =====
  { word: '猫咪', hint: '宠物', category: '宠物', difficulty: 'easy' },
  { word: '狗', hint: '宠物', category: '宠物', difficulty: 'easy' },
  { word: '兔子', hint: '宠物', category: '宠物', difficulty: 'easy' },
  { word: '仓鼠', hint: '宠物', category: '宠物', difficulty: 'easy' },
  { word: '金鱼', hint: '宠物', category: '宠物', difficulty: 'easy' },
  { word: '乌龟', hint: '宠物', category: '宠物', difficulty: 'easy' },
  { word: '鹦鹉', hint: '宠物', category: '宠物', difficulty: 'easy' },

  // ===== 天体 (Celestial) - Easy =====
  { word: '太阳', hint: '天体', category: '天体', difficulty: 'easy' },
  { word: '月亮', hint: '天体', category: '天体', difficulty: 'easy' },
  { word: '星星', hint: '天体', category: '天体', difficulty: 'easy' },
  { word: '云', hint: '天体', category: '天体', difficulty: 'easy' },

  // ===== 交通工具 (Transport) - Easy =====
  { word: '汽车', hint: '交通工具', category: '交通工具', difficulty: 'easy' },
  { word: '自行车', hint: '交通工具', category: '交通工具', difficulty: 'easy' },
  { word: '飞机', hint: '交通工具', category: '交通工具', difficulty: 'easy' },
  { word: '火车', hint: '交通工具', category: '交通工具', difficulty: 'easy' },
  { word: '轮船', hint: '交通工具', category: '交通工具', difficulty: 'easy' },
  { word: '公交车', hint: '交通工具', category: '交通工具', difficulty: 'easy' },
  { word: '地铁', hint: '交通工具', category: '交通工具', difficulty: 'easy' },
  { word: '摩托车', hint: '交通工具', category: '交通工具', difficulty: 'easy' },

  // ===== 植物 (Plants) - Easy =====
  { word: '花', hint: '植物', category: '植物', difficulty: 'easy' },
  { word: '树', hint: '植物', category: '植物', difficulty: 'easy' },
  { word: '草', hint: '植物', category: '植物', difficulty: 'easy' },
  { word: '竹子', hint: '植物', category: '植物', difficulty: 'easy' },
  { word: '仙人掌', hint: '植物', category: '植物', difficulty: 'easy' },
  { word: '向日葵', hint: '植物', category: '植物', difficulty: 'easy' },
  { word: '玫瑰', hint: '植物', category: '植物', difficulty: 'easy' },

  // ===== 动物 (Animals) - Easy =====
  { word: '鱼', hint: '水中动物', category: '动物', difficulty: 'easy' },
  { word: '鸟', hint: '会飞动物', category: '动物', difficulty: 'easy' },
  { word: '蝴蝶', hint: '昆虫', category: '动物', difficulty: 'easy' },
  { word: '熊猫', hint: '动物', category: '动物', difficulty: 'easy' },
  { word: '大象', hint: '动物', category: '动物', difficulty: 'easy' },
  { word: '长颈鹿', hint: '动物', category: '动物', difficulty: 'easy' },
  { word: '猴子', hint: '动物', category: '动物', difficulty: 'easy' },
  { word: '老虎', hint: '动物', category: '动物', difficulty: 'easy' },
  { word: '狮子', hint: '动物', category: '动物', difficulty: 'easy' },
  { word: '企鹅', hint: '动物', category: '动物', difficulty: 'easy' },

  // ===== 建筑 (Buildings) - Easy =====
  { word: '房子', hint: '建筑', category: '建筑', difficulty: 'easy' },
  { word: '城堡', hint: '建筑', category: '建筑', difficulty: 'easy' },
  { word: '灯塔', hint: '建筑', category: '建筑', difficulty: 'easy' },
  { word: '桥梁', hint: '建筑', category: '建筑', difficulty: 'easy' },
  { word: '摩天轮', hint: '游乐设施', category: '建筑', difficulty: 'easy' },

  // ===== 电子产品 (Electronics) - Normal =====
  { word: '手机', hint: '电子产品', category: '电子产品', difficulty: 'normal' },
  { word: '电脑', hint: '电子产品', category: '电子产品', difficulty: 'normal' },
  { word: '电视', hint: '电子产品', category: '电子产品', difficulty: 'normal' },
  { word: '相机', hint: '电子产品', category: '电子产品', difficulty: 'normal' },
  { word: '耳机', hint: '电子产品', category: '电子产品', difficulty: 'normal' },
  { word: '平板', hint: '电子产品', category: '电子产品', difficulty: 'normal' },
  { word: '打印机', hint: '电子产品', category: '电子产品', difficulty: 'normal' },

  // ===== 物品 (Objects) - Normal =====
  { word: '书本', hint: '物品', category: '物品', difficulty: 'normal' },
  { word: '眼镜', hint: '配饰', category: '物品', difficulty: 'normal' },
  { word: '雨伞', hint: '工具', category: '物品', difficulty: 'normal' },
  { word: '杯子', hint: '餐具', category: '物品', difficulty: 'normal' },
  { word: '钥匙', hint: '物品', category: '物品', difficulty: 'normal' },
  { word: '钱包', hint: '物品', category: '物品', difficulty: 'normal' },
  { word: '背包', hint: '物品', category: '物品', difficulty: 'normal' },
  { word: '蜡烛', hint: '物品', category: '物品', difficulty: 'normal' },
  { word: '镜子', hint: '物品', category: '物品', difficulty: 'normal' },
  { word: '梳子', hint: '物品', category: '物品', difficulty: 'normal' },

  // ===== 家具 (Furniture) - Normal =====
  { word: '椅子', hint: '家具', category: '家具', difficulty: 'normal' },
  { word: '桌子', hint: '家具', category: '家具', difficulty: 'normal' },
  { word: '沙发', hint: '家具', category: '家具', difficulty: 'normal' },
  { word: '床', hint: '家具', category: '家具', difficulty: 'normal' },
  { word: '书架', hint: '家具', category: '家具', difficulty: 'normal' },
  { word: '台灯', hint: '家具', category: '家具', difficulty: 'normal' },
  { word: '衣柜', hint: '家具', category: '家具', difficulty: 'normal' },

  // ===== 工具 (Tools) - Normal =====
  { word: '时钟', hint: '计时器', category: '工具', difficulty: 'normal' },
  { word: '剪刀', hint: '工具', category: '工具', difficulty: 'normal' },
  { word: '锤子', hint: '工具', category: '工具', difficulty: 'normal' },
  { word: '螺丝刀', hint: '工具', category: '工具', difficulty: 'normal' },
  { word: '望远镜', hint: '工具', category: '工具', difficulty: 'normal' },
  { word: '指南针', hint: '工具', category: '工具', difficulty: 'normal' },

  // ===== 服饰 (Clothing) - Normal =====
  { word: '鞋子', hint: '服饰', category: '服饰', difficulty: 'normal' },
  { word: '帽子', hint: '服饰', category: '服饰', difficulty: 'normal' },
  { word: '围巾', hint: '服饰', category: '服饰', difficulty: 'normal' },
  { word: '手套', hint: '服饰', category: '服饰', difficulty: 'normal' },
  { word: '裙子', hint: '服饰', category: '服饰', difficulty: 'normal' },
  { word: '领带', hint: '服饰', category: '服饰', difficulty: 'normal' },
  { word: '手表', hint: '配饰', category: '服饰', difficulty: 'normal' },

  // ===== 食物 (Food) - Normal =====
  { word: '蛋糕', hint: '食物', category: '食物', difficulty: 'normal' },
  { word: '冰淇淋', hint: '食物', category: '食物', difficulty: 'normal' },
  { word: '面条', hint: '食物', category: '食物', difficulty: 'normal' },
  { word: '饺子', hint: '食物', category: '食物', difficulty: 'normal' },
  { word: '汉堡', hint: '食物', category: '食物', difficulty: 'normal' },
  { word: '披萨', hint: '食物', category: '食物', difficulty: 'normal' },
  { word: '寿司', hint: '食物', category: '食物', difficulty: 'normal' },
  { word: '火锅', hint: '食物', category: '食物', difficulty: 'normal' },

  // ===== 乐器 (Instruments) - Hard =====
  { word: '钢琴', hint: '乐器', category: '乐器', difficulty: 'hard' },
  { word: '吉他', hint: '乐器', category: '乐器', difficulty: 'hard' },
  { word: '小提琴', hint: '乐器', category: '乐器', difficulty: 'hard' },
  { word: '鼓', hint: '乐器', category: '乐器', difficulty: 'hard' },
  { word: '笛子', hint: '乐器', category: '乐器', difficulty: 'hard' },
  { word: '古筝', hint: '乐器', category: '乐器', difficulty: 'hard' },

  // ===== 体育 (Sports) - Hard =====
  { word: '篮球', hint: '体育', category: '体育', difficulty: 'hard' },
  { word: '足球', hint: '体育', category: '体育', difficulty: 'hard' },
  { word: '网球', hint: '体育', category: '体育', difficulty: 'hard' },
  { word: '游泳', hint: '体育', category: '体育', difficulty: 'hard' },
  { word: '滑雪', hint: '体育', category: '体育', difficulty: 'hard' },
  { word: '冲浪', hint: '体育', category: '体育', difficulty: 'hard' },
  { word: '射箭', hint: '体育', category: '体育', difficulty: 'hard' },

  // ===== 自然 (Nature) - Hard =====
  { word: '瀑布', hint: '自然景观', category: '自然', difficulty: 'hard' },
  { word: '火山', hint: '自然景观', category: '自然', difficulty: 'hard' },
  { word: '彩虹', hint: '自然现象', category: '自然', difficulty: 'hard' },
  { word: '沙漠', hint: '自然景观', category: '自然', difficulty: 'hard' },
  { word: '冰川', hint: '自然景观', category: '自然', difficulty: 'hard' },
  { word: '极光', hint: '自然现象', category: '自然', difficulty: 'hard' },

  // ===== 职业 (Professions) - Hard =====
  { word: '医生', hint: '职业', category: '职业', difficulty: 'hard' },
  { word: '消防员', hint: '职业', category: '职业', difficulty: 'hard' },
  { word: '宇航员', hint: '职业', category: '职业', difficulty: 'hard' },
  { word: '厨师', hint: '职业', category: '职业', difficulty: 'hard' },
  { word: '画家', hint: '职业', category: '职业', difficulty: 'hard' },
  { word: '科学家', hint: '职业', category: '职业', difficulty: 'hard' },
  { word: '魔术师', hint: '职业', category: '职业', difficulty: 'hard' },
]

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Get session words based on mode and difficulty
export function getSessionWords(
  mode: string,
  difficulty: 'easy' | 'normal' | 'hard' | 'all',
  count: number
): WordItem[] {
  let filtered = wordList

  if (difficulty !== 'all') {
    filtered = wordList.filter(w => w.difficulty === difficulty)
  }

  // For 'all' difficulty, distribute evenly across tiers
  if (difficulty === 'all') {
    const easy = shuffle(wordList.filter(w => w.difficulty === 'easy'))
    const normal = shuffle(wordList.filter(w => w.difficulty === 'normal'))
    const hard = shuffle(wordList.filter(w => w.difficulty === 'hard'))

    const perTier = Math.ceil(count / 3)
    const selected = [
      ...easy.slice(0, perTier),
      ...normal.slice(0, perTier),
      ...hard.slice(0, perTier),
    ]

    return shuffle(selected).slice(0, count)
  }

  return shuffle(filtered).slice(0, Math.min(count, filtered.length))
}

// Get all words (for reference)
export function getAllWords(): WordItem[] {
  return [...wordList]
}

// Get categories
export function getCategories(): string[] {
  return [...new Set(wordList.map(w => w.category))]
}

// Get word count stats
export function getWordStats(): {
  total: number
  byDifficulty: Record<string, number>
  byCategory: Record<string, number>
} {
  const byDifficulty: Record<string, number> = {}
  const byCategory: Record<string, number> = {}

  for (const w of wordList) {
    byDifficulty[w.difficulty] = (byDifficulty[w.difficulty] || 0) + 1
    byCategory[w.category] = (byCategory[w.category] || 0) + 1
  }

  return { total: wordList.length, byDifficulty, byCategory }
}
