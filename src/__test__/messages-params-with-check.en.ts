/* eslint-disable @typescript-eslint/naming-convention */
import { paramCheck as pc } from '../index.js'

export const messages = {
  'a.0': ({ a }: Readonly<{ a: string }>): string =>
    pc([a], `a.0 en: a = ${a}`),
  'a.1': ({ b, c }: Readonly<{ b: string; c: string }>): string =>
    pc([b, c], `a.1 en: b = ${b}, c = ${c}`),
}
