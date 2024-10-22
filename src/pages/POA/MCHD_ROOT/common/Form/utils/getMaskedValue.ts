import parseValue, { IMask } from './parseValue';

const getMaskedValue = (mask: IMask[], value: string) => {
  const valueParts = parseValue(mask, value);
  return valueParts.map(part => part.part).join('');
};

export default getMaskedValue;
