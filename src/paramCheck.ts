/**
 * Throws if any of the params listed in the first parameter is undefined
 * @param params List of expexted params
 * @param value Value to return if all the values are not undefined
 */
export const paramCheck = (
  params: Readonly<(string | undefined)[]>,
  value: string,
): string => {
  params.forEach((param) => {
    if (param === undefined) {
      throw new Error('Param unexpectedly has undefined value')
    }
  })

  return value
}
