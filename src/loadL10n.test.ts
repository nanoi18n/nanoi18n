import { expect, test } from 'vitest'
import type { messages as enMixedParams } from './__test__/messages-mixed-params.en.js'
import type { messages as esMixedParams } from './__test__/messages-mixed-params.es.js'
import type { messages as enNoParams } from './__test__/messages-no-params.en.js'
import type { messages as esNoParams } from './__test__/messages-no-params.es.js'
import type { messages as enParams } from './__test__/messages-params.en.js'
import type { messages as esParams } from './__test__/messages-params.es.js'
import { loadL10n } from './loadL10n.js'
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

test('types work for importers where all values are strings', async () => {
	const l = await loadL10n('es', importersWithNoParams)

	// NOTE: The following tests are mainly about types being correct. In the case
	// of any changes make sure that the @ts-expect-error matches the actual
	// error.

	expect(() => {
		// @ts-expect-error Expect TS to complain about receiving params when none is expected
		l('a.0', { k: 'a' })
	}).not.toThrow()

	expect(() => {
		// @ts-expect-error Expect TS to complain about invalid key
		l('c', { a: '0' })
	}).toThrowError()
})

test('l function throws when there is no message for specified key', async () => {
	const l = await loadL10n('en', importersWithNoParams)

	expect(() => {
		// @ts-expect-error Expect TS to complain about invalid key
		l('c', { a: '0' })
	}).toThrowErrorMatchingInlineSnapshot(
		"\"Message for key 'c' in locale 'en' unexpectedly has type 'undefined'.\"",
	)
})

test('types work for importers where all values are parameterized functions', async () => {
	const l = await loadL10n('en', importersWithParams)

	expect(() => {
		// @ts-expect-error Expect TS to complain about k to not be a valid parameter name
		l('a.0', { k: 'a' })
	}).not.toThrow()

	expect(() => {
		// @ts-expect-error Expect TS to complain about a to not be a valid parameter type
		l('a.0', { a: 0 })
	}).not.toThrow()

	expect(() => {
		// @ts-expect-error Expect TS to complain about missing params
		l('a.1')
	}).toThrowError()

	expect(() => {
		// @ts-expect-error Expect TS to complain about invalid key
		l('c', { a: '0' })
	}).toThrowError()

	expect(() => {
		// @ts-expect-error Expect TS to complain about unexpected param k even when expected is provided
		l('a.1', { b: 'b', k: 'k' })
	}).not.toThrow()
})

test('l function throws when there is param and it is expected', async () => {
	const l = await loadL10n('es', importersWithParams)

	expect(() => {
		// @ts-expect-error Expect TS to complain about missing params
		l('a.1')
	}).toThrowErrorMatchingInlineSnapshot(
		"\"Params for key 'a.1' in locale 'es' unexpectedly not found.\"",
	)
})

test('types work for importers where all values are a mix of strings and parameterized functions', async () => {
	const l = await loadL10n('es', importersWithMixedParams)

	expect(() => {
		// @ts-expect-error Expect TS to complain about missing params
		l('a.0')
	}).toThrowError()

	expect(() => {
		// @ts-expect-error Expect TS to complain about k to not be a valid parameter name
		l('a.0', { k: 'a' })
	}).not.toThrow()

	expect(() => {
		// @ts-expect-error Expect TS to complain about a to not be a valid parameter type
		l('a.0', { a: 0 })
	}).not.toThrow()

	expect(() => {
		// @ts-expect-error Expect TS to complain about invalid key
		l('c')
	}).toThrowError()

	expect(() => {
		// @ts-expect-error Expect TS to complain about unexpected params
		l('a.1', { b: 'b' })
	}).not.toThrow()
})

test("types on call to laodL10n result in error when the keys don't match", async () => {
	// TODO: Fix
})

test('types on call to laodL10n result in error when the value for the given key does not match (function vs string)', async () => {
	// TODO: Fix
})

test('types on call to laodL10n result in error when the value for the given key does not match (both functions, but different param props names)', async () => {
	// TODO: Fix
})

test('types on call to laodL10n result in error when the value for the given key does not match (both functions where one of the functions contains an extra prop)', async () => {
	// TODO: Fix
})

test('loads the function as expected', async () => {
	// TODO: Fix

	const l = await loadL10n('en', importersWithNoParams)
	const result = l('a.0')

	expect(result).toMatchInlineSnapshot('"a.0 en"')
})

// TODO: Add tests
