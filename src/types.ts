export type NanoI18NMessages<
	TMessages,
	TKey extends keyof TMessages = keyof TMessages,
	TMessage extends TMessages[TKey] extends infer P
		? P
		: never = TMessages[TKey] extends infer P ? P : never,
> = Record<TKey, TMessage>

export type NanoI18NTranslationFunctionParams<
	TMessages extends NanoI18NMessages<TMessages>,
	TKey extends keyof TMessages,
> = TMessages[TKey] extends (params: Readonly<infer P>) => string ? [P] : []

export type NanoI18NImporters<
	TLocales extends string,
	T0 extends NanoI18NMessages<T0>,
	T1 extends NanoI18NMessages<T1> = never,
	T2 extends NanoI18NMessages<T2> = never,
> = Record<TLocales, () => Promise<NanoI18NMessages<T0 | T1 | T2>>>
