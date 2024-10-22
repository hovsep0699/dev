/*
  КурсВал - курс валюты
  <ДопСвФХЖ1 ИдГосКон="Идентификатор гос. контра" НаимОКВ="Российский рубль" КурсВал="876">
 */

class ExchangeRate {
  static get REG_EXP() {
    return new RegExp('^(([0-9]+)([.][0-9]{0,4})?)$');
  }

  static validate(value) {
    return value && !ExchangeRate.REG_EXP.test(`${value}`) ? 'Введите целое или дробное число (не более 4 знаков после точки)' : undefined;
  }

  static isValid(value) {
    return !ExchangeRate.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return false;
    const valueWithOneDotOrComma = `${value}`.replace(/[^\d.,]/g, '')
      .replace(/^([^.,]*[.,])|[.,]/g, '$1');
    return valueWithOneDotOrComma;
  }

  static maskOnBlur(value) {
    const maskedValue = ExchangeRate.mask(value);
    if (!maskedValue) return false;
    const valueWithDot = `${maskedValue}`.replace(/[,]/g, '.');
    const numberValue = Number(valueWithDot);
    const numberValueWithFormattedMantissa = !!numberValue && Number(numberValue.toFixed(4));
    return !!numberValueWithFormattedMantissa && `${numberValueWithFormattedMantissa}`;
  }

  static get hint() {
    return 'Введите курс валюты. Целое или дробное число (не более 4 знаков после точки)';
  }

  static get placeholder() {
    return 'Введите курс валюты';
  }

  static get name() {
    return 'Курс валюты';
  }

  static get field() {
    return 'exchangeRate';
  }

  constructor(value) {
    if (!ExchangeRate.isValid(`${value}`)) {
      throw new Error('Невозможно создать курс валюты. Формат не верен.');
    }
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default ExchangeRate;
