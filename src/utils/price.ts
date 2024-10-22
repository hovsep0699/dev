/** 1 234,56 => 1234.56 */
export const priceToString = (value: string): string => {
  const validateStr = value.replace(/\s/g, '').replace(/,/g, '.');
  return Number(parseFloat(validateStr).toFixed(2)).toString();
};

/** 1234.56  => 1 234,56 */
export const stringToPrice = (value: string): string => {
  const validateStr = value.replace(/\s/g, '').replace(/,/g, '.');

  const toFloat = parseFloat(validateStr).toFixed(2);
  const toLocal = toFloat.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return toLocal;
};

/** 1 234,56 => 1234.56 */
export const priceToNumber = (value: string): number => {
  const validateStr = value.replace(/\s/g, '').replace(/,/g, '.');

  const result = Number(parseFloat(validateStr).toFixed(2));

  if (isNaN(result)) {
    return 0;
  } else {
    return result;
  }
};
