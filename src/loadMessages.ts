import type {
  NanoI18nL10nImporters,
  NanoI18nL10nMessageFunction,
} from './types.js'

export const loadMessages = async <
  TLocale extends string,
  TMessages extends Record<
    keyof TMessages,
    NanoI18nL10nMessageFunction<TMessages[keyof TMessages]>
  >,
>(
  locale: TLocale,
  importers: NanoI18nL10nImporters<TLocale, TMessages>,
): Promise<TMessages> => {
  const messages = await importers[locale]()

  return messages as TMessages
}
