import { expect, test } from 'vitest'
import { paramCheck } from './index.js'

test('throws if only value is undefined', async () => {
  const a = undefined

  expect(() => {
    paramCheck([a], `a = ${a}`)
  }).toThrowErrorMatchingInlineSnapshot(
    `[Error: Param unexpectedly has undefined value]`,
  )
})

test('throws if any value is undefined', async () => {
  const a = 'a'
  const b = 'b'
  const c = undefined

  expect(() => {
    paramCheck([a, b, c], `a = ${a}, b = ${b}, a = ${c}`)
  }).toThrowErrorMatchingInlineSnapshot(
    `[Error: Param unexpectedly has undefined value]`,
  )
})

test('returns the second argument is no param in the array is undefined (single argument)', async () => {
  const a = 'a'

  const result = paramCheck([a], `a = ${a}}`)
  expect(result).toMatchInlineSnapshot('"a = a}"')
})

test('returns the second argument is no param in the array is undefined', async () => {
  const a = 'a'
  const b = 'b'
  const c = 'c'

  const result = paramCheck([a, b, c], `a = ${a}, b = ${b}, a = ${c}`)
  expect(result).toMatchInlineSnapshot('"a = a, b = b, a = c"')
})
