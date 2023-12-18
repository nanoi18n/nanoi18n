/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */

export type NanoI18nL10nMessageFunction<TFn> = TFn extends (
  ...args: infer P
) => string
  ? P extends []
    ? () => string
    : P extends [Record<string, string>]
      ? (param: P[0]) => string
      : 'error-unexpected-params-format-message'
  : 'error-unexpected-non-function-message'

export type NanoI18nL10nMessages<
  TMessages extends Record<TKey, TMessage>,
  TKey extends keyof TMessages = keyof TMessages,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  TMessage extends NanoI18nL10nMessageFunction<
    TMessages[TKey]
  > = NanoI18nL10nMessageFunction<TMessages[TKey]>,
> = TMessages

export type NanoI18nL10nImporters<
  TLocales extends string,
  TMessages extends Record<
    keyof TMessages,
    NanoI18nL10nMessageFunction<TMessages[keyof TMessages]>
  >,
> = Record<TLocales, () => Promise<NanoI18nL10nMessages<TMessages>>>
