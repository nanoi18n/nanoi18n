import type {
	NanoI18NMessages,
	NanoI18NTranslationFunctionParams,
} from './types.js'

export const getI18NFunction =
	<
		TLocale extends string,
		TMessages extends NanoI18NMessages<TMessages>,
		TKey extends keyof TMessages = keyof TMessages,
	>(
		locale: TLocale,
		messages: TMessages,
	) =>
	(
		key: TKey,
		...params: Readonly<NanoI18NTranslationFunctionParams<TMessages, TKey>>
	): string => {
		const message = messages[key]

		if (typeof message === 'string') {
			return message
		}

		if (typeof message === 'function') {
			if (
				typeof params === 'undefined' ||
				!Array.isArray(params) ||
				params.length === 0
			) {
				throw new Error(
					`Params for key '${String(
						key,
					)}' in locale '${locale}' unexpectedly not found.`,
				)
			}

			return message(
				...(params as [unknown] as [
					NanoI18NTranslationFunctionParams<TMessages, TKey>,
				]),
			)
		}

		throw new Error(
			`Message for key '${String(
				key,
			)}' in locale '${locale}' unexpectedly has type '${typeof message}'.`,
		)
	}
