import type { EngineInterface, Register, ThemeMessageRule, ThemeSetArgs } from 'claude-code'

import { SCENE } from './scene.js'

// Keeps the app's own colors and background. Adds a faint tree with a warm
// glow, a holly sprig, a string of lights, a Santa hat on the corner of your
// messages and a countdown in the status line. /christmas hides or shows it
// all. Nothing animates. No blur, no snow.

const BACKDROP: ThemeSetArgs = { backdrop: { scene: 'christmas', glass: false } }

// Your message bubble in the app's own bubble color, with a small Santa hat
// perched on its top-right corner. The drawing is cut in nine, so the corners
// stay put and the middle stretches to fit any message.
const HATTED_BUBBLE: ThemeMessageRule = {
  backgroundColor: 'bg-user-message',
  color: 'text-user-message',
  paddingTop: 26,
  paddingBottom: 12,
  paddingX: 16,
  fill: {
    vector: {
      viewBox: [128, 96],
      slice: [44, 44, 18, 18],
      paths: [
        { d: 'M16 14H112A16 16 0 0 1 128 30V80A16 16 0 0 1 112 96H16A16 16 0 0 1 0 80V30A16 16 0 0 1 16 14Z', color: 'bg-user-message' },
        { d: 'M94 18C96 8 104 1 113 1C121 1 126 7 126 15C123 11 119 10 117 13C115 16 116 19 118 20Z', color: '#c0293a' },
        { d: 'M108 19C110 12 111 6 113 1C121 1 126 7 126 15C123 11 119 10 117 13C115 16 116 19 118 20Z', color: '#9a1f2e' },
        { d: 'M93 16L119 18Q123.5 18.5 123 23Q122.5 27.4 118 27L92 25Q87.6 24.6 88 20.2Q88.5 15.7 93 16Z', color: '#f2eee6' },
        { d: 'M88.3 22.2Q89.5 23.4 92.2 23.6L118.3 25.6Q121.8 25.8 122.9 23.8Q122.2 27.4 118 27L92 25Q88.6 24.7 88.3 22.2Z', color: '#d6d0c4' },
        { d: 'M120 14A4 4 0 1 0 128 14A4 4 0 1 0 120 14Z', color: '#f2eee6' },
      ],
    },
  },
}

const HIDDEN_KEY = 'hidden'
const HOUR = 60 * 60 * 1000

/** "🎄 32 days to Christmas", counted in whole calendar days on this computer's clock. */
export function countdown(nowMs: number): string {
  const now = new Date(nowMs)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  let christmas = new Date(now.getFullYear(), 11, 25)

  if (today > christmas) {
    christmas = new Date(now.getFullYear() + 1, 11, 25)
  }

  const days = Math.round((christmas.getTime() - today.getTime()) / (24 * HOUR))

  if (days === 0) {
    return '🎄 Merry Christmas!'
  }

  return `🎄 ${days} ${days === 1 ? 'day' : 'days'} to Christmas`
}

async function isHidden($: EngineInterface): Promise<boolean> {
  return (await $.store.get(HIDDEN_KEY)) === true
}

async function showAll($: EngineInterface): Promise<void> {
  let set
  try {
    set = await $.theme.set({ ...BACKDROP, style: { UserMessage: HATTED_BUBBLE } })
  } catch (error) {
    // A build that takes no message style still gets the tree, lights and holly.
    $.ui.log(String(error))
    set = await $.theme.set(BACKDROP)
  }

  if (!set.isDrawn) {
    $.ui.log(set.reason)
  }

  $.ui.status(countdown(await $.clock.now()))
}

async function hideAll($: EngineInterface): Promise<void> {
  await $.theme.clear()
  $.ui.status(undefined)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'christmas',
      description: 'Hide or show the Christmas decorations',
    })

    if (await isHidden($)) {
      $.ui.status(undefined)
    } else {
      await showAll($)
    }

    // Keep the countdown right past midnight.
    $.clock.every(HOUR, async () => {
      if (!(await isHidden($))) {
        $.ui.status(countdown(await $.clock.now()))
      }
    })

    return next(e)
  })

  on('command.run', { command: 'christmas' }, async $ => {
    if (await isHidden($)) {
      await $.store.set(HIDDEN_KEY, false)
      await showAll($)

      return { text: 'Christmas decorations are back. 🎄' }
    }

    await $.store.set(HIDDEN_KEY, true)
    await hideAll($)

    return { text: 'Christmas decorations hidden. Type /christmas to bring them back.' }
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    // Drawn as a plain image: nothing in it moves.
    return <Svg source={SCENE} alt="A small lit Christmas tree, a string of lights, a holly sprig and a gingerbread cookie" />
  })
}
