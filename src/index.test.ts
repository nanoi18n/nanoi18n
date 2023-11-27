import { expect, test } from 'vitest'
import type { messages as enNoParams } from './__test__/messages-no-params.en.js'
import type { messages as esNoParams } from './__test__/messages-no-params.es.js'

import { load } from './index.js'
import type { Importers } from './types.js'

const importersWithNoParams: Importers<
	'en' | 'es',
	typeof enNoParams,
	typeof esNoParams
> = {
	['en']: async () =>
		(await import('./__test__/messages-no-params.en.js')).messages,
	['es']: async () =>
		(await import('./__test__/messages-no-params.es.js')).messages,
}

// TODO: Uncomment when working on messages with params
//const importersWithParams: Importers<
//	'en' | 'es',
//	typeof enParams,
//	typeof esParams
//> = {
//	['en']: async () =>
//		(await import('./__test__/messages-params.en.js')).messages,
//	['es']: async () =>
//		(await import('./__test__/messages-params.es.js')).messages,
//}

test('loads', () => {
	expect(load).not.toBeUndefined()
})

test('loads', async () => {
	const tPromise = load('en', importersWithNoParams)

	const t = await tPromise
	t('component.other-text', {})

	await expect(tPromise).resolves.toMatchInlineSnapshot('[Function]')
})

// TODO: Uncomment when working on messages with params
//test('loads', async () => {
//	const tPromise = load('en', importersWithParams)

//	const t = await tPromise
//	t('component.hello', {})

//	await expect(tPromise).resolves.toMatchInlineSnapshot('[Function]')
//})
