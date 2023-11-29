export type NanoI18nL10nMessages<
	TMessages,
	TKey extends keyof TMessages = keyof TMessages,
	TMessage extends TMessages[TKey] extends infer P
		? P
		: never = TMessages[TKey] extends infer P ? P : never,
> = Record<TKey, TMessage>

export type NanoI18nL10nFunctionParams<
	TMessages extends NanoI18nL10nMessages<TMessages>,
	TKey extends keyof TMessages,
> = TMessages[TKey] extends (params: Readonly<infer P>) => string ? [P] : []

export type NanoI18nL10nImporters<
	TLocales extends string,
	T0 extends NanoI18nL10nMessages<T0>,
	T1 extends NanoI18nL10nMessages<T1> = never,
	T2 extends NanoI18nL10nMessages<T2> = never,
> = Record<TLocales, () => Promise<NanoI18nL10nMessages<T0 | T1 | T2>>>
