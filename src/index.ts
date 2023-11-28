import { getI18NFunction } from './getI18NFunction.js'
import type {
	NanoI18NImporters,
	NanoI18NMessages,
	NanoI18NTranslationFunctionParams,
} from './types.js'

export type { NanoI18NImporters }

export const load = async <
	TLocale extends string,
	TMessages extends NanoI18NMessages<TMessages>,
>(
	locale: TLocale,
	importers: NanoI18NImporters<TLocale, TMessages>,
): Promise<
	<TKey extends keyof TMessages>(
		key: TKey,
		...params: Readonly<NanoI18NTranslationFunctionParams<TMessages, TKey>>
	) => string
> => {
	if (typeof importers[locale] === 'undefined') {
		throw new Error(
			`Requested locale '${locale}' not included in importers argument.`,
		)
	}

	const messages = await importers[locale]()

	return getI18NFunction(locale, messages)
}
