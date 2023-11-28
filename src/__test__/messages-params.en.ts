/* eslint-disable @typescript-eslint/naming-convention */
export const messages = {
	'component.hello': ({ humanName }: Readonly<{ humanName: string }>): string =>
		`Hello ${humanName}`,
	'component.goodbye': ({
		humanLastName,
	}: Readonly<{ humanLastName: string }>): string => `Bye ${humanLastName}`,
}
