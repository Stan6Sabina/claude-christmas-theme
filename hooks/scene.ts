// A few quiet decorations over the app's own background: a faint lit tree with
// a warm glow in the bottom-right corner, and a string of six lights near the
// top, tied off with a holly sprig. Nothing moves. No fill
// behind them, so the app's own dark background shows through. No snow.
//
// The root has no viewBox, so it fills any window; each corner is a nested
// svg pinned with its own preserveAspectRatio, so nothing gets cropped.

const RED = '#a8283a'
const RED_DARK = '#7e1c2a'
const GOLD = '#c9a24a'
const PINE = '#1b4a2e'
const PINE_MID = '#22593a'
const PINE_SHADE = '#123522'

// Tree lights, still: nothing in the scene moves, so it costs nothing to draw.
const light = (cx: number, cy: number, color: string) =>
  `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${color}"/>`

const tree = `
  <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMaxYMax meet">
    <ellipse cx="871" cy="800" rx="300" ry="260" fill="url(#hearth)"/>
    <g class="tree">
      <rect x="860" y="918" width="22" height="50" fill="#4a2f1c"/>
      <path d="M871 720 L962 900 Q871 922 780 900Z" fill="${PINE}"/>
      <path d="M871 720 L962 900 Q916 912 871 914Z" fill="${PINE_SHADE}" opacity="0.6"/>
      <path d="M871 650 L942 796 Q871 814 800 796Z" fill="${PINE_MID}"/>
      <path d="M871 650 L942 796 Q906 806 871 808Z" fill="${PINE_SHADE}" opacity="0.5"/>
      <path d="M871 588 L922 700 Q871 714 820 700Z" fill="${PINE_MID}"/>
      <path d="M871 588 L922 700 Q896 708 871 710Z" fill="${PINE_SHADE}" opacity="0.45"/>
      <path d="M826 684 Q872 706 914 674" fill="none" stroke="${GOLD}" stroke-width="2.5" opacity="0.6"/>
      <path d="M808 780 Q872 810 932 766" fill="none" stroke="${GOLD}" stroke-width="2.5" opacity="0.6"/>
      <path d="M792 884 Q872 914 952 868" fill="none" stroke="${GOLD}" stroke-width="2.5" opacity="0.6"/>
      <circle cx="850" cy="664" r="7" fill="${RED}"/>
      <circle cx="896" cy="742" r="8" fill="${GOLD}" opacity="0.85"/>
      <circle cx="838" cy="760" r="8" fill="${RED}"/>
      <circle cx="822" cy="866" r="8" fill="${GOLD}" opacity="0.85"/>
      <circle cx="904" cy="860" r="8" fill="${RED}"/>
      ${light(880, 632, '#ffd86b')}
      ${light(862, 712, '#ffd86b')}
      ${light(912, 700, '#ffb38a')}
      ${light(866, 796, '#ffd86b')}
      ${light(920, 816, '#ffb38a')}
      ${light(810, 820, '#ffd86b')}
      ${light(868, 888, '#ffb38a')}
      ${light(940, 892, '#ffd86b')}
    </g>
    <circle cx="871" cy="584" r="30" fill="url(#starglow)" opacity="0.65"/>
    <polygon points="871,566 875.4,577.9 888.1,578.4 878.1,586.3 881.6,598.6 871,591.5 860.4,598.6 863.9,586.3 853.9,578.4 866.6,577.9" fill="${GOLD}"/>
  </svg>`

// The app draws its title bar and sidebar over the top and left of the
// backdrop, so the string of lights hangs below the title bar (TOP points
// down) and starts right of where the sidebar usually ends.
const TOP = 48
const START = 28 // percent of the window's width
const END = 94

// A holly sprig tying off the right end of the string, its leaves hanging
// down so they cover no bulb and stay inside the window.
const holly = `
  <svg x="${END}%" y="${TOP + 2}" width="1" height="1" overflow="visible">
    <g transform="scale(-1.1 1.1)" opacity="0.85">
      <g transform="rotate(65)">
        <path d="M0 0 Q12 -14 24 -8 Q30 -18 40 -10 Q50 -16 60 -4 Q66 4 58 10 Q50 20 40 12 Q30 22 22 14 Q10 18 0 0Z" fill="${PINE_MID}"/>
        <path d="M2 1 Q30 2 58 4" fill="none" stroke="${PINE_SHADE}" stroke-width="1.5"/>
      </g>
      <g transform="rotate(112)">
        <path d="M0 0 Q12 -14 24 -8 Q30 -18 40 -10 Q50 -16 60 -4 Q66 4 58 10 Q50 20 40 12 Q30 22 22 14 Q10 18 0 0Z" fill="${PINE}"/>
        <path d="M2 1 Q30 2 58 4" fill="none" stroke="${PINE_SHADE}" stroke-width="1.5"/>
      </g>
      <circle cx="6" cy="10" r="7" fill="${RED}"/>
      <circle cx="16" cy="4" r="6" fill="${RED_DARK}"/>
      <circle cx="12" cy="16" r="6" fill="${RED}"/>
      <circle cx="4" cy="7.5" r="1.8" fill="#ffffff" opacity="0.4"/>
    </g>
  </svg>`

