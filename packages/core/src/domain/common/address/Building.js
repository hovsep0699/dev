class Building {
  static validate() {
    return undefined;
  }

  static isValid(value) {
    return !Building.validate(value);
  }

  static get hint() {
    return 'Введите корпус';
  }

  static get placeholder() {
    return 'Введите корпус';
  }

  static get name() {
    return 'Корпус';
  }

  static get field() {
    return 'building';
  }

  static mask(value) {
    let result = value;
    if (result) {
      result = result.trimStart();
    }
    return result && result.slice(0, 20);
  }

  constructor(building) {
    if (!Building.isValid(`${building}`)) {
      throw new Error('Невозможно создать корпус. Формат не верен.');
    }
    this._value = `${building}`;
  }

  clone() {
    return new Building(this.value);
  }

  get value() {
    return this._value;
  }
}

export default Building;
