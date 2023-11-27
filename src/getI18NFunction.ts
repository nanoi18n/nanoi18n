import type { ParameterizedTranslation } from './types.js'

export const getI18NFunction =
	<
		TLocale extends string,
		TMessages extends Record<string, string | ParameterizedTranslation>,
	>(
		locale: TLocale,
		messages: TMessages,
	) =>
	<TKey extends keyof TMessages>(
		key: TKey,
		// TODO: Uncomment when working on messages with params
		params: Readonly<Record<string, string>>,
		//...params: TranslationFunctionParams<TMessages, TKey>
	): string => {
		const message = messages[key]

		if (typeof message === 'undefined') {
			throw new Error(
				`Message for key '${String(
					key,
				)}' in locale '${locale}' unexpectedly not found.`,
			)
		}

		if (typeof message === 'function') {
			if (typeof params !== 'object') {
				throw new Error(
					`Params for key '${String(
						key,
					)}' in locale '${locale}' unexpectedly not found.`,
				)
			}

			return message(params)
		}

		return message
	}
