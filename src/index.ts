type MessagesImporter<T extends Record<string, string>> = () => Promise<T>

type KeysOrNever<T extends Record<string, string>> = T extends never
	? never
	: keyof T

export type MessageKeys<
	T0 extends Record<string, string>,
	T1 extends Record<string, string> = never,
	T2 extends Record<string, string> = never,
	T3 extends Record<string, string> = never,
	T4 extends Record<string, string> = never,
	T5 extends Record<string, string> = never,
	T6 extends Record<string, string> = never,
	T7 extends Record<string, string> = never,
	T8 extends Record<string, string> = never,
	T9 extends Record<string, string> = never,
> =
	| keyof T0
	| KeysOrNever<T1>
	| KeysOrNever<T2>
	| KeysOrNever<T3>
	| KeysOrNever<T4>
	| KeysOrNever<T5>
	| KeysOrNever<T6>
	| KeysOrNever<T7>
	| KeysOrNever<T8>
	| KeysOrNever<T9>

type Messages<
	T0 extends Record<string, string>,
	T1 extends Record<string, string> = never,
	T2 extends Record<string, string> = never,
	T3 extends Record<string, string> = never,
	T4 extends Record<string, string> = never,
	T5 extends Record<string, string> = never,
	T6 extends Record<string, string> = never,
	T7 extends Record<string, string> = never,
	T8 extends Record<string, string> = never,
	T9 extends Record<string, string> = never,
> = Record<MessageKeys<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>, string>

export type Importers<
	TLocales extends string,
	T0 extends Record<string, string>,
	T1 extends Record<string, string> = never,
	T2 extends Record<string, string> = never,
	T3 extends Record<string, string> = never,
	T4 extends Record<string, string> = never,
	T5 extends Record<string, string> = never,
	T6 extends Record<string, string> = never,
	T7 extends Record<string, string> = never,
	T8 extends Record<string, string> = never,
	T9 extends Record<string, string> = never,
> = Record<
	TLocales,
	() => Promise<Messages<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>>
>

const getI18NFunction =
	<TLocale extends string, TMessages extends Record<string, string>>(
		locale: TLocale,
		messages: TMessages,
	) =>
	(key: keyof TMessages): string => {
		const message = messages[key]

		if (typeof message === 'undefined') {
			throw new Error(
				`Message for key '${String(
					key,
				)}' in locale '${locale}' unexpectedly not found.`,
			)
		}

		return message
	}

export const load = async <
	TLocale extends string,
	TMessages extends Record<string, string>,
>(
	locale: TLocale,
	importers: Record<TLocale, MessagesImporter<TMessages>>,
): Promise<(key: keyof TMessages) => string> => {
	if (typeof importers[locale] === 'undefined') {
		throw new Error(
			`Requested locale '${locale}' not included in importers argument.`,
		)
	}

	const messages = await importers[locale]()

	return getI18NFunction(locale, messages)
}
