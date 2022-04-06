export const isNotEmpty = (str?: string | null): str is string =>
  !!str && str.length > 0;

/**
 * Checks if string is included in another, case-insensitive
 *
 * child: str to find in parent
 * parent: str to search child from
 */
export const inStr = (child: string, parent: string) =>
  parent.toLowerCase().includes(child.toLowerCase());

/**
 * Checks if string is value of given enum
 *
 * str: str that might be enum value
 * enum: enum to check from
 */
export const isOfEnum = <TEnum extends string>(
  str: string,
  enumObj: Record<string, TEnum>
): str is TEnum => Object.values(enumObj).some((e) => e === str);
