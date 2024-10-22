export const parseLocationSearch = (str: string): Record<string, string | number> => {
  str = str.replace(/^\?/, '');
  return str.split('&').reduce<Record<string, string | number>>((prev, curr) => {
    const [key, val] = curr.split('=');
    prev[key] = /^\d+/.test(val) ? Number(val) : String(val);

    return prev;
  }, {});
};
