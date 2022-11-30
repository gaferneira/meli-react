export const setSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key: string) => {
  return sessionStorage.getItem(key)
    ? JSON.parse(sessionStorage.getItem(key)!)
    : undefined;
};

export const removeSessionStorage = (key: string) => {
  return sessionStorage.removeItem(key);
};
