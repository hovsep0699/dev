class NumbersCollection {
  static get REG_EXP() {
    return new RegExp('^.{0,255}$');
  }

  static validate(value) {
    return !value || !NumbersCollection.REG_EXP.test(value) ? 'Введите список значений длиной 1-255 знаков' : undefined;
  }

  static isValid(value) {
    return !NumbersCollection.validate(value);
  }

  static get hint() {
    return 'Введите строку длиной до 255 знаков';
  }

  static get placeholder() {
    return 'Введите список значений через разделитель (перенос строки)';
  }

  static get name() {
    return 'Значение';
  }

  static get field() {
    return 'collection';
  }

  static get type() {
    return 'textarea';
  }

  constructor(str) {
    if (!NumbersCollection.isValid(`${str}`)) {
      this._error = new Error('Невозможно создать список значений уникальных идентификаторов. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${str}`;
  }

  clone() {
    return new NumbersCollection(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default NumbersCollection;
