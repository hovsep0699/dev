/*
 * КодПроисх - Код страны происхождения товара
 * ОКСМТип значит что принимаются 3 цифры
 * <xs:attribute name="КодПроисх" type="ОКСМТип" use="optional">
 */

class Code {
  static get REG_EXP() {
    return new RegExp('^[0-9]{3}$');
  }

  static validate(value) {
    return !Code.REG_EXP.test(value) ? 'Введите код страны' : undefined;
  }

  static isValid(value) {
    return !Code.validate(value);
  }

  constructor(code) {
    if (!Code.isValid(`${code}`)) {
      throw new Error('Невозможно создать код страны. Формат не верен.');
    }
    this._value = `${code}`;
  }

  clone() {
    return new Code(this.value);
  }

  get value() {
    return this._value;
  }
}

export default Code;
