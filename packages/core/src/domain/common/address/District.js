class District {
  static validate() {
    return undefined;
  }

  static isValid(value) {
    return !District.validate(value);
  }

  static get hint() {
    return 'Введите район';
  }

  static get placeholder() {
    return 'Введите район';
  }

  static get name() {
    return 'Район';
  }

  static get field() {
    return 'district';
  }

  static mask(value) {
    let result = value;
    if (result) {
      result = result.trimStart();
    }
    return result && result.slice(0, 50);
  }

  constructor(district) {
    if (!District.isValid(`${district}`)) {
      throw new Error('Невозможно создать район. Формат не верен.');
    }
    this._value = `${district}`;
  }

  clone() {
    return new District(this.value);
  }

  get value() {
    return this._value;
  }
}

export default District;
