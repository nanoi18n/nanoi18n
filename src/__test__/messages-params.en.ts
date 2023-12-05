/* eslint-disable @typescript-eslint/naming-convention */

// TODO: Move to separate file
//const tc = (
//	params: Readonly<(string | undefined)[]>,
//	value: string,
//): string => {
//	params.forEach((param) => {
//		if (param === undefined) {
//			throw new Error('Param unexpectedly has undefined value')
//		}
//	})

//	return value
//}

export const messages = {
	// TODO: Move to separate file
	//'a.0': ({ a }: Readonly<{ a: string }>): string => tc([a], `a.0 en = ${a}`),
	'a.0': ({ a }: Readonly<{ a: string }>): string => `a.0 en = ${a}`,
	'a.1': ({ b }: Readonly<{ b: string }>): string => `a.1 en = ${b}`,
}
