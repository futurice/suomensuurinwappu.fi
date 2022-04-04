export const isNotEmpty = (str?: string): str is string =>
  !!str && str.length > 0;
