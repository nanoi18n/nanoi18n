import { assertType, expect, test } from 'vitest'
import type { messages as enMixedParams } from './__test__/messages-mixed-params.en.js'
import type { messages as esMixedParams } from './__test__/messages-mixed-params.es.js'
import type { messages as enNoParams } from './__test__/messages-no-params.en.js'
import type { messages as esNoParams } from './__test__/messages-no-params.es.js'
import type { messages as enParams } from './__test__/messages-params.en.js'
import type { messages as esParams } from './__test__/messages-params.es.js'

import { load } from './index.js'
import type { NanoI18NImporters } from './types.js'

const importersWithNoParams: NanoI18NImporters<
	'en' | 'es',
	typeof enNoParams,
	typeof esNoParams
> = {
	['en']: async () =>
		(await import('./__test__/messages-no-params.en.js')).messages,
	['es']: async () =>
		(await import('./__test__/messages-no-params.es.js')).messages,
}

const importersWithParams: NanoI18NImporters<
	'en' | 'es',
	typeof enParams,
	typeof esParams
> = {
	['en']: async () =>
		(await import('./__test__/messages-params.en.js')).messages,
	['es']: async () =>
		(await import('./__test__/messages-params.es.js')).messages,
}

const importersWithMixedParams: NanoI18NImporters<
	'en' | 'es',
	typeof enMixedParams,
	typeof esMixedParams
> = {
	['en']: async () =>
		(await import('./__test__/messages-mixed-params.en.js')).messages,
	['es']: async () =>
		(await import('./__test__/messages-mixed-params.es.js')).messages,
}

test('loads', () => {
	expect(load).not.toBeUndefined()
})

test('loads', async () => {
	const tPromise = load('en', importersWithNoParams)

	const t = await tPromise
	const result = t('component.other-text')

	expect(result).toMatchInlineSnapshot('"Other text"')
})

test('loads', async () => {
	const tPromise = load('en', importersWithParams)

	const t = await tPromise

	const result = t('component.goodbye', { humanLastName: 'Yo' })
	// This should have a type error for the param key k

	// @ts-expect-error Expect TS to complain about k to not be a valid parameter
	assertType(t('component.goodbye', { k: 'Yo' }))
	// @ts-expect-error Expect TS to complain about missing params
	assertType(t('component.goodbye'))
	// @ts-expect-error Expect TS to complain about unexpected param k even when expected is provided
	assertType(t('component.goodbye', { humanLastName: 'Yo', k: 'Yo' }))

	expect(result).toMatchInlineSnapshot('"Bye Yo"')
})

test('loads', async () => {
	const tPromise = load('en', importersWithMixedParams)

	const t = await tPromise
	const result = t('component.hello', { humanName: 'Yo' })

	expect(result).toMatchInlineSnapshot('"Hi Yo"')
})

test('loads', async () => {
	const tPromise = load('en', importersWithMixedParams)

	const t = await tPromise

	const result = t('component.generic')

	expect(result).toMatchInlineSnapshot('"Hi stranger"')
})
