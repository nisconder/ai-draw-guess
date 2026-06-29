# ai-draw-guess-optimization-v2 — Survival Rush

## TL;DR (For humans)

**What you'll get:** 不是轮流猜词——是生存竞速！你只有 5 条命，答对得分、答错扣命、连续答对还能回血。重点是**打击感**——答对屏幕震一下＋得分数字"嘭"弹出、连击计数器像格斗游戏一样层层升级、扣命时红闪＋碎裂效果、超时计时器剧烈脉动。还有成就系统给你长期目标刷。

**Why this approach:** 基础设施（5供应商、100+词库、API客户端）已从 git HEAD 恢复。现在直接在上层构建全新的游戏引擎。生存竞速比回合制更紧张、更易上瘾，也天然和"竞速"主题契合。

**Effort:** Large
**Risk:** Medium — 类型系统需要调整以适配生存流，但增量修改可控。

Status: ✅ Approved & ready for execution. Run `$start-work` to begin.

## 游戏设计总览

### 生存竞速核心规则
```
❤️ 初始 5 条命
⏱ 每轮有时间限制（选择难度决定）
✅ 答对 → +10分 + 速度奖励，切到下一个词
❌ 答错/超时 → ❤️ -1，显示正确答案，自动切到下一个词
🔥 连击≥3 → 回复 1❤️（上限5）
💀 命数归零 → 游戏结束 → 显示成绩 → 解锁成就（如达成）

难度选择：
  - 简单：每词 60秒，词库 easy 为主
  - 普通：每词 45秒，词库 easy+normal 混合
  - 困难：每词 30秒，词库 normal+hard 混合
```

### 视觉特效
- 🔥 **连击指示器**：≥3 连击时，连击计数放大闪烁+变色动画
- ❤️ **命数变化**：扣命时红闪，加命时绿闪
- ⏱ **倒计时 <10秒**：计时器变红+脉动动画
- ✅ **答对**：屏幕绿闪，分数弹出 "+15" 动画
- ❌ **答错**：屏幕红震，正确答案以打字机效果显现
- 🏆 **成就解锁**：全屏横幅滑入动画 + 音效（或振动反馈）
- 所有过渡使用 CSS 动画（prefers-reduced-motion 尊重）

### 成就系统
```
段位（累计得分解锁）：
  🥉 青铜    0分
  🥈 白银    500分
  🥇 黄金    1500分
  💎 钻石    3000分
  👑 大师    5000分
  🏆 传说    10000分

成就勋章（一次性条件）：
  🔰 "初出茅庐"    — 完成第1局游戏
  🔥 "三连击"      — 单局达到3连击
  🔥🔥 "五连击"     — 单局达到5连击  
  🔥🔥🔥 "十连击"   — 单局达到10连击
  💪 "起死回生"    — 从1❤️恢复到3❤️+
  ⚡ "秒答"        — 3秒内答对
  🛡️ "无伤"        — 整局不丢命通关（至少10词）
  🏅 "百词斩"      — 累计答对100词
  🏅 "五百词"      — 累计答对500词
  🎯 "精准"        — 单局准确率≥90%（至少10词）
  📈 "登峰造极"    — 达到传说段位
```

## Scope

### Already DONE (from git HEAD restoration — verified)
| # | Task | Status |
|---|------|--------|
| 1 | `lib/types.ts` — 基础类型（WordItem, ProviderType, etc.） | ✅ DONE（需扩展） |
| 2 | `lib/words.ts` — 100+ words, 15 类别, 3 难度 | ✅ DONE |
| 3 | `.env.example` + `lib/env.ts` — 多供应商配置 | ✅ DONE |
| 4 | `lib/api-client.ts` — 统一 API 客户端 | ✅ DONE |
| 5 | `app/api/generate-description/route.ts` — 供应商选择 | ✅ DONE |
| 6 | `app/page.tsx` — 类型导入适配 | ✅ DONE（但待重构） |

