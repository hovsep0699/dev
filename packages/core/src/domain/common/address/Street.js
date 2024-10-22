class Street {
  static validate() {
    return undefined;
  }

  static isValid(value) {
    return !Street.validate(value);
  }

  static get hint() {
    return 'Введите улицу';
  }

  static get placeholder() {
    return 'Введите улицу';
  }

  static get name() {
    return 'Улица';
  }

  static get field() {
    return 'street';
  }

  static mask(value) {
    let result = value;
    if (result) {
      result = result.trimStart();
    }
    return result && result.slice(0, 50);
  }

  constructor(street) {
    if (!Street.isValid(`${street}`)) {
      throw new Error('Невозможно создать улицу. Формат не верен.');
    }
    this._value = `${street}`;
  }

  clone() {
    return new Street(this.value);
  }

  get value() {
    return this._value;
  }
}

export default Street;