// A thin string of six small lights, still. The wire stretches between START
// and END, and each bulb is pinned at the low point of its swag.
const COLORS = ['#e8b84a', '#b8283a', '#f3e3c0', '#2f7a47', '#e8b84a', '#b8283a']
const BULBS = COLORS.map((color, i) => [`${(START + ((END - START) * (2 * i + 1)) / 12).toFixed(3)}%`, color] as const)

const lights = `
  <svg x="${START}%" y="${TOP}" width="${END - START}%" height="40" viewBox="0 0 1000 40" preserveAspectRatio="none">
    <path d="M0 4 Q83.3 40 166.7 4 Q250 40 333.3 4 Q416.7 40 500 4 Q583.3 40 666.7 4 Q750 40 833.3 4 Q916.7 40 1000 4" fill="none" stroke="#4a4943" stroke-width="1.2" vector-effect="non-scaling-stroke"/>
  </svg>
  ${BULBS.map(
    ([x, color]) => `
  <svg x="${x}" y="${TOP}" width="1" height="1" overflow="visible">
    <circle cx="0" cy="31" r="10" fill="${color}" opacity="0.14"/>
    <rect x="-2.5" y="19.5" width="5" height="5" rx="1" fill="#5a5750"/>
    <ellipse cx="0" cy="31" rx="4.2" ry="6.2" fill="${color}"/>
    <ellipse cx="-1.3" cy="28.6" rx="1.1" ry="2" fill="#ffffff" opacity="0.35"/>
  </svg>`,
  ).join('')}`

// A little gingerbread cookie leaning in the bottom-left, in the strip between
// the sidebar and the chat column. Placed for the usual layout: a much wider
// sidebar or a narrow window can bring the column or the sidebar over it.
const GINGER = '#b8743a'
const GINGER_DARK = '#94592a'
const ICING = '#f4efe6'
// Points above the window's foot: the app's message box and status line sit
// on a solid panel about 70 points tall that covers the bottom of the backdrop.
const LIFT = 88

const cookie = `
  <svg x="25%" y="100%" width="1" height="1" overflow="visible">
    <ellipse cx="0" cy="-${LIFT - 2}" rx="20" ry="2.7" fill="#000000" opacity="0.25"/>
    <g transform="translate(0 -${LIFT}) rotate(-8) scale(0.9)" opacity="0.9">
      <g transform="rotate(-18 -9 -36)">
        <rect x="-29" y="-41" width="22" height="11" rx="5.5" fill="${GINGER}"/>
        <path d="M-24 -40 l2 2.2 l-2 2.2 l2 2.2 l-2 2.2" fill="none" stroke="${ICING}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g transform="rotate(18 9 -36)">
        <rect x="7" y="-41" width="22" height="11" rx="5.5" fill="${GINGER}"/>
        <path d="M24 -40 l-2 2.2 l2 2.2 l-2 2.2 l2 2.2" fill="none" stroke="${ICING}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g transform="rotate(12 -6 -18)">
        <rect x="-12" y="-22" width="11" height="22" rx="5.5" fill="${GINGER}"/>
        <path d="M-11 -5 l2.2 -2 l2.2 2 l2.2 -2 l2.2 2" fill="none" stroke="${ICING}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g transform="rotate(-12 6 -18)">
        <rect x="1" y="-22" width="11" height="22" rx="5.5" fill="${GINGER}"/>
        <path d="M2 -5 l2.2 -2 l2.2 2 l2.2 -2 l2.2 2" fill="none" stroke="${ICING}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <rect x="-12" y="-44" width="24" height="28" rx="9" fill="${GINGER}"/>
      <circle cx="0" cy="-54" r="12.5" fill="${GINGER}"/>
      <path d="M-12 -44 Q0 -40 12 -44" fill="none" stroke="${GINGER_DARK}" stroke-width="1" opacity="0.5"/>
      <circle cx="-4.2" cy="-56" r="1.7" fill="${ICING}"/>
      <circle cx="4.2" cy="-56" r="1.7" fill="${ICING}"/>
      <path d="M-4.5 -50 Q0 -46.5 4.5 -50" fill="none" stroke="${ICING}" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="0" cy="-37" r="2.3" fill="${RED}"/>
      <circle cx="0" cy="-30" r="2.3" fill="#2f7a47"/>
      <circle cx="0" cy="-23" r="2.3" fill="${RED}"/>
    </g>
  </svg>`

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <style>
    .tree { opacity: 0.75; }
  </style>
  <defs>
    <radialGradient id="starglow">
      <stop offset="0" stop-color="#ffe3a0" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#ffe3a0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="hearth">
      <stop offset="0" stop-color="#e3954a" stop-opacity="0.13"/>
      <stop offset="0.6" stop-color="#e3954a" stop-opacity="0.05"/>
      <stop offset="1" stop-color="#e3954a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  ${tree}
  ${lights}
  ${holly}
  ${cookie}
</svg>`
