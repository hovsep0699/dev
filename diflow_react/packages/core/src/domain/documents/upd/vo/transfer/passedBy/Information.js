/*
   Иные сведения, идентифицирующие физическое лицо
   ИныеСвед A(атрибут) текст(1-255)
 */
class Information {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && !Information.REG_EXP.test(value) ? 'Введите строку длиной 1-255 знаков' : undefined;
  }

  static isValid(value) {
    return !Information.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 120);
  }

  static get placeholder() {
    return 'Введите иные сведения';
  }

  static get hint() {
    return 'Введите иные сведения, идентифицирующие физическое лицо (строка длиной до 255 знаков)';
  }

  static get name() {
    return 'Иные сведения';
  }

  static get field() {
    return 'information';
  }

  constructor(value) {
    if (!Information.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Иные сведения. Формат не верен.');
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