### Must have (new work)
7. **重设计类型系统** — GameState 适配生存流（加lives, combo等），GameMode 改为难度选择，新增 Achievement 类型体系
8. **生存竞速引擎** — `hooks/useGame.ts` 重写为生存流：命数管理、连击回血、连续出词、难度适应
9. **游戏难度** — 3 档难度配置（easy/normal/hard），影响每词时限+词库过滤
10. **视觉特效** — 连击闪光、命数变化动画、答对/答错反馈、计时器脉动、成就解锁横幅
11. **成就系统** — 成就类型定义、条件检测引擎、LocalStorage 持久化
12. **UI 组件** — 重构为生存流专用：HeartsDisplay、ComboIndicator、TimerBar（带特效）、WordCard、ResultOverlay、AchievementBanner、RankBadge
13. **游戏历史 + 统计** — 幸存模式专用记录（最高分、最长生存、成就解锁列表）
14. **集成 + ErrorBoundary** — 全部串进 page.tsx + 错误边界
15. **构建验证** — 完整测试通过

### Must NOT have
- 无经典的"4模式回合制"（已被生存流取代）
- 无后端/多人/图片/PWA/多语言
- 无额外 UI 库（Tailwind + CSS keyframes 足够）
- 无非 4 字以内的词
- 无负分

## Execution strategy

### Dependency matrix
| Todo | Depends on | Blocks |
|------|-----------|--------|
| 7. 类型系统重设计 | (DONE 1-6) | 8-15 |
| 8. 生存竞速引擎 | 7 | 9-14 |
| 9. 游戏难度 | 8 | 14 |
| 10. 视觉特效 | 8 | 14 |
| 11. 成就系统 | 7 | 14 |
| 12. UI 组件 | 8, 10, 11 | 14 |
| 13. 游戏历史 | 8 | 14 |
| 14. 集成 | 9, 10, 12, 13 | 15 |
| 15. 构建验证 | 14 | Final |

### Waves
- **Wave 0** (Done): 基础设施恢复
- **Wave 1**: 类型系统重设计
- **Wave 2**: 生存竞速引擎
- **Wave 3**: 游戏难度 + 视觉特效 + 成就系统（并行）
- **Wave 4**: UI 组件 + 游戏历史（并行）
- **Wave 5**: 集成 + 构建验证

## Todos

- [ ] 7. **lib/types.ts: 重设计类型系统以适配生存竞速**
  修改内容:
  - `GameMode` → 改为 `'survival_easy' | 'survival_normal' | 'survival_hard'`（或保留单一 `'survival'` + 独立 `Difficulty` 字段）
  - `GameState` → 增加 `lives: number`, `maxLives: number`, `combo: number`, `wordsCompleted: number`, `unlockedAchievements: string[]`, `longestStreak: number`, `startTime: number`, `wordStartTime: number`。移除 `round`/`totalRounds`（回合制概念）
  - `GameSettings` → 改为 `difficulty: 'easy' | 'normal' | 'hard'`, `wordTimeLimit: number`, `initialLives: number`, `comboHealThreshold: number`, `provider: ProviderType`, `allowHints: boolean`
  - 新增 `ScreenEffectType`: `'correct' | 'wrong' | 'timeout' | 'combo' | 'heart-lose' | 'heart-gain' | 'achievement' | 'game-over'`
  - 新增 `ScreenEffect` 接口: `type: ScreenEffectType, intensity: number (0-10), timestamp: number`
  - 新增 `Achievement` 接口: `id, name, description, icon, condition (描述), unlockedAt?`
  - 新增 `AchievementProgress` 接口: `achievementId, unlocked, unlockedAt?`
  - 新增 `PlayerRank` 类型: `'bronze' | 'silver' | 'gold' | 'diamond' | 'master' | 'legend'`
  - `GameHistory` → 适配生存流: `livesLost, longestStreak, wordsCompleted, achievementsUnlocked: string[], difficulty`
  - `GameStats` → 增加 `totalWordsCompleted, totalLivesLost, bestSurvivalScore, totalAchievements`  
  必须保留现有的 WordItem、ProviderType、ProviderConfig 等不变。
  Wave 1 | Blocked by: (DONE) | Blocks: 8-15
  Acceptance criteria: `npx tsc --noEmit` passes. 新类型可被导入使用。
  Commit: Y | refactor(types): redesign types for survival rush game

