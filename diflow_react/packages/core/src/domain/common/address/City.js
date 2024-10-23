class City {
  static validate() {
    return undefined;
  }

  static isValid(value) {
    return !City.validate(value);
  }

  static get hint() {
    return 'Введите город';
  }

  static get placeholder() {
    return 'Введите город';
  }

  static get name() {
    return 'Город';
  }

  static get field() {
    return 'city';
  }

  static mask(value) {
    let result = value;
    if (result) {
      result = result.trimStart();
    }
    return result && result.slice(0, 50);
  }

  constructor(city) {
    if (!City.isValid(`${city}`)) {
      throw new Error('Невозможно создать город. Формат не верен.');
    }
    this._value = `${city}`;
  }

  clone() {
    return new City(this.value);
  }

  get value() {
    return this._value;
  }
}

export default City;
