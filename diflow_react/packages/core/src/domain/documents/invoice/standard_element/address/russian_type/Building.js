/*
  Корпус A(атрибут) текст(1-20)
 */
class Building {
  static get REG_EXP() {
    return new RegExp('^.{1,20}$');
  }

  static validate(value) {
    return value && !Building.REG_EXP.test(value) ? 'Введите строку длиной 1-20 знаков' : undefined;
  }

  static isValid(value) {
    return !Building.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 50);
  }

  static get placeholder() {
    return 'Введите корпус';
  }

  static get hint() {
    return 'Введите строку длиной до 20 знаков';
  }

  static get name() {
    return 'Корпус';
  }

  static get field() {
    return 'building';
  }

  constructor(value) {
    if (!Building.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать корпус. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Building(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Building;
