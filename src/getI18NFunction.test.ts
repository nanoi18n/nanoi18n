import { expect, test } from 'vitest'
import { load } from './index.js'

test('loads', () => {
	expect(load).not.toBeUndefined()
})
