import { assertType, expect, test } from 'vitest'
import type { messages as enMixedParams } from './__test__/messages-mixed-params.en.js'
import type { messages as esMixedParams } from './__test__/messages-mixed-params.es.js'
import type { messages as enNoParams } from './__test__/messages-no-params.en.js'
import type { messages as esNoParams } from './__test__/messages-no-params.es.js'
import type { messages as enParams } from './__test__/messages-params.en.js'
import type { messages as esParams } from './__test__/messages-params.es.js'
import { loadL10n } from './index.js'
import type { NanoI18nL10nImporters } from './types.js'

const importersWithNoParams: NanoI18nL10nImporters<
	'en' | 'es',
	typeof enNoParams,
	typeof esNoParams
> = {
	['en']: async () =>
		(await import('./__test__/messages-no-params.en.js')).messages,
	['es']: async () =>
		(await import('./__test__/messages-no-params.es.js')).messages,
}

const importersWithParams: NanoI18nL10nImporters<
	'en' | 'es',
	typeof enParams,
	typeof esParams
> = {
	['en']: async () =>
		(await import('./__test__/messages-params.en.js')).messages,
	['es']: async () =>
		(await import('./__test__/messages-params.es.js')).messages,
}

const importersWithMixedParams: NanoI18nL10nImporters<
	'en' | 'es',
	typeof enMixedParams,
	typeof esMixedParams
> = {
	['en']: async () =>
		(await import('./__test__/messages-mixed-params.en.js')).messages,
	['es']: async () =>
		(await import('./__test__/messages-mixed-params.es.js')).messages,
}

test('loads i18n', async () => {
	// TODO: Fix

	const l = await loadL10n('en', importersWithNoParams)
	const result = l('a.0')

	expect(result).toMatchInlineSnapshot('"a.0 en"')
})

test('types work for importers where all values are strings', async () => {
	const t = await loadL10n('es', importersWithNoParams)

	// TODO: implement
	//expect(() => {
	//	// @ts-expect-error Expect TS to complain about k to not be a valid parameter name
	//	t('a.0', { k: 'a' })
	//}).toThrowErrorMatchingInlineSnapshot()

	//expect(() => {
	//	// @ts-expect-error Expect TS to complain about k to not be a valid parameter type
	//	assertType(t('a.0', { a: 0 }))
	//}).toThrowErrorMatchingInlineSnapshot()

	expect(() => {
		// // @ts-expect-error Expect TS to complain about missing params
		assertType(t('a.1'))
	}).toThrowErrorMatchingInlineSnapshot()

	expect(() => {
		// @ts-expect-error Expect TS to complain about invalid key
		assertType(t('c', { a: '0' }))
	}).toThrowErrorMatchingInlineSnapshot()

	expect(() => {
		// @ts-expect-error Expect TS to complain about unexpected param k even when expected is provided
		assertType(t('a.1', { b: 'b', k: 'k' }))
	}).toThrowErrorMatchingInlineSnapshot()
})

test.skip('types work for importers where all values are parameterized functions', async () => {
	const t = await loadL10n('en', importersWithParams)

	// @ts-expect-error Expect TS to complain about k to not be a valid parameter name
	assertType(t('a.0', { k: 'a' }))
	// @ts-expect-error Expect TS to complain about k to not be a valid parameter type
	assertType(t('a.0', { a: 0 }))
	// @ts-expect-error Expect TS to complain about missing params
	assertType(t('a.1'))
	// @ts-expect-error Expect TS to complain about invalid key
	assertType(t('c', { a: '0' }))
	// @ts-expect-error Expect TS to complain about unexpected param k even when expected is provided
	assertType(t('a.1', { b: 'b', k: 'k' }))
})

test.skip('types work for importers where all values are a mix of strings and parameterized functions', async () => {
	const t = await loadL10n('es', importersWithMixedParams)

	// TODO: implement
	// // @ts-expect-error Expect TS to complain about missing params
	assertType(t('a.1'))
	// @ts-expect-error Expect TS to complain about k to not be a valid parameter name
	assertType(t('a.0', { k: 'a' }))
	// @ts-expect-error Expect TS to complain about k to not be a valid parameter type
	assertType(t('a.0', { a: 0 }))
	// @ts-expect-error Expect TS to complain about invalid key
	assertType(t('c', { a: '0' }))
	// @ts-expect-error Expect TS to complain about unexpected param k even when expected is provided
	assertType(t('a.1', { b: 'b', k: 'k' }))
})
