export const getCatchErrorMessage = (error: unknown, fallback: string = 'Unknown error') => {
  if (error instanceof Error) return error.message;
  return fallback;
};
