import { expect, test } from 'vitest'
import { getL10nFunction } from './getL10nFunction.js'

test('loads', () => {
  expect(getL10nFunction).not.toBeUndefined()
})

test('returns a function that can be used to extract localized messages (single string value)', async () => {
  const l = getL10nFunction('en', { 'a.0': 'message here' })

  expect(l('a.0')).toMatchInlineSnapshot(`"message here"`)
})

test('returns a function that can be used to extract localized messages (multiple string and function values)', async () => {
  const messages = {
    'a.0': 'message here',
    'a.1': ({ a }: Readonly<{ a: string }>): string => `${a}`,
  }

  const l = getL10nFunction('fr', messages)

  expect(l('a.1', { a: "I'm a" })).toMatchInlineSnapshot(`"I'm a"`)
})

test('throws when params are expected, but not received', async () => {
  const l = getL10nFunction('fr', {
    'a.0': 'message here',
    'a.1': ({ a }: Readonly<{ a: string }>) => `${a}`,
  })

  expect(() => {
    // @ts-expect-error error as l expect function params
    l('a.1')
  }).toThrowErrorMatchingInlineSnapshot(
    `[Error: Params for key 'a.1' in locale 'fr' unexpectedly not found.]`,
  )
})

test('throws when params is received, but not expected', async () => {
  const l = getL10nFunction('fr', {
    'a.0': 'message here',
    'a.1': ({ a }: Readonly<{ a: string }>) => `${a}`,
  })

  expect(() => {
    // @ts-expect-error parameter here is not expected
    l('a.0', { a: 'hi' })
  }).toThrowErrorMatchingInlineSnapshot(
    `[Error: Params for key 'a.0' in locale 'fr' unexpectedly defined.]`,
  )
})
