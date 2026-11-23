import { expect, test } from 'claude-code/testing'

import { countdown } from './register.js'

const at = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h).getTime()

test('counts whole days to Christmas', async () => {
  expect(countdown(at(2026, 11, 23))).toBe('🎄 32 days to Christmas')
  expect(countdown(at(2026, 11, 23, 23))).toBe('🎄 32 days to Christmas')
  expect(countdown(at(2026, 12, 24, 0))).toBe('🎄 1 day to Christmas')
  expect(countdown(at(2026, 12, 25, 18))).toBe('🎄 Merry Christmas!')
})

test('after Christmas it counts to next year', async () => {
  expect(countdown(at(2026, 12, 26))).toBe('🎄 364 days to Christmas')
})
