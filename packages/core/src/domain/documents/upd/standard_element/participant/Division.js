/*
  Структурное подразделение(СтруктПодр) A(атрибут) текст(1-1000)
 */
class Division {
  static get REG_EXP() {
    return new RegExp('^.{1,1000}$');
  }

  static validate(value) {
    return value && !Division.REG_EXP.test(value) ? 'Введите строку длиной 1–1000 знаков' : undefined;
  }

  static isValid(value) {
    return !Division.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 1000);
  }

  static get placeholder() {
    return 'Введите название стурктурного подразделения';
  }

  static get hint() {
    return 'Введите строку длиной 1–1000 знаков';
  }

  static get name() {
    return 'Структурное подразделение';
  }

  static get field() {
    return 'divisionName';
  }

  constructor(value) {
    if (!Division.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать СтруктПодр. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Division(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Division;