- [ ] 8. **hooks/useGame.ts: 生存竞速引擎（含反馈状态管理）**
  游戏流程: idle → playing → (循环: loading_description → waiting_answer → showing_result) → game_over
  
  ### 核心逻辑
  - `startGame(difficulty)`: 初始化状态，lives=5，从词库随机取词，调用 API 生成描述
  - `submitGuess(word)`: 检查答案正确性。
    - 正确 → 得分+速度奖励+连击+combo回血检测→触发`screenEffect: 'correct'`
    - 错误 → 扣命+正确答案记录+重置连击→触发`screenEffect: 'wrong'`
  - 命数归零→game_over，触发成就检测
  - 超时处理: timeLeft归零→算答错，触发`screenEffect: 'timeout'`
  - 连续出词: 不区分"轮次"，答完自动加载下一个词
  - combo≥3回血: 触发`screenEffect: 'heart-gain'`
  - 扣命时: 触发`screenEffect: 'heart-lose'`
  - combo升级检查: combo达到3/5/8/10触发递增等级的反馈
  
  ### 反馈生命周期管理
  新增 `screenEffect: { type: ScreenEffectType | null; intensity: number; timestamp: number }` 状态:
  - 每次需要反馈时，设置 `screenEffect` 并启动内部 timeout
  - timeout 结束后自动清除为 `null`
  - 各效果持续时间: correct=400ms, wrong=600ms, timeout=500ms, combo=300ms, heart-lose=400ms, heart-gain=300ms, achievement=3000ms, game-over=2000ms
  - 成就检测在 game_over 时调用 `lib/achievements.ts` 的 `checkAchievements()`
  
  ### 技术约束
  - 使用 lib/api-client.ts 调用描述生成
  - 使用 lib/words.ts 的 getSessionWords 预加载词库池
  - 管理 requestId 以处理并发/过期请求（组件卸载时取消）
  - `screenEffect` 的 setter 必须在组件生命周期内安全执行（cleanup 检查）
  Wave 2 | Blocked by: 7 | Blocks: 9-14
  References: lib/types.ts (新类型: ScreenEffectType, 新 GameState), lib/api-client.ts, lib/words.ts
  Acceptance criteria: `npx tsc --noEmit` passes. Hook 驱动完整游戏流程并且每个操作触发正确的 screenEffect 类型。反馈在指定时间后自动清除。
  Commit: Y | feat(game): implement survival rush game engine with feedback state

- [ ] 9. **lib/game-difficulty.ts: 3档难度配置**
  创建 `lib/game-difficulty.ts`:
  - easy: wordTimeLimit=60, wordFilter='easy', 词库 easy 为主(80%)+normal(20%)
  - normal: wordTimeLimit=45, wordFilter='all', easy(30%)+normal(50%)+hard(20%)
  - hard: wordTimeLimit=30, wordFilter='hard', normal(40%)+hard(60%)
  
  导出 `getDifficultyConfig(difficulty): { wordTimeLimit, lives, comboHealThreshold, getNextWord(words) }`
  Wave 3 | Blocked by: 8 | Blocks: 14
  Acceptance criteria: getDifficultyConfig('easy') 返回正确参数。
  Commit: Y | feat(game): add difficulty configurations for survival mode

