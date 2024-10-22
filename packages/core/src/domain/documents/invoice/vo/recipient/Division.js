class Division {
  static get REG_EXP() {
    return new RegExp('^[0-9]$');
  }

  static validate(value) {
    return !Division.REG_EXP.test(value) ? 'Введите id отдела' : undefined;
  }

  static isValid(value) {
    return !Division.validate(value);
  }

  constructor(id) {
    if (!Division.isValid(`${id}`)) {
      throw new Error('Невозможно создать отдел. Формат не верен.');
    }
    this._value = `${id}`;
  }

  clone() {
    return new Division(this.value);
  }

  get value() {
    return this._value;
  }
}

export default Division;
