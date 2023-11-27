/* eslint-disable @typescript-eslint/naming-convention */
export const messages = {
	'component.hello': ({ humanName }: Readonly<{ humanName: string }>): string =>
		`Hello ${humanName}`,
	'component.goodbye': ({
		humanName,
	}: Readonly<{ humanName: string }>): string => `Bye ${humanName}`,
}
