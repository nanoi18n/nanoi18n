import { expect, test } from 'vitest'
import type { messages as enMixedParams } from './__test__/messages-mixed-params.en.js'
import type { messages as enParams } from './__test__/messages-params.en.js'
import type { NanoI18nL10nImporters } from './index.js'
import type {
  NanoI18nL10nFunction,
  NanoI18nL10nFunctionParams,
  NanoI18nL10nMessages,
} from './types.js'

test('NanoI18nL10nMessages results in TS errors when params are provided, but not expected', async () => {
  // @ts-expect-error a parameter is not expected in the array
  const params: NanoI18nL10nFunctionParams<typeof enMixedParams, 'a.1'> = [
    { a: 'val' },
  ]

  // NOTE: Added only to avoid no-unused-var error
  expect(params).not.toBeUndefined()
})

test('NanoI18nL10nMessages results in TS erros when it includes a message type not included in the type', async () => {
  const messages: NanoI18nL10nMessages<{ 'a.0': string; 'a.1': string }> = {
    'a.0': 'a.0 es',
    // @ts-expect-error the type of messages does not include parameterized functions
    'a.1': ({ b }: Readonly<{ b: string }>): string => `Hello ${b}`,
  }

  // NOTE: Added only to avoid no-unused-var error
  expect(messages).not.toBeUndefined()
})

test('NanoI18nL10nMessages results in TS erros when messages type does not include the specified key', async () => {
  const messages: NanoI18nL10nMessages<{
    'a.0': string
    'a.1': (p: Readonly<{ b: string }>) => string
  }> = {
    'a.0': 'a.0 es',
    'a.1': ({ b }: Readonly<{ b: string }>): string => `Hello ${b}`,
    // @ts-expect-error the type of messages does not include parameterized functions
    'a.2': ({ b }: Readonly<{ b: string }>): string => `Hello ${b}`,
  }

  // NOTE: Added only to avoid no-unused-var error
  expect(messages).not.toBeUndefined()
})

test('NanoI18nL10nMessages results in no TS erros when messages match the type', async () => {
  const messages: NanoI18nL10nMessages<{
    'a.0': string
    'a.1': (p: Readonly<{ b: string }>) => string
  }> = {
    'a.0': 'a.0 es',
    'a.1': ({ b }: Readonly<{ b: string }>): string => `Hello ${b}`,
  }

  // NOTE: Added only to avoid no-unused-var error
  expect(messages).not.toBeUndefined()
})

test('NanoI18nL10nFunctionParams results in no TS errors when params are provided as expected', async () => {
  const params: NanoI18nL10nFunctionParams<typeof enMixedParams, 'a.0'> = [
    { a: 'val' },
  ]

  // NOTE: Added only to avoid no-unused-var error
  expect(params).not.toBeUndefined()
})

test('NanoI18nL10nFunctionParams results in no TS errors when no params are provided as expected', async () => {
  const params: NanoI18nL10nFunctionParams<typeof enMixedParams, 'a.1'> = []

  // NOTE: Added only to avoid no-unused-var error
  expect(params).not.toBeUndefined()
})

test('NanoI18nL10nFunctionParams results in TS errors when no params are provided, but are expected', async () => {
  // @ts-expect-error a parameter {a:string} is expected in the array
  const params: NanoI18nL10nFunctionParams<typeof enMixedParams, 'a.0'> = []

  // NOTE: Added only to avoid no-unused-var error
  expect(params).not.toBeUndefined()
})

test('NanoI18nL10nFunctionParams results in TS errors when params are provided, but not expected', async () => {
  // @ts-expect-error a parameter is not expected in the array
  const params: NanoI18nL10nFunctionParams<typeof enMixedParams, 'a.1'> = [
    { a: 'val' },
  ]

  // NOTE: Added only to avoid no-unused-var error
  expect(params).not.toBeUndefined()
})

test('NanoI18nL10nFunctionParams results in TS errors when params are provided, but not expected', async () => {
  // @ts-expect-error a parameter is not expected in the array
  const params: NanoI18nL10nFunctionParams<typeof enMixedParams, 'a.1'> = [
    { a: 'val' },
  ]

  // NOTE: Added only to avoid no-unused-var error
  expect(params).not.toBeUndefined()
})

test('NanoI18nL10nFunction results in no TS errors when all required elements are included', async () => {
  const l: NanoI18nL10nFunction<typeof enMixedParams> = (key, ...params) =>
    `${key}${params.join()}`

  // NOTE: Added only to avoid no-unused-var error
  expect(l).not.toBeUndefined()
})

test('NanoI18nL10nImporters results in no TS error when types match (multiple locales)', async () => {
  const importers: NanoI18nL10nImporters<'en' | 'es', typeof enMixedParams> = {
    ['en']: async () =>
      (await import('./__test__/messages-mixed-params.en.js')).messages,
    ['es']: async () =>
      (await import('./__test__/messages-mixed-params.es.js')).messages,
  }

  // NOTE: Added only to avoid no-unused-var error
  expect(importers).not.toBeUndefined()
})

test('NanoI18nL10nImporters results in no TS error when types match (single locale)', async () => {
  const importers: NanoI18nL10nImporters<'en', typeof enMixedParams> = {
    ['en']: async () =>
      (await import('./__test__/messages-mixed-params.en.js')).messages,
  }

  // NOTE: Added only to avoid no-unused-var error
  expect(importers).not.toBeUndefined()
})

test("NanoI18nL10nImporters results in TS error when key types don't match", async () => {
  const importers: NanoI18nL10nImporters<'en' | 'es', typeof enParams> = {
    ['en']: async () =>
      // @ts-expect-error Expect TS to complain about property a.0 having mismatched types
      (await import('./__test__/messages-no-params.en.js')).messages,
    ['es']: async () =>
      (await import('./__test__/messages-params.es.js')).messages,
  }

  // NOTE: Added only to avoid no-unused-var error
  expect(importers).not.toBeUndefined()
})

test('NanoI18nL10nImporters results in TS error when there are more locales than defined in TLocale', async () => {
  enum Locale {
    EN = 'en',
  }

  const importers: NanoI18nL10nImporters<Locale, typeof enParams> = {
    ['en']: async () =>
      (await import('./__test__/messages-params.en.js')).messages,
    // @ts-expect-error Expect error about 'es' not existing in type
    ['es']: async () =>
      (await import('./__test__/messages-params.es.js')).messages,
  }

  // NOTE: Added only to avoid no-unused-var error
  expect(importers).not.toBeUndefined()
})

test('NanoI18nL10nImporters results in TS error when locale in TLocale is missing from importer keys', async () => {
  enum Locale {
    EN = 'en',
    ES = 'es',
    PS = 'ps',
  }

  // @ts-expect-error Expect error about missing 'ps' locale in importers
  const importers: NanoI18nL10nImporters<Locale, typeof enParams> = {
    ['en']: async () =>
      (await import('./__test__/messages-params.en.js')).messages,
    ['es']: async () =>
      (await import('./__test__/messages-params.es.js')).messages,
  }

  // NOTE: Added only to avoid no-unused-var error
  expect(importers).not.toBeUndefined()
})
