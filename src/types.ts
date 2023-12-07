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

export type NanoI18nL10nFunction<
  TMessages extends NanoI18nL10nMessages<TMessages>,
> = <TKey extends keyof TMessages = keyof TMessages>(
  key: TKey,
  ...params: Readonly<NanoI18nL10nFunctionParams<TMessages, TKey>>
) => string

export type NanoI18nL10nImporters<
  TLocales extends string,
  TMessages extends NanoI18nL10nMessages<TMessages>,
> = Record<TLocales, () => Promise<NanoI18nL10nMessages<TMessages>>>
