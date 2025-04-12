export const setAuthCookie = (token: string) => {
  const maxAge = 86400;
  document.cookie = `token=${token}; path=/; max-age=${maxAge}; samesite=strict; secure`;
};
