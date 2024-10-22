/** принимает массив значений адреса - возвращает строку адреса
 *  или undefined если пустой массив */
export const addressToString = (args: any[]) => {
  const noEmptyArr = args.filter(item => !!item);
  const result = noEmptyArr.join(', ');
  if (noEmptyArr.length > 0) {
    return result;
  }
};

/** возвращает строку  */
export const arrToString = (args: any[], separator = ' '): string | undefined => {
  const noEmptyArr = args.filter(item => !!item && item !== null);
  const result = noEmptyArr.join(separator);
  if (noEmptyArr.length > 0) {
    return result;
  }
};
