export const getValueFloat = (value: string, float: number = 0) => {
  let offset = 0;
  let result = String(value).trim();

  if (result === '.' || result === ',' || result === '0.' || result === '0,') {
    result = '0.';
    offset = 1;
  }

  return {
    value: result,
    offset
  };
};