- [ ] 10. **打击感视觉特效系统 — 核心反馈层**
  核心理念：每一个玩家操作都必须有"嘭"的一下反馈，多层叠加。在 `hooks/useGame.ts` 中新增 `screenEffect` 状态管理视觉反馈生命周期。
  
  #### 架构：Screen Effects Layer
  在 useGame 中增加 `screenEffect: { type: ScreenEffectType | null, intensity: number, timestamp: number }` 状态。每个效果有持续时间（200-800ms），自动清除。组件根据 `screenEffect.type` 触发对应动画 CSS class。
  
  ### 打击感效果清单

  #### ✅ 答对（命中反馈 — 快速、爆发）
  ```
  触发时机: submitGuess() 判断正确
  效果:
  1. 屏幕闪白（<100ms 的全屏白色 overlay）
  2. 得分数字从答案位置"嘭"弹出，放大→缩小→向上飘散（`@keyframes score-pop`）
  3. 连击数闪烁放大（计数器 scale 1→1.5→1，`cubic-bezier` 弹性曲线）
  4. 轻量屏幕震动（`transform: translateX` 水平震动 3次，<100ms）
  5. 命数短暂绿光轮廓（<200ms）
  持续时间: 400ms
  CSS: .effect-correct { animation: screen-flash .1s, score-pop .4s, shake-light .15s }
  ```

  #### ❌ 答错（受击反馈 — 沉重、顿挫）
  ```
  触发时机: submitGuess() 判断错误
  效果:
  1. 屏幕红闪 overlay（透明度 0.3→0，`mix-blend-mode: multiply`）
  2. 屏幕剧烈震动（水平方向±12px，5次衰减震荡）
  3. 当前命数 ❤️ 碎裂效果（heart 图标分裂为两半→淡出，使用 `::after` 伪元素）
  4. 正确答案以打字机效果逐个字符显现（每字 80ms，重现在答错 overlay 上）
  5. 连击数重置显示为 "0" 带快速缩小动画
  持续时间: 600ms
  CSS: .effect-wrong { animation: screen-flash-red .3s, shake-heavy .4s, heart-break .5s }
  ```

  #### ⏱ 超时（沉闷、流逝感）
  ```
  触发时机: timeLeft === 0
  效果:
  1. 计时器剧烈红色脉动（最后3秒，scale 脉动 1→1.1 每 0.5s）
  2. 计时器数字放大+变红+闪烁
  3. 命数慢慢淡出（.5s 渐变透明度）
  4. 轻量屏幕灰化（短暂 desaturate，<300ms）
  持续时间: 500ms（含计时器的最后3秒预警）
  CSS: .effect-timeout { animation: timer-desaturate .3s, fade-heart .5s }
  .timer-danger { animation: timer-pulse .5s ease-in-out infinite; }
  ```

  #### 🔥 连击升级（累积快感 — 逐级递增）
  ```
  触发规则: combo >= 3 时激活，每+1连击重触发
  效果等级:
     combo 3-4:  屏幕边框蓝色脉冲光效（1次）     + 连计数 bounce 放大
     combo 5-7:  紫色脉冲 + 轻量屏幕震动          + 计数发光文字阴影
     combo 8-9:  金色脉冲 + 较重震动              + 计数带旋转效果
     combo 10+:  金色爆发 + 全屏闪光 + 剧烈震动   + 计数火光文字效果
  持续时间: 300ms（每级递进）
  CSS: .combo-3 { animation: border-pulse-blue .3s, combo-bounce .2s }
  .combo-5 { animation: border-pulse-purple .3s, shake-light .15s }
  .combo-10 { animation: border-golden .4s, screen-flash .1s, shake-medium .2s }
  ```

  #### 💀 命数变化（沉重惩罚 / 喘息回馈）
  ```
  扣命: 
  - 当前 ❤️ 图标：爆炸缩小（scale 1→1.5→0）
  - 屏幕底部短暂红色阴影上扫
  - 剩余 ❤️ 重新排列时弹性动画（stagger 80ms 延迟）
  
  回血（combo≥3）:
  - 新 ❤️ 从底部弹出（translateY 20→0）+ 绿色光晕
  - "+1 ❤️" 文字从 ❤️ 位置弹出
  
  CSS: .heart-lose { animation: heart-explode .4s forwards }
  .heart-gain { animation: heart-pop-in .3s cubic-bezier(.34,1.56,.64,1) }
  ```

  #### 🏆 成就解锁（奖励高潮）
  ```
  触发时机: 成就检测返回新解锁
  效果:
  1. 游戏画面暂停→金色光晕从中心扩散（全屏 overlay）
  2. 成就横幅从顶部滑入（translateY -100%→0），带弹性效果
  3. 成就图标旋转+放大入场
  4. 金色粒子散落效果（5-8个小点随机散开，CSS `@keyframes particle-scatter`）
  5. 横幅停留 2s 后滑出
  持续时间: 3000ms（含停留）
  CSS: .achievement-unlock { animation: golden-burst .5s, banner-slide-in .4s cubic-bezier(.34,1.56,.64,1), particle-scatter .8s }
  ```

  #### 🎮 游戏结束（最终结算）
  ```
  触发时机: lives === 0
  效果:
  1. 屏幕缓慢变暗（透明度 0→0.7，1s 渐变）
  2. "GAME OVER" 大字从中间炸开（scale 0→1.2→1，带文字阴影扩散）
  3. 最终统计逐行显现（stagger 200ms）
  4. 段位图标旋转入场
  持续时间: 2000ms
  CSS: .game-over { animation: screen-dim 1s forwards }
  .game-over-title { animation: title-explode .5s cubic-bezier(.34,1.56,.64,1) .5s forwards }
  ```

  ### 实现要求
  - 所有动画纯 CSS @keyframes（globals.css），通过组件条件 class 切换触发
  - 每个效果的持续时间、延迟、`cubic-bezier` 曲线必须手动调优，不取默认值
  - 用 `transform` 和 `opacity` 驱动动画（GPU 合成层，高性能）
  - 持续时间低于 100ms 的效果（闪白、闪红）必须存在——它们是"打击感"的关键
  - screen effect 状态在 `lib/types.ts` 中定义为 `ScreenEffectType = 'correct' | 'wrong' | 'timeout' | 'combo' | 'heart-lose' | 'heart-gain' | 'achievement' | 'game-over'`
  - 所有动画配合 `prefers-reduced-motion` 媒体查询完全禁用（过渡到静态显示）
  Wave 3 | Blocked by: 8 | Blocks: 14
  References: app/globals.css, app/page.tsx (current render), lib/types.ts (新 ScreenEffectType)
  Acceptance criteria: 每个操作的打击反馈序列完整触发：答对→闪白+弹出+震动、答错→红闪+震动+碎裂、连击→边框脉冲递增、成就→金色爆炸+横幅滑入。`npm run build` 通过。
  Commit: Y | style(ui): add impact-driven screen effects system

