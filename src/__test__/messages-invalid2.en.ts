/* eslint-disable @typescript-eslint/naming-convention */

export const messages = {
  'a.0': ({ a }: Readonly<{ a: string }>, otherparam: string): string =>
    `a.0 es = ${a}${otherparam}`,
  'a.1': (): string => 'a.1 es',
}
