/*
<СведТов НалСт="18%">
enum={"-1","0","10","18","20", "110","118","120"}
*/
import TaxRateNoNDS from './tax_rate/TaxRateNoNDS';
import TaxRate0 from './tax_rate/TaxRate0';
import TaxRate10 from './tax_rate/TaxRate10';
import TaxRate18 from './tax_rate/TaxRate18';
import TaxRate20 from './tax_rate/TaxRate20';
import TaxRate10_110 from './tax_rate/TaxRate10_110';
import TaxRate18_118 from './tax_rate/TaxRate18_118';
import TaxRate20_120 from './tax_rate/TaxRate20_120';

class TaxRate {
  static get hint() {
    return 'Введите налоговую ставку';
  }

  static get name() {
    return 'Налоговая ставка';
  }

  static get field() {
    return 'taxRate';
  }

  static get options() {
    return [
      TaxRateNoNDS,
      TaxRate0,
      TaxRate10,
      TaxRate18,
      TaxRate20,
      TaxRate10_110,
      TaxRate18_118,
      TaxRate20_120,
    ];
  }

  static validate(value) {
    return TaxRate.options.some(option => option.value === value) ? undefined : 'Неверный тип налоговой ставки';
  }

  static isValid(value) {
    return !TaxRate.validate(value);
  }

  static getCalculate(value) {
    const options = [...TaxRate.options];
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) return options[i].calculate;
    }
    return undefined;
  }

  constructor(taxrate) {
    if (!TaxRate.isValid(taxrate)) {
      this._error = new Error('Невозможно создать Налоговую ставку. Значение невалидно.');
    } else {
      this._error = null;
    }
    this._value = taxrate;
    this._title = this.getTitleByValue(taxrate);
  }

  getTitleByValue(value) {
    const options = [...TaxRate.options];
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) return options[i].title;
    }
    return undefined;
  }

  clone() {
    return new TaxRate(this.value);
  }

  get value() {
    return this._value;
  }

  get title() {
    return this._title;
  }

  get error() {
    return this._error;
  }
}

export default TaxRate;
