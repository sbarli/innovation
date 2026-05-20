/** Web + SSR: localStorage when available, no-op during static render. */
export const authStorage = {
  getItem: (key: string) => {
    try {
      return Promise.resolve(localStorage.getItem(key));
    } catch {
      return Promise.resolve(null);
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // localStorage unavailable during SSR
    }
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // noop during SSR
    }
    return Promise.resolve();
  },
};
