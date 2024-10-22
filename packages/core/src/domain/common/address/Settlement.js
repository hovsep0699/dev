class Settlement {
  static validate() {
    return undefined;
  }

  static isValid(value) {
    return !Settlement.validate(value);
  }

  static get hint() {
    return 'Введите населённый пункт';
  }

  static get placeholder() {
    return 'Введите населённый пункт';
  }

  static get name() {
    return 'Населённый пункт';
  }

  static get field() {
    return 'settlement';
  }

  static mask(value) {
    let result = value;
    if (result) {
      result = result.trimStart();
    }
    return result && result.slice(0, 50);
  }

  constructor(settlement) {
    if (!Settlement.isValid(`${settlement}`)) {
      throw new Error('Невозможно создать населённый пункт. Формат не верен.');
    }
    this._value = `${settlement}`;
  }

  clone() {
    return new Settlement(this.value);
  }

  get value() {
    return this._value;
  }
}

export default Settlement;
