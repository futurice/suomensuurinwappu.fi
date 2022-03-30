/**
 * Joins multiple classNames together
 * @param ...args classNames as strings or { [className]: boolean } — a string is always truthy,
 * while a falsy boolean value makes that key not included in the className list
 * @returns Truthy classNames as a single string
 */
export const cn = (...args: (string | Record<string, boolean> | undefined)[]) =>
  args
    .flatMap((arg) =>
      typeof arg === 'string' || !arg
        ? arg
        : Object.entries(arg).map(([arg, value]) => value && arg)
    )
    .filter((arg) => arg && arg.length > 0)
    .join(' ');