- [ ] 11. **lib/achievements.ts + lib/storage.ts: 成就系统**
  `lib/achievements.ts`:
  - 定义成就列表（10个成就，见游戏设计总览）
  - `checkAchievements(gameResult, currentStats): Achievement[]` — 检测新解锁成就
  - `getRank(score): PlayerRank` — 根据累计得分返回段位
  
  `lib/storage.ts`:
  - `saveGameResult(result)` — 保存局结果
  - `getGameHistory(): GameHistory[]` — 获取历史
  - `getGameStats(): GameStats` — 聚合统计
  - `getAchievements(): AchievementProgress[]` — 成就进度
  - `saveAchievement(id)` — 解锁成就
  - `clearData()` — 清除所有数据
  - LocalStorage key: `survival-rush-history`, `survival-rush-achievements`
  - 处理 Private Browsing / quota 异常
  Wave 3 | Blocked by: 7, 8 | Blocks: 14
  References: lib/types.ts (Achievement 新类型)
  Acceptance criteria: 完成1局触发1个成就。累计500分→白银段位。清除数据后重新开始。
  Commit: Y | feat(game): add achievement system and storage

- [ ] 12. **components/: 生存流 UI 组件（含打击感反馈集成）**
  创建以下组件（全部 `React.memo` + 类型 Props，每个组件内部接收 `screenEffect` 状态切换 CSS class）：

  ### 核心游戏组件
  - **ScreenOverlay** — 全屏效果层，覆盖在所有内容之上（pointer-events: none）。根据 `screenEffect.type` 渲染不同的 overlay 效果：闪白(`correct`)、闪红(`wrong`)、金色光晕(`achievement`)、灰化(`timeout`)、慢暗(`game-over`)。透明度动画驱动。
  
  - **HeartsDisplay** — ❤️×N 图形显示，每颗❤️独立 DOM 元素。接收 `lives`、`maxLives`、`effect`。扣命时目标❤️播放 `heart-explode` 动画（scale→0+碎片），其他❤️弹性重排（stagger 80ms）。加命时新❤️从底部 `heart-pop-in` 弹入（`cubic-bezier(.34,1.56,.64,1)` 弹性曲线）。1❤️时永久红色脉动预警。
  
  - **ComboIndicator** — 连击数显示。接收 `combo`、`effect`。combo=0 隐藏。combo 1-2 正常字号。combo≥3 时逐级增加字号+色调：3-4蓝色、5-7紫色、8-9金色+文字发光`text-shadow`、10+金色+旋转光环。每次 combo 增加触发 bounce 缩放动画（`transform: scale(1→1.5→1)`）。额外显示 🔥 图标数量随 combo 增加（3🔥→5🔥🔥→10🔥🔥🔥）。
  
  - **TimerBar** — 进度条 + 倒计时数字。接收 `timeLeft`、`totalTime`、`effect`。进度条宽度平滑过渡（`transition: width .3s linear`）。颜色渐变：>20s绿 → 10-20s黄 → <10s红+脉动（`animation: timer-pulse .5s infinite`）。最后3秒数字放大+闪烁+红色阴影。超时时进度条倒塌动画（width→0 加速）。
  
  - **WordCard** — AI描述卡片。接收 `description`、`hint`、`isGenerating`、`effect`。加载时骨架屏。包含类别提示标签。描述文本正常显示。答错时由父组件控制额外覆层显示正确答案。
  
  - **InputArea** — 输入框+提交按钮。接收 `value`, `onChange`, `onSubmit`, `disabled`, `effect`。提交后短暂禁用防抖。答对/答错后输入框闪烁对应颜色（正确绿边、错误红边 300ms）+ 自动清空。

  ### 反馈/结果组件
  - **AnswerFeedback** — 答对/答错的叠加反馈层。答对时："+N分"文字从中间弹出（`score-pop`），飘散消失。答错时：覆盖层显示"正确答案：XXX" 打字机逐字动画（`typewriter` 80ms/字），背景红色半透明。

  - **GameOverScreen** — 游戏结束结算屏。接收 `score`, `wordsCompleted`, `accuracy`, `longestStreak`, `rank`, `achievements`, `onRestart`。组件入场时逐行显现（`stagger 200ms` delay）。"GAME OVER" 标题爆炸入场。段位图标旋转放大。已解锁成就列表。得分总览。各数值带计数器递增动画（0→最终值）。

  ### 系统组件
  - **StartScreen** — 起始页面。接收 `bestScore`, `rank`, `achievements`, `onStart`。显示：游戏标题 + 段位徽章 + 最高分记录 + 3个难度选择卡片（easy/normal/hard 各一张，hover 时放大+发光）。卡片上标注时间限制。底部显示已解锁成就数。
  
  - **AchievementBanner** — 成就解锁横幅。接收 `achievement`, `visible`。入场：金色光晕 overlay → 横幅从顶部滑入 → 图标旋转 → 粒子散落。停留 2s → 滑出。不可交互（纯展示）。自动消失后通知父组件。
  
  - **RankBadge** — 段位图标。接收 `rank: PlayerRank`。显示不同颜色+图标：🥉青铜、🥈白银、🥇黄金、💎钻石、👑大师、🏆传说。小徽章形式可嵌入各页面。
  
  - **ScreenShake** — 屏幕震动容器。包裹游戏内容。接收 `intensity: number`（0-10）。根据强度触发不同程度 `transform: translateX` 震动动画。答错时剧烈（intensity 8），连击升级时中等（intensity 4-6），答对时轻微（intensity 2）。震动曲线用 `cubic-bezier` 制造衰减效果。

  ### 设计原则
  - 所有组件通过 `screenEffect` prop 接收反馈状态，切换对应 CSS class
  - 动画性能优先：所有动效用 `transform` + `opacity` 驱动（GPU 合成层）
  - `will-change: transform, opacity` 在动画元素上声明
  - 无 JS 动画库，纯 Tailwind + CSS keyframes
  Wave 4 | Blocked by: 8, 10, 11 | Blocks: 14
  References: app/page.tsx, globals.css, lib/types.ts (ScreenEffectType)
  Acceptance criteria: `npx tsc --noEmit` 通过。答对→闪白+弹出+震动。答错→红闪+震动+碎裂。combo升级→边框脉冲变色。成就→金色爆炸。游戏结束→慢暗+爆炸标题。
  Commit: Y | refactor(ui): create survival rush UI components with impact feedback

