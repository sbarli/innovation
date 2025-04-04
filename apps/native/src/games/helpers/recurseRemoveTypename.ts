/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
export const recurseRemoveTypename = (item: unknown) => {
  if (Array.isArray(item)) {
    // @ts-ignore
    return item.map((item) => recurseRemoveTypename(item));
  }

  if (item && typeof item === 'object') {
    const newObj = { ...item };
    // @ts-ignore
    delete newObj.__typename;
    Object.keys(newObj).forEach((key) => {
      // @ts-ignore
      newObj[key] = recurseRemoveTypename(newObj[key]);
    });
    return newObj;
  }

  return item;
};
