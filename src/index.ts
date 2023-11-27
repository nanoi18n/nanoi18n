import { getI18NFunction } from './getI18NFunction.js'
import type { MessagesBase, MessagesImporter } from './types.js'

export type { MessagesImporter }

export const load = async <
	TLocale extends string,
	TMessages extends MessagesBase,
>(
	locale: TLocale,
	importers: Record<TLocale, MessagesImporter<TMessages>>,
): Promise<
	<TKey extends keyof TMessages>(
		key: TKey,
		params: Readonly<Record<string, string>>,
		// TODO: Uncomment when working on messages with params
		//...params: TranslationFunctionParams<TMessages, TKey>
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