- [ ] 13. **游戏历史 + 统计展示**
  在 `lib/storage.ts` 基础上，构建:
  - 历史记录页面（可放在主页底部或独立 section）
  - 显示最近 20 局记录的表格: 日期/难度/得分/答对数/最高连击/命数
  - 全局统计摘要: 总场次/总答对数/最高分/最高连击/当前段位/已解锁成就数
  - 清除数据按钮（带确认）
  Wave 4 | Blocked by: 8 | Blocks: 14
  References: lib/storage.ts (新), lib/types.ts (GameHistory, GameStats 新)
  Acceptance criteria: 完成1局→历史出现1条。5局后统计正确。
  Commit: Y | feat(ui): add game history and statistics display

- [ ] 14. **app/page.tsx: 集成全部组件 + ErrorBoundary**
  page.tsx 重写为薄层:
  - idel: StartScreen（难度选择+最高分+段位）
  - playing: ScreenOverlay + ScreenShake 包裹游戏区，内部 HeartsDisplay + ComboIndicator + TimerBar + WordCard + InputArea
  - 操作反馈: AnswerFeedback 层叠在游戏区之上，根据 screenEffect 类型显示正确的叠加效果
  - game_over: GameOverScreen（结果+成就+再来一局）
  
  screenEffect 状态从 useGame 获取，通过 props 下发到每个子组件。ScreenOverlay 和 ScreenShake 监听 screenEffect 类型切换 CSS class。
  替换所有 `alert()` 调用。创建 `components/ErrorBoundary.tsx`（class 组件，显示错误+重试按钮）。包裹根组件。
  Wave 5 | Blocked by: 9, 10, 12, 13 | Blocks: 15
  Acceptance criteria: 完整的生存竞速可玩: 选难度→开始→猜词→连击回血→命用完→结束→成就解锁→历史记录。
  Commit: Y | refactor(page): integrate survival rush components

- [ ] 15. **构建验证 + 最终审查**
  `npm run build` + `npx tsc --noEmit`。手动测试完整游戏流程（3个难度各一局），验证所有动画、成就解锁、数据持久化。
  Wave 5 | Blocked by: 14 | Blocks: Final
  Acceptance criteria: 构建通过。3个难度都能正常游戏。至少1个成就可解锁。数据刷新后保留。
  Commit: Y | chore(build): final build verification

## Final verification
- [ ] F1. 所有待办完成，验收条件满足
- [ ] F2. 代码质量：无 `any`、无 `alert()`、无死代码
- [ ] F3. 真实手动 QA：三个难度完整游戏
- [ ] F4. 游戏性能：动画不掉帧，API 调用正常

## 成功标准
1. `npm run build` 通过
2. 生存竞速完整可玩：选难度→5条命→猜词→连击≥3回血→命用完→结束
3. 3个难度有明显差异（时间压力+词库难度）
4. 视觉特效：连击闪光、计时脉动、答对/答错反馈、成就横幅
5. 至少5个成就可以解锁
6. 段位系统（青铜→传说）按累计积分推进
7. 游戏历史保存+统计显示
8. 零 `alert()` 调用
9. 刷新页面数据保留
10. ErrorBoundary 兜底
