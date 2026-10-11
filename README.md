# TRENCH — Phase 1

A playable desktop browser vertical slice built from scratch with TypeScript, Vite, and Canvas 2D. No runtime libraries, external assets, paid services, or Phaser. This is Phase 1, not the complete five-phase game.

## Launch

Requires Node.js 20.19+ or 22.12+ (verified with Node 24).

```sh
npm install
npm run dev
```

Open http://localhost:5173. On this managed workspace, if npm's default cache cannot be written, use `npm install --cache /tmp/trench-npm-cache`.

```sh
npm run build
npm run preview
npm test
```

## Play

Choose **Begin Operation**. Infantry on both sides reinforce automatically; you cannot deploy or directly move them. Click a battlefield lane or press **1–4** to select it. Support always targets the selected lane:

| Key | Command | Cost | Cooldown | Effect |
| --- | --- | --- | --- | --- |
| Q | Smoke | 20 SP | 18s | Conceals the lane for 12s, reducing both sides' effective fire |
| W | Repair | 25 SP | 15s | Restores 45 friendly trench integrity and rallies friendly soldiers by 20 morale |
| E | Artillery | 40 SP | 25s | Hits the foremost enemy concentration within 120 world units for 65 HP, pins survivors, damages cover |

SP starts at 50 and regenerates at 2.5/s, capped at 100. **Esc** pauses or resumes; switching away from the browser tab pauses automatically. Yellow bars identify pinned soldiers; `!` marks broken morale. Cover percentages appear below trenches. Blue and red are friendly and hostile.

Hold the Line lasts 180 simulation seconds. Three friendly breakthroughs win early; three hostile breakthroughs lose. At the deadline, matching or exceeding the hostile breakthrough count wins. Units crossing the opposite rear boundary count as breakthroughs and leave the field. The after-action report shows casualties and breakthroughs. Redeploy restarts the same seeded battle.

## Working systems

- Four distinct combat lanes with selectable targeting, trench channels, integrity, sandbags, scorched terrain, and drifting fog.
- Automatic capped reinforcements, nearest-target fire, short tracers and impact puffs, three-hit exposed infantry, basic cover mitigation, suppression, morale recovery, retreat and advance.
- Three functional prototype support actions with SP costs, cooldowns and visible effects.
- Main menu with mission briefing, battle HUD, pause screen, and victory/defeat reports.
- Fixed 30Hz simulation with seeded random combat, independent rendering and bounded frame catch-up.
- Keyboard and mouse input, responsive canvas resolution with capped device pixel ratio.

## Files and architecture

- `index.html`, `package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore`: project and build setup.
- `src/main.ts`: composition, screen state and input.
- `src/style.css`, `src/ui.ts`: interface, HUD, menus and reports.
- `src/game/model.ts`: shared battle state and deterministic random generator.
- `src/game/loop.ts`: fixed-step loop.
- `src/game/renderer.ts`: Canvas terrain, trenches, units, support and combat effects.
- `src/game/simulation.ts`: simulation orchestration, autonomous movement and cleanup.
- `src/game/combat.ts`, `morale.ts`, `cover.ts`: fire, suppression/morale, and cover.
- `src/game/support.ts`: costs, cooldowns and effects.
- `src/game/ai.ts`: baseline autonomous reinforcement schedule.
- `src/game/mission.ts`: Hold the Line end conditions.
- `tests/simulation.test.ts`: deterministic full battles, resource/cooldown rules, cover, artillery targeting, outcomes and finished-state freezing.

## Verification

`npm run build` and `npm test` pass. Chromium smoke checks verified start, lane keyboard selection, smoke authorization, frozen pause state, resume, desktop and smaller viewport rendering, and absence of runtime exceptions. Deterministic simulation checks demonstrated both defeat without support and victory with support on the default seed.

## Subsequent phases

2. Refine trench occupancy, cover destruction, battlefield position capture and frontline movement, combat balance, morale behavior and retreat logic. Current trench locations are fixed; the dotted frontline is a unit-position indicator, not captured territory.
3. Add medical support, UAV reconnaissance and tanks; deepen targeting and support interaction. The three current commands are working prototypes, with immediate artillery rather than a delayed barrage.
4. Implement adaptive enemy lane pressure and reactions, Breakthrough and Attrition, a three-scenario selection screen, and mission-specific reporting. Current AI reinforces each lane on a fixed schedule; only Hold the Line is playable.
5. Polish visual effects, accessibility, interface feedback, sound and balancing. All current visuals are generated in Canvas; no asset download is required.
