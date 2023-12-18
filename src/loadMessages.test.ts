import { expect, test } from 'vitest'
import type { messages as enMismatch } from './__test__/messages-mismatch.en.js'
import type { messages as esMismatch } from './__test__/messages-mismatch.es.js'
import type { messages as enMixedParams } from './__test__/messages-mixed-params.en.js'
import type { messages as esMixedParams } from './__test__/messages-mixed-params.es.js'
import type { messages as enNoParams } from './__test__/messages-no-params.en.js'
import type { messages as esNoParams } from './__test__/messages-no-params.es.js'
import type { messages as enParams } from './__test__/messages-params.en.js'
import type { messages as esParams } from './__test__/messages-params.es.js'
import type { NanoI18nL10nImporters } from './index.js'
import { loadMessages } from './index.js'

const importersWithNoParams: NanoI18nL10nImporters<
  'en' | 'es',
  typeof enNoParams & typeof esNoParams
> = {
  ['en']: async () =>
    (await import('./__test__/messages-no-params.en.js')).messages,
  ['es']: async () =>
    (await import('./__test__/messages-no-params.es.js')).messages,
}

const importersWithParams: NanoI18nL10nImporters<
  'en' | 'es',
  typeof enParams & typeof esParams
> = {
  ['en']: async () =>
    (await import('./__test__/messages-params.en.js')).messages,
  ['es']: async () =>
    (await import('./__test__/messages-params.es.js')).messages,
}

const importersWithMixedParams: NanoI18nL10nImporters<
  'en' | 'es',
  typeof enMixedParams
> = {
  ['en']: async () =>
    (await import('./__test__/messages-mixed-params.en.js')).messages,
  ['es']: async () =>
    (await import('./__test__/messages-mixed-params.es.js')).messages,
}

const importersSingleLocale: NanoI18nL10nImporters<'es', typeof esMixedParams> =
  {
    ['es']: async () =>
      (await import('./__test__/messages-mixed-params.es.js')).messages,
  }

test('loads the value as expected (all messages have no params)', async () => {
  const m = await loadMessages('en', importersWithNoParams)
  const result = m['a.0']()

  expect(result).toMatchInlineSnapshot('"a.0 en"')
})

test('loads the value as expected (all messages have params)', async () => {
  const m = await loadMessages('es', importersWithParams)
  const result = m['a.1']({ b: 'b value' })

  expect(result).toMatchInlineSnapshot('"a.1 es = b value"')
})

test('loads the value as expected (with no param mixed type messages)', async () => {
  const m = await loadMessages('es', importersWithMixedParams)
  const result = m['a.1']()

  expect(result).toMatchInlineSnapshot('"a.1 es"')
})

test('loads the value as expected (with param in mixed type messages)', async () => {
  const m = await loadMessages('en', importersWithMixedParams)
  const result = m['a.0']({ a: 'hi! I am a!' })

  expect(result).toMatchInlineSnapshot('"a.0 en = hi! I am a!"')
})

test('loads the value when there is a single language included in the importer', async () => {
  const m = await loadMessages('es', importersSingleLocale)
  const result = m['a.0']({ a: 'hola hola!' })

  expect(result).toMatchInlineSnapshot('"a.0 es = hola hola!"')
})

test('types work when passed as parameters (single locale)', async () => {
  await loadMessages<'en', typeof enMixedParams>('en', {
    ['en']: async () =>
      (await import('./__test__/messages-mixed-params.en.js')).messages,
  })
})

test('types work when passed as parameters (multiple locales)', async () => {
  await loadMessages<'en' | 'es', typeof enMixedParams & typeof esMixedParams>(
    'en',
    {
      ['en']: async () =>
        (await import('./__test__/messages-mixed-params.en.js')).messages,
      ['es']: async () =>
        (await import('./__test__/messages-mixed-params.es.js')).messages,
    },
  )
})

test('results in TS error when arguments are passed as parameters directly and function does not know about all locales', async () => {
  await loadMessages('en', {
    ['en']: async () =>
      (await import('./__test__/messages-mixed-params.en.js')).messages,
    // @ts-expect-error 'es' in this case is unknown to generic types
    ['es']: async () =>
      (await import('./__test__/messages-mixed-params.es.js')).messages,
  })
})

