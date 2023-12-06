/* eslint-disable @typescript-eslint/naming-convention */

export const messages = {
  'a.0': ({ a }: Readonly<{ a: string }>): string => `a.0 es = ${a}`,
  'a.1': ({ b }: Readonly<{ b: string }>): string => `a.1 es = ${b}`,
}
