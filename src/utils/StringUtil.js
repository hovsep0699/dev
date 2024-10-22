export const removeSymbol = (str, symbol) => str && str.replace(new RegExp(symbol, 'g'), '');

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
