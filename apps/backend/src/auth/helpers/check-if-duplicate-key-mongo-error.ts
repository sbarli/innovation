const MONGO_DUPLICATE_KEY_ERROR_CODE = 'E11000';

export const isDuplicateKeyError = (errorMsg: string) =>
  errorMsg.includes(MONGO_DUPLICATE_KEY_ERROR_CODE);
