# ai-draw-guess-optimization-v2 — Revised Work Plan

## TL;DR (For humans)

**What you'll get:** The foundation is solid — 5 AI providers, 100+ words, unified API. Now we build the actual game experience on top: 4 game modes (Classic/Practice/Timed/Hard), smarter scoring with speed bonuses and streaks, progressive hints that help without spoiling, a settings panel to switch providers, and game history saved in your browser. The messy page.tsx gets cleaned up with proper component extraction and CSS animations for a polished feel.

**Why this approach:** Waves 1-2 (infrastructure) are already done from git HEAD restoration. We jump straight to Wave 3 (game engine hook extraction), then build gameplay features (modes, scoring, hints) in parallel, then UI polish (components, animations, settings). page.tsx already has correct type imports, making extraction safe.

**What it will NOT do:** No multiplayer, no backend, no image generation, no English translation, no PWA. Pure single-player Chinese word-guessing game — just much better.

**Effort:** Large
**Risk:** Medium — Game hook extraction is the most impactful change; incremental extraction with tests-at-each-step mitigates risk.
**Decisions I made for you:**
- Wave ordering: extract hook BEFORE building modes/scoring/hints (hook is the foundation for everything)
- 4 game modes same as original plan: Classic (5 rounds × 60s), Practice (unlimited, no score), Timed (most correct in 120s), Hard (5 rounds × 30s, no hints)
- Scoring: base 10 + speed bonus (timeLeft/12 capped at 5) + streak multiplier (1 + streak × 0.5)
- Hints auto-trigger at 30%/50%/70% time elapsed, can purchase with -3 score
- UI: extracted React.memo'd components + Tailwind animations (no new library)

Your next move: **Approve** and start work, or request high-accuracy review.

---

> TL;DR (machine): Large effort, medium risk. 10 todos across 6 waves. Waves 1-2 DONE (infrastructure restored from HEAD). Wave 3: game hook. Wave 4: modes+scoring+hints (parallel). Wave 5: UI components+animations+settings (parallel). Wave 6: game history. Wave 7: integration. Wave 8: polish+build.

## Scope

### Already DONE (from git HEAD restoration — verified)
| # | Task | Status |
|---|------|--------|
| 1 | `lib/types.ts` — Shared types (GamePhase, GameState, WordItem, etc.) | ✅ DONE |
| 2 | `lib/words.ts` — 100+ words, 15 categories, 3 difficulty tiers | ✅ DONE |
| 3 | `.env.example` + `lib/env.ts` — Multi-provider env config | ✅ DONE |
| 4 | `lib/api-client.ts` — Unified API client (5 providers, custom errors) | ✅ DONE |
| 5 | `app/api/generate-description/route.ts` — Provider selection support | ✅ DONE |
| — | `app/page.tsx` — Type imports corrected, uses `lib/words.ts`, `phase`-based state | ✅ DONE |

### Must have (new work)
6. Game engine extracted into `hooks/useGame.ts` custom hook
7. 4 game mode configurations in `lib/game-modes.ts`
8. Enhanced scoring in `lib/scoring.ts` (speed bonus + streak multiplier)
9. Progressive hint system in `lib/hints.ts` (auto + purchasable)
10. Extracted UI components in `components/` (ScoreBoard, TimerBar, DescriptionCard, InputArea, ResultPanel, ModeSelector, SettingsPanel)
11. CSS animations: timer progress bar, confetti, transitions
12. Settings panel with provider selection + mode selector UI
13. Game history + stats in `lib/storage.ts` (LocalStorage)
14. Integration: Wire all components + hook into page.tsx
15. ErrorBoundary + remove `alert()` calls → inline error UI

### Must NOT have
- No backend server, database, or user accounts
- No real-time multiplayer
- No image generation or image-recognition gameplay
- No new UI dependencies — Tailwind CSS only
- No PWA / offline-first
- No i18n / English translation
- No unit test framework — manual QA + build verification only
- No deployment configuration changes
- Word bank: no words longer than 4 Chinese characters
- Scoring: no negative scores (minimum 0 per round)

