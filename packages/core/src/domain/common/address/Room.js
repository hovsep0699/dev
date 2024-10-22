class Room {
  static validate() {
    return undefined;
  }

  static isValid(value) {
    return !Room.validate(value);
  }

  static get hint() {
    return 'Введите офис/квартиру';
  }

  static get placeholder() {
    return 'Укажите номер';
  }

  static get name() {
    return 'Офис/квартира';
  }

  static get field() {
    return 'room';
  }

  static mask(value) {
    let result = value;
    if (result) {
      result = result.trimStart();
    }
    return result && result.slice(0, 20);
  }

  constructor(room) {
    if (!Room.isValid(`${room}`)) {
      throw new Error('Невозможно создать офис/квартиру. Формат не верен.');
    }
    this._value = `${room}`;
  }

  clone() {
    return new Room(this.value);
  }

  get value() {
    return this._value;
  }
}

export default Room;
