/* eslint-disable @typescript-eslint/naming-convention */
export const messages = {
	'component.hello': ({ humanName }: Readonly<{ humanName: string }>): string =>
		`Hola ${humanName}`,
	'component.generic': 'Hola desconocido',
}