## Verification strategy
- Test decision: tests-after (manual verification scripts)
- Evidence: `.omo/evidence/`

## Execution strategy

### Waves
| Wave | Todos | Parallel? | Depends on |
|------|-------|-----------|------------|
| Wave 1-2 | 1-5 | ✅ DONE | — |
| Wave 3 | 6 (game hook) | ❌ solo | 1-5 (DONE) |
| Wave 4 | 7-9 (modes, scoring, hints) | ✅ parallel | 6 |
| Wave 5 | 10-12 (components, animations, settings) | ✅ parallel | 6 |
| Wave 6 | 13 (game history) | ❌ solo | 6 |
| Wave 7 | 14-15 (integration, error boundary) | ❌ sequential | 10-12, 13 |
| Wave 8 | Build verify + plan compliance | ❌ sequential | 14-15 |

### Dependency matrix
| Todo | Depends on | Blocks |
|------|-----------|--------|
| 6. Game hook | (DONE 1-5) | 7-15 |
| 7. Game modes | 6 | 14 |
| 8. Scoring | 6 | 14 |
| 9. Hints | 6 | 14 |
| 10. UI components | 6 | 14 |
| 11. Animations | 10 | 14 |
| 12. Settings UI | 6, 10 | 14 |
| 13. Game history | 6 | — |
| 14. Integration | 7-13 | 15 |
| 15. ErrorBoundary | 14 | 16 |
| 16. Build verify | 15 | Final |

## Todos

- [ ] 6. **hooks/useGame.ts: Extract game engine from page.tsx into custom hook**
  What to do / Must NOT do: Create `hooks/useGame.ts`. Extract all game logic from `app/page.tsx`: state machine (phase transitions: idle → playing → showing_result → game_over), timer with countdown, round loading with retry (via generateDescription + lib/api-client), answer submission with correctness check, scoring, and game reset. Hook signature: `useGame() => { gameState, actions: { startGame, submitGuess, resetGame } }`. Include the `sessionWords` management inside the hook. Use the restored `GameState` type from `lib/types.ts`. Must NOT contain any JSX/rendering. Must clean up timers on unmount.
  Wave 3 | Blocked by: (DONE 1-5) | Blocks: 7-15
  References: app/page.tsx:7-207 (all current game logic), lib/types.ts:44-62 (GameState interface)
  Acceptance criteria: `npx tsc --noEmit` passes. Importing `useGame` in a test component allows starting a game, submitting guesses, and resetting — all state transitions correct.
  Commit: Y | refactor(core): extract game engine into useGame hook

- [ ] 7. **lib/game-modes.ts: Implement 4 game mode configurations**
  What to do / Must NOT do: Create `lib/game-modes.ts` with 4 mode presets. Each returns a `GameSettings` object: Classic (5 rounds, 60s, hints on, category on), Practice (unlimited, 90s, hints on, category on, trackScore=false), Timed (as-many-as-possible in 120s, total rounds = 999), Hard (5 rounds, 30s, no hints, no category). Export `GAME_MODES` array and `getModeSettings(mode: GameMode): GameSettings`. Must NOT contain game loop logic — just configuration.
  Wave 4 | Blocked by: 6 | Blocks: 12, 14
  References: lib/types.ts:33-42 (GameSettings interface), app/page.tsx:8-11 (current constants)
  Acceptance criteria: `import { getModeSettings } from '@/lib/game-modes'; getModeSettings('classic')` returns correct defaults matching current game.
  Commit: Y | feat(game): add 4 game mode configurations

