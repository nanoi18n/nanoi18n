/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { describe, expect, test } from 'vitest'
import type { messages as enInvalid } from './__test__/messages-invalid.en.js'
import type { messages as esInvalid } from './__test__/messages-invalid.es.js'
import type { messages as enInvalid2 } from './__test__/messages-invalid2.en.js'
import type { messages as enMixedParams } from './__test__/messages-mixed-params.en.js'
import type { messages as esMixedParams } from './__test__/messages-mixed-params.es.js'
import type { messages as esNoParams } from './__test__/messages-no-params.es.js'
import type { messages as enParams } from './__test__/messages-params.en.js'
import type { messages as esParams } from './__test__/messages-params.es.js'
import type {
  NanoI18nL10nImporters,
  NanoI18nL10nMessageFunction,
  NanoI18nL10nMessages,
} from './index.js'

describe('NanoI18nL10nMessageFunction', () => {
  test('works for function with no params', () => {
    const f: NanoI18nL10nMessageFunction<() => string> = () => `a`

    f()
  })

  test('works for function with params (params used in definition)', () => {
    const f: NanoI18nL10nMessageFunction<({ a }: { a: string }) => string> = ({
      a,
    }: {
      a: string
    }) => `${a}`

    f({ a: 'a' })
  })

  test('works for function with params (params not used in definition)', () => {
    const f: NanoI18nL10nMessageFunction<
      ({ a }: { a: string }) => string
    > = () => 'asdf'

    f({ a: 'a' })
  })

  test('TS error due to generic type received is not a function (string)', () => {
    // @ts-expect-error param for type is not a function
    const f: NanoI18nL10nMessageFunction<string> = ({ a }: { a: string }) =>
      `${a}`

    // NOTE: Added only to avoid no-unused-var error
    expect(f).not.toBeUndefined()
  })

  test('TS error due to generic type received is not a function (object)', () => {
    // @ts-expect-error param for type is not a function
    const f: NanoI18nL10nMessageFunction<{ a: string }> = ({
      a,
    }: {
      a: string
    }) => `${a}`

    // NOTE: Added only to avoid no-unused-var error
    expect(f).not.toBeUndefined()
  })

  test('TS error due to missing params prop b', () => {
    // @ts-expect-error missing prop a in param
    const f: NanoI18nL10nMessageFunction<({ b }: { b: string }) => string> = ({
      a,
    }: {
      a: string
    }) => `${a}`
  })

  test('TS error due to definition having extra params', () => {
    // @ts-expect-error definition has too many params
    const f: NanoI18nL10nMessageFunction<(p: { b: string }) => string> = (
      { b }: { b: string },
      a: string,
    ) => `${b}${a}`
  })

  test('TS error due to type having more than one param', () => {
    // @ts-expect-error type definition has more than one param
    const f: NanoI18nL10nMessageFunction<
      (p: { b: string }, a: string) => string
    > = ({ b }: { b: string }, a: string) => `${b}${a}`
  })
})

