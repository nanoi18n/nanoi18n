export type ParameterizedTranslation = (
	params: Readonly<Record<string, string>>,
) => string

export type MessagesBase = Record<string, string | ParameterizedTranslation>

export type MessagesImporter<T extends MessagesBase> = () => Promise<T>

export type KeysOrNever<T extends MessagesBase> = T extends never
	? never
	: keyof T

export type MessageKeys<
	T0 extends MessagesBase,
	T1 extends MessagesBase = never,
	T2 extends MessagesBase = never,
	T3 extends MessagesBase = never,
	T4 extends MessagesBase = never,
	T5 extends MessagesBase = never,
	T6 extends MessagesBase = never,
	T7 extends MessagesBase = never,
	T8 extends MessagesBase = never,
	T9 extends MessagesBase = never,
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

export type Messages<
	T0 extends MessagesBase,
	T1 extends MessagesBase = never,
	T2 extends MessagesBase = never,
	T3 extends MessagesBase = never,
	T4 extends MessagesBase = never,
	T5 extends MessagesBase = never,
	T6 extends MessagesBase = never,
	T7 extends MessagesBase = never,
	T8 extends MessagesBase = never,
	T9 extends MessagesBase = never,
> = Record<
	MessageKeys<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>,
	string | ParameterizedTranslation
>

export type Importers<
	TLocales extends string,
	T0 extends MessagesBase,
	T1 extends MessagesBase = never,
	T2 extends MessagesBase = never,
	T3 extends MessagesBase = never,
	T4 extends MessagesBase = never,
	T5 extends MessagesBase = never,
	T6 extends MessagesBase = never,
	T7 extends MessagesBase = never,
	T8 extends MessagesBase = never,
	T9 extends MessagesBase = never,
> = Record<
	TLocales,
	() => Promise<Messages<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>>
>

// TODO: Uncoment and continue here
//export type ArgumentsType<T> = T extends (...args: infer U) => unknown
//	? U
//	: never

//export type TranslationFunctionParams<
//	TMessages,
//	TKey extends keyof TMessages,
//> = Readonly<
//	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
//	TMessages[TKey] extends string ? [] : [ArgumentsType<TMessages[TKey]>[0]]
//>
