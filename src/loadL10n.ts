import { getL10nFunction } from './helpers/getL10nFunction.js'
import type {
  NanoI18nL10nFunctionParams,
  NanoI18nL10nImporters,
  NanoI18nL10nMessages,
} from './types.js'

export const loadL10n = async <
  TLocale extends string,
  TMessages extends NanoI18nL10nMessages<TMessages>,
>(
  locale: TLocale,
  importers: NanoI18nL10nImporters<TLocale, TMessages>,
): Promise<
  <TKey extends keyof TMessages = keyof TMessages>(
    key: TKey,
    ...params: Readonly<NanoI18nL10nFunctionParams<TMessages, TKey>>
  ) => string
> => {
  if (typeof importers[locale] === 'undefined') {
    throw new Error(
      `Requested locale '${locale}' not included in importers argument.`,
    )
  }

  const messages = await importers[locale]()

  return getL10nFunction(locale, messages)
}
