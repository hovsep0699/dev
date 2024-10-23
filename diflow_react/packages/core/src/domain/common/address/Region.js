class Region {
  static get CODE_REG_EXP() {
    return new RegExp('^[0-9]+$');
  }

  static validate(value) {
    return !value ? 'Введите регион' : undefined;
  }

  static isValid(value) {
    return !Region.validate(value);
  }

  static get hint() {
    return 'Начните вводить название региона и выберите его из выпадающего списка';
  }

  static get placeholder() {
    return 'Введите регион';
  }

  static get name() {
    return 'Регион';
  }

  static get field() {
    return 'region';
  }

  static mask(value) {
    let result = value;
    if (result) {
      result = result.trimStart();
    }
    return result && result.slice(0, 50);
  }

  constructor(code, title, id) {
    if (!code || !title) {
      throw new Error('Невозможно создать регион. Передайте код и название региона.');
    }
    if (typeof code !== 'string') {
      throw new Error('Код региона должен быть строкой');
    }
    if (!Region.CODE_REG_EXP.test(code)) {
      throw new Error('Неверный формат кода региона');
    }
    this._code = code;
    this._title = title;

    if (id) {
      this._id = id;
    }
  }

  clone() {
    return new Region(this._code, this._title, this._id);
  }

  get code() {
    return this._code;
  }

  get title() {
    return this._title;
  }

  get id() {
    return this._id;
  }

  get value() {
    return this._title;
  }
}

export default Region;
