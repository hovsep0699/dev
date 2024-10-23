// Основание, по которому экономический субъект является составителем файла обмена счета-фактуры (информации продавца)

// #ОснДоверОргСост

class BasisName {
  static get REG_EXP() {
    return new RegExp('^.{1,120}$');
  }

  static validate(value) {
    return value && !BasisName.REG_EXP.test(value) ? 'Введите строку длиной 1-120' : undefined;
  }

  static isValid(value) {
    return !BasisName.validate(value);
  }

  static get hint() {
    return 'Введите основание доверия составителя документа';
  }

  static get placeholder() {
    return 'Введите основание доверия';
  }

  static get name() {
    return 'Основание доверия составителя документа';
  }

  static get field() {
    return 'basisName';
  }

  constructor(value) {
    this.value = value;
  }

  clone() {
    return new BasisName(this.value);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}

export default BasisName;
