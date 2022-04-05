export const isNotEmpty = (str?: string | null): str is string =>
  !!str && str.length > 0;
