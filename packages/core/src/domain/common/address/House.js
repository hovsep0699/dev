class House {
  static validate() {
    return undefined;
  }

  static isValid(value) {
    return !House.validate(value);
  }

  static get hint() {
    return 'Введите дом';
  }

  static get placeholder() {
    return 'Введите дом';
  }

  static get name() {
    return 'Дом';
  }

  static get field() {
    return 'house';
  }

  static mask(value) {
    let result = value;
    if (result) {
      result = result.trimStart();
    }
    return result && result.slice(0, 20);
  }

  constructor(house) {
    if (!House.isValid(`${house}`)) {
      throw new Error('Невозможно создать дом. Формат не верен.');
    }
    this._value = `${house}`;
  }

  clone() {
    return new House(this.value);
  }

  get value() {
    return this._value;
  }
}

export default House;