- [ ] 8. **lib/scoring.ts: Implement enhanced scoring system**
  What to do / Must NOT do: Create `lib/scoring.ts`. Formula: `baseScore(10) + speedBonus(floor(timeLeft / 12), capped at 5) + streakMultiplier(1 + streak × 0.5)`. Final score = round scores × multiplier. Export `calculateRoundScore(correct: boolean, timeLeft: number, totalTime: number, streak: number): number` and `calculateFinalStats(scores: number[]): { total, rounds, average, bestStreak }`. Must NOT mutate any state.
  Wave 4 | Blocked by: 6 | Blocks: 14
  References: app/page.tsx:127-147 (current +10 scoring), lib/types.ts:44-62 (GameState streak/roundScores fields)
  Acceptance criteria: Correct + 60s time + streak 0 → 15 (10+5). Correct + 10s → 10 (10+0). Streak 3 → ×1.5. Wrong → 0.
  Commit: Y | feat(game): add speed bonus and streak multiplier scoring

- [ ] 9. **lib/hints.ts: Progressive hint system**
  What to do / Must NOT do: Create `lib/hints.ts`. Auto-hints trigger at elapsed time %: 30% → word length ("该词有 N 个字"), 50% → first character, 70% → second character. Purchasable hints cost -3 score and reveal one more character. Export `getAutoHint(word: string, elapsedRatio: number, revealedCount: number): string | null` and `purchaseHint(word: string, revealedCount: number): { hint: string, cost: number }`. Must NOT reveal full word. Must respect mode settings (hints disabled in Hard mode).
  Wave 4 | Blocked by: 6 | Blocks: 14
  References: app/page.tsx:247-250 (current category hint display), lib/types.ts (hint-related fields)
  Acceptance criteria: 30% elapsed → "该词有 2 个字". 50% → "第一个字是 '苹'". Purchase with 0 revealed → cost 3, hint is length.
  Commit: Y | feat(game): add progressive hint system

- [ ] 10. **components/: Extract 7 UI components**
  What to do / Must NOT do: Create `components/` directory. Each component is standalone, memoized (`React.memo`), with typed props:
  - `ScoreBoard`: score, round, totalRounds, streak
  - `TimerBar`: timeLeft, totalTime — visual progress bar (green→yellow→red) with numeric display
  - `DescriptionCard`: description text, isGenerating, currentHint — loading skeleton, hint display
  - `InputArea`: value, onChange, onSubmit, disabled — input field + submit button
  - `ResultPanel`: resultType, currentWord, score, isLastRound, onReset — correct/wrong/timeout display
  - `ModeSelector`: onSelect, currentMode — 4 mode cards with descriptions
  - `SettingsPanel`: provider, mode, onSettingsChange — dropdown + mode selector
  Must NOT contain game logic. Extract JSX from page.tsx line 209 onwards.
  Wave 5 | Blocked by: 6 | Blocks: 11, 12, 14
  References: app/page.tsx:209-329 (full render block)
  Acceptance criteria: `npx tsc --noEmit` passes. Each component renders with test props without crash.
  Commit: Y | refactor(ui): extract game UI into reusable components

- [ ] 11. **app/globals.css + tailwind.config.js: Add CSS animations**
  What to do / Must NOT do: Add animations using Tailwind utilities + custom keyframes in globals.css: TimerBar smooth width transition + color gradient (green→yellow→red via Tailwind classes), ResultPanel fade-in + slide-up, confetti burst on correct answer (pure CSS keyframes, no library), mode selector cards hover glow. Must NOT add JS animation libraries. Must respect `prefers-reduced-motion`.
  Wave 5 | Blocked by: 10 | Blocks: 14
  References: app/globals.css (currently 3 lines), tailwind.config.js (extends empty)
  Acceptance criteria: Timer bar animates. Correct → confetti. All transitions respect reduced-motion.
  Commit: Y | style(ui): add CSS animations for timer, confetti, transitions

