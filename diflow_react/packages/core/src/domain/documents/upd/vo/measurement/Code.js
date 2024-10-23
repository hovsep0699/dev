/*
 * ОКЕИ_Тов - Код единицы измерения товара (3 или 4 цифры)
 * <СведТов НомСтр="1" НаимТов="Tovar1" ОКЕИ_Тов="114" КолТов="123" ЦенаТов="88" СтТовБезНДС="88" НалСт="18%" СтТовУчНал="5555">
 */

class Code {
  static get REG_EXP() {
    return new RegExp('^[0-9]{3,4}$');
  }

  static validate(value) {
    return !Code.REG_EXP.test(value) ? 'Введите код единицы измерения' : undefined;
  }

  static isValid(value) {
    return !Code.validate(value);
  }

  static get placeholder() {
    return '-';
  }

  static get name() {
    return 'Код единицы измерения';
  }

  static get field() {
    return 'measurementCode';
  }

  constructor(code) {
    if (!Code.isValid(`${code}`)) {
      throw new Error('Невозможно создать код единицы измерения. Формат не верен.');
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
