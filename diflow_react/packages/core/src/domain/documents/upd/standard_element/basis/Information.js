/*
  Дополнительные сведения (ДопСвОсн), текст(1-1000)
 */
class Information {
  static get REG_EXP() {
    return new RegExp('^.{1,1000}$');
  }

  static validate(value) {
    return value && !Information.REG_EXP.test(value) ? 'Введите строку длиной 1–1000 знаков' : undefined;
  }

  static isValid(value) {
    return !Information.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 1000);
  }

  static get placeholder() {
    return 'Введите доп.сведения';
  }

  static get hint() {
    return 'Введите строку длиной 1-1000 знаков';
  }

  static get name() {
    return 'Доп. сведения';
  }

  static get field() {
    return 'information';
  }

  constructor(value) {
    if (!Information.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать "Дополнительные сведения". Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Information(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Information;