- [ ] 12. **Settings panel with AI provider selection UI**
  What to do / Must NOT do: Build settings accessible from home screen (modal or slide-out). Contains: provider dropdown (5 options with descriptions, sourced from lib/env.ts `getAllProviderConfigs`), mode selector (4 modes from lib/game-modes.ts), difficulty filter (easy/normal/hard/all). Persist settings to localStorage under key `ai-draw-guess-settings`. Provider selection propagates to API calls. Must NOT expose API keys — keys stay server-side. Must NOT store API keys in localStorage.
  Wave 5 | Blocked by: 6, 10 | Blocks: 14
  References: lib/env.ts (getAllProviderConfigs, getAvailableProviders), lib/types.ts:21-31 (ProviderConfig)
  Acceptance criteria: Switch provider → API uses selected provider. Settings survive refresh.
  Commit: Y | feat(ui): add settings panel with AI provider selection

- [ ] 13. **lib/storage.ts: Game history and stats persistence**
  What to do / Must NOT do: Create `lib/storage.ts` for LocalStorage: `saveGameResult(result)`, `getGameHistory(): GameHistory[]`, `getGameStats(): GameStats`, `clearHistory()`. Store as JSON under `ai-draw-guess-history`. Max 100 entries (oldest trimmed on overflow). Handle missing localStorage gracefully (private browsing, quota) — return defaults, never crash.
  Wave 6 | Blocked by: 6 | Blocks: 14
  References: lib/types.ts:64-85 (GameHistory, GameStats interfaces)
  Acceptance criteria: 1 game → 1 history entry. 5 games → correct aggregates in stats. Private browsing → returns empty, no crash.
  Commit: Y | feat(game): add LocalStorage game history and statistics

- [ ] 14. **app/page.tsx: Wire everything together**
  What to do / Must NOT do: Rewrite page.tsx to a thin orchestration layer: imports all extracted components, useGame hook, game-modes, and storage. Page renders differently per phase: idle → StartScreen (settings + mode selector), playing/showing_result → GameView (ScoreBoard + TimerBar + DescriptionCard + InputArea/ResultPanel), game_over → FinalResults. Replace `alert()` calls with inline toast/error messages. Save game result on game_over. Must NOT introduce new bugs — behavior matches current game.
  Wave 7 | Blocked by: 7-13 | Blocks: 15
  References: app/page.tsx (current), components/* (new), hooks/useGame.ts (new)
  Acceptance criteria: Full game works: select mode → play rounds → see results → history saved. All 4 modes functional. Provider switching works.
  Commit: Y | refactor(page): integrate extraction components and hook

- [ ] 15. **components/ErrorBoundary.tsx: Graceful error handling**
  What to do / Must NOT do: Create React ErrorBoundary (class component) with fallback UI: "出错了" + retry button. Wrap app root. Add inline error states to DescriptionCard (API failure → retry), InputArea (submission error → toast). Remove all remaining `alert()`/`confirm()` calls from page.tsx and components. Must NOT crash the app on unhandled errors.
  Wave 7 | Blocked by: 14 | Blocks: 16
  References: app/page.tsx (any remaining alert() calls)
  Acceptance criteria: Throw in child → ErrorBoundary catches. API fail → retry shown, not alert. Zero alert() calls.
  Commit: Y | feat(ui): add ErrorBoundary and remove alert() calls

- [ ] 16. **Build verification + final polish**
  What to do / Must NOT do: Run `npm run build` and fix any errors. Run `npx tsc --noEmit`. Verify all JSX paths render. Manual test checklist: play through all 4 modes, switch providers, verify scoring, verify hints, check history, test error states. Document any known issues.
  Wave 8 | Blocked by: 15 | Blocks: Final
  References: package.json scripts
  Acceptance criteria: Build passes. Manual checklist complete. All 4 modes functional.
  Commit: Y | chore(build): final build verification and polish

## Commit strategy
- One commit per todo
- Conventional commit prefixes: `refactor`, `feat`, `fix`, `style`, `chore`
- No `feat`+`fix` mixing

## Success criteria
1. All 4 game modes playable without errors
2. At least 2 AI providers functional
3. 100+ words available
4. Scoring correctly applies speed bonus + streaks
5. Hints appear at correct thresholds
6. Game history saves and displays
7. Zero `alert()` calls in production code
8. Responsive at 320px–1440px
9. Error states handled gracefully (no white screens)
10. `npm run build` succeeds