test('results in TS error when passed wrong path', async () => {
  await loadMessages<'en' | 'es', typeof enMixedParams & typeof esMixedParams>(
    'en',
    {
      ['en']: async () =>
        // @ts-expect-error used path that does not match type resulting in props that are not the same
        (await import('./__test__/messages-params.en.js')).messages,
      ['es']: async () =>
        (await import('./__test__/messages-mixed-params.es.js')).messages,
    },
  )
})

test('results in TS error when props are different', async () => {
  await loadMessages<'en' | 'es', typeof esMismatch & typeof enMismatch>('en', {
    ['en']: async () =>
      (await import('./__test__/messages-mismatch.en.js')).messages,
    ['es']: async () =>
      // @ts-expect-error missing prop a.1 on ES file
      (await import('./__test__/messages-mismatch.es.js')).messages,
  })
})

test('results in TS error when param props are missing', async () => {
  const m = await loadMessages('es', importersWithParams)

  expect(() => {
    // @ts-expect-error the following expects parameters that are not provided
    m['a.1']()
  }).toThrowErrorMatchingInlineSnapshot(
    `[TypeError: Cannot destructure property 'b' of 'undefined' as it is undefined.]`,
  )
})

test('results in TS error when there is no message for specified key', async () => {
  const m = await loadMessages('en', importersWithNoParams)

  expect(() => {
    // @ts-expect-error Expect TS to complain about invalid key
    m['c']({ a: '0' })
  }).toThrowErrorMatchingInlineSnapshot(`[TypeError: m.c is not a function]`)
})

test('results in TS error on invalid locale', async () => {
  await expect(
    // @ts-expect-error Expect TS to complain about invalid key
    loadMessages('fr', importersWithNoParams),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `[TypeError: importers[locale] is not a function]`,
  )
})

test('results in TS errors on incorrect keys/parameters (all values have no params)', async () => {
  const m = await loadMessages('es', importersWithNoParams)

  // NOTE: The following tests are mainly about types being correct. In the case
  // of any changes make sure that the @ts-expect-error matches the actual
  // error.

  // @ts-expect-error Expect TS to complain about receiving params when none is expected
  m['a.0']({ k: 'a' })

  expect(() => {
    // @ts-expect-error Expect TS to complain about invalid key
    m['c']({ a: '0' })
  }).toThrowError()
})

test('results in TS Errors on incorrect keys/parameters (all values have params)', async () => {
  const m = await loadMessages('en', importersWithParams)

  // NOTE: The following tests are mainly about types being correct. In the case
  // of any changes make sure that the @ts-expect-error matches the actual
  // error.

  // @ts-expect-error Expect TS to complain about k to not be a valid parameter name
  m['a.0']({ k: 'a' })

  // @ts-expect-error Expect TS to complain about a to not be a valid parameter type
  m['a.0']({ a: 0 })

  expect(() => {
    // @ts-expect-error Expect TS to complain about missing params
    m['a.1']()
  }).toThrowErrorMatchingInlineSnapshot(
    `[TypeError: Cannot destructure property 'b' of 'undefined' as it is undefined.]`,
  )

  expect(() => {
    // @ts-expect-error Expect TS to complain about invalid key
    m['c']({ a: '0' })
  }).toThrowErrorMatchingInlineSnapshot(`[TypeError: m.c is not a function]`)

  // @ts-expect-error Expect TS to complain about unexpected param k even when expected is provided
  m['a.1']({ b: 'b', k: 'k' })
})

test('results in TS Errors on incorrect keys/parameters for importers (mixed values)', async () => {
  const m = await loadMessages('es', importersWithMixedParams)

  // NOTE: The following tests are mainly about types being correct. In the case
  // of any changes make sure that the @ts-expect-error matches the actual
  // error.

  expect(() => {
    // @ts-expect-error Expect TS to complain about missing params
    m['a.0']()
  }).toThrowError()

  // @ts-expect-error Expect TS to complain about k to not be a valid parameter name
  m['a.0']({ k: 'a' })

  // @ts-expect-error Expect TS to complain about a to not be a valid parameter type
  m['a.0']({ a: 0 })

  expect(() => {
    // @ts-expect-error Expect TS to complain about invalid key
    m['c']()
  }).toThrowErrorMatchingInlineSnapshot(`[TypeError: m.c is not a function]`)

  // @ts-expect-error Expect TS to complain about unexpected params
  m['a.1']({ b: 'b' })
})
