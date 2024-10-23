/*
  СуммаПРД (Сумма платежно-расчетного документа)
  XML:
  <СвПРД СуммаПРД="9999" НомерПРД="К платёжному документу4" ДатаПРД="23.09.2019"/>
*/
class Sum {
  static get REG_EXP() {
    return new RegExp('^[0-9]+([.][0-9]{1,2})?$');
  }

  static validate(value) {
    return value && !Sum.REG_EXP.test(value) ? 'Неверный формат суммы' : undefined;
  }

  static isValid(value) {
    return !Sum.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return false;
    return `${value}`.replace(/[^\d.]/g, '')
      .replace(/^([^.]*[.])|[.]/g, '$1');
  }

  static get placeholder() {
    return 'Сумма';
  }

  static get hint() {
    return 'Введите сумму';
  }

  static get name() {
    return 'Сумма';
  }

  static get field() {
    return 'cost';
  }

  constructor(sum) {
    if (!Sum.isValid(`${sum}`)) {
      this._error = new Error('Невозможно создать СуммаПРД (Сумма платежно-расчетного документа). Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${sum}`;
  }

  clone() {
    return new Sum(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Sum;