describe('NanoI18nL10nMessages', () => {
  test('no error on type with no params', async () => {
    const messages: NanoI18nL10nMessages<{
      'a.0': () => string
      'a.1': () => string
    }> = {
      'a.0': () => 'hello',
      'a.1': () => 'hello',
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(messages).not.toBeUndefined()
  })

  test('no error on type with params', async () => {
    const messages: NanoI18nL10nMessages<{
      'a.0': ({ b }: { b: string }) => string
      'a.1': ({ b, c }: { b: string; c: string }) => string
    }> = {
      'a.0': ({ b }: { b: string }) => `Hello ${b}`,
      'a.1': ({ b, c }: { b: string; c: string }): string => `Hello ${b}${c}`,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(messages).not.toBeUndefined()
  })

  test('TS error on type with unexpected props', async () => {
    const messages: NanoI18nL10nMessages<{
      'a.0': ({ b }: { b: string }) => string
      'a.1': ({ b, c }: { b: string; c: string }) => string
    }> = {
      // @ts-expect-error c is unexpected prop
      'a.0': ({ c }: { c: string }) => `Hello ${c}`,
      'a.1': ({ b, c }: { b: string; c: string }): string => `Hello ${b}${c}`,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(messages).not.toBeUndefined()
  })

  test('TS error when type of prop does not match (should be no param)', async () => {
    const messages: NanoI18nL10nMessages<{
      'a.0': () => string
      'a.1': () => string
    }> = {
      'a.0': () => 'a.0 es',
      // @ts-expect-error the type of messages does not include parameterized functions
      'a.1': ({ b }: Readonly<{ b: string }>): string => `Hello ${b}`,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(messages).not.toBeUndefined()
  })

  test('TS error when there is an unspecified key', async () => {
    const messages: NanoI18nL10nMessages<{
      'a.0': () => string
      'a.1': (p: Readonly<{ b: string }>) => string
    }> = {
      'a.0': () => 'a.0 es',
      'a.1': ({ b }: Readonly<{ b: string }>): string => `Hello ${b}`,
      // @ts-expect-error the type of messages does not include the key a.2
      'a.2': ({ b }: Readonly<{ b: string }>): string => `Hello ${b}`,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(messages).not.toBeUndefined()
  })

  test('TS error when a prop is not a function', async () => {
    // @ts-expect-error a.0 should be a function with either no param or single param
    const messages: NanoI18nL10nMessages<{
      'a.0': string
      'a.1': (p: { b: string }) => string
    }> = {
      'a.0': 'a.0 es',
      'a.1': ({ b }: { b: string }) => `Hello ${b}`,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(messages).not.toBeUndefined()
  })

  test('TS error when prop in param has number instead of string type', async () => {
    // @ts-expect-error params should only use string
    const messages: NanoI18nL10nMessages<{
      'a.0': () => string
      'a.1': (p: { b: number }) => string
    }> = {
      'a.0': () => 'a.0 es',
      'a.1': ({ b }: { b: number }) => `Hello ${b}`,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(messages).not.toBeUndefined()
  })

  test('TS no error when implementation (a.0) does not use param', async () => {
    const messages: NanoI18nL10nMessages<{
      'a.0': ({ b }: Readonly<{ b: string }>) => string
      'a.1': () => string
    }> = {
      'a.0': () => 'a.0 does not use the params and that is OK',
      'a.1': () => 'Hello',
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(messages).not.toBeUndefined()
  })
})

describe('NanoI18nL10nImporters', () => {
  test('results in no TS error when types match (multiple locales)', async () => {
    const importers: NanoI18nL10nImporters<
      'en' | 'es',
      typeof enMixedParams & typeof esMixedParams
    > = {
      ['en']: async () =>
        (await import('./__test__/messages-mixed-params.en.js')).messages,
      ['es']: async () =>
        (await import('./__test__/messages-mixed-params.es.js')).messages,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(importers).not.toBeUndefined()
  })

  test('results in no TS error when types match (single locale)', async () => {
    const importers: NanoI18nL10nImporters<'en', typeof enMixedParams> = {
      ['en']: async () =>
        (await import('./__test__/messages-mixed-params.en.js')).messages,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(importers).not.toBeUndefined()
  })

  test("results in TS error when key types of keys don't match (a.0)", async () => {
    const importers: NanoI18nL10nImporters<
      'en' | 'es',
      typeof enParams & typeof esNoParams
    > = {
      ['en']: async () =>
        (await import('./__test__/messages-no-params.en.js')).messages,
      ['es']: async () =>
        // @ts-expect-error mismatch of a.0 key
        (await import('./__test__/messages-params.en.js')).messages,
    }

    // NOTE: Added only to avoid variable never read error
    expect(importers).not.toBeUndefined()
  })

  test('results in TS error when there are more locales than defined in TLocale', async () => {
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

  test('results in TS error when locale in TLocale is missing from importer keys', async () => {
    enum Locale {
      EN = 'en',
      ES = 'es',
      PS = 'ps',
    }

    // @ts-expect-error Expect error about missing 'ps' locale in importers
    const importers: NanoI18nL10nImporters<
      Locale,
      typeof enParams & typeof esParams
    > = {
      ['en']: async () =>
        (await import('./__test__/messages-params.en.js')).messages,
      ['es']: async () =>
        (await import('./__test__/messages-params.es.js')).messages,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(importers).not.toBeUndefined()
  })

  test('results in TS error when one of the message values is not a function', async () => {
    enum Locale {
      EN = 'en',
      ES = 'es',
    }

    const importers: NanoI18nL10nImporters<
      Locale,
      // @ts-expect-error error about a.1 being string instead of a function
      typeof enInvalid & typeof esInvalid
    > = {
      ['en']: async () =>
        (await import('./__test__/messages-invalid.en.js')).messages,
      ['es']: async () =>
        (await import('./__test__/messages-invalid.es.js')).messages,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(importers).not.toBeUndefined()
  })

  test('results in TS error when one of the message values is a function with too many parameters', async () => {
    enum Locale {
      EN = 'en',
    }

    // @ts-expect-error error about a.1 having too many arguments (only 1 expected)
    const importers: NanoI18nL10nImporters<Locale, typeof enInvalid2> = {
      ['en']: async () =>
        (await import('./__test__/messages-invalid2.en.js')).messages,
    }

    // NOTE: Added only to avoid no-unused-var error
    expect(importers).not.toBeUndefined()
  })
})
