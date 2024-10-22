/*
  Квартира(Кварт) A(атрибут) текст(1-20)
 */
class Room {
  static get REG_EXP() {
    return new RegExp('^.{1,20}$');
  }

  static validate(value) {
    return value && !Room.REG_EXP.test(value) ? 'Введите строку длиной 1-20 знаков' : undefined;
  }

  static isValid(value) {
    return !Room.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 50);
  }

  static get placeholder() {
    return 'Введите номер офиса или квартиры';
  }

  static get hint() {
    return 'Введите строку длиной до 20 знаков';
  }

  static get name() {
    return 'Офис/квартира';
  }

  static get field() {
    return 'room';
  }

  constructor(value) {
    if (!Room.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать квартиру. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Room(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Room;
