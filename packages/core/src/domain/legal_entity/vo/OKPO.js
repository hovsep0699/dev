/*
  ОКПО(общероссийский классификатор предприятий и организаций) состоит из 8 цифр для Юридического лица
  Выдаётся Росстатом (для статистики)
*/
class OKPO {
  static get REG_EXP() {
    return new RegExp('^[0-9]{8}$');
  }

  static validate(value) {
    return !value || OKPO.REG_EXP.test(value) ? undefined : 'Введите число длиной 8 знаков';
  }

  static isValid(value) {
    return !OKPO.validate(value);
  }

  static get placeholder() {
    return 'Введите ОКПО';
  }

  static get hint() {
    return 'Введите 8-значный код по Общероссийскому Классификатору Предприятий и Организаций';
  }

  static get name() {
    return 'ОКПО';
  }

  static get field() {
    return 'okpo';
  }

  static mask(value) {
    return value && value.replace(/\D/g, '').slice(0, 8);
  }

  constructor(okpo) {
    if (OKPO.isValid(`${okpo}`)) {
      this._value = `${okpo}`;
    } else {
      this._value = okpo;
    }
  }

  clone() {
    return new OKPO(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default OKPO;
