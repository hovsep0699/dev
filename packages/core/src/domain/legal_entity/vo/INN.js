/*
  ИНН(Идентификационный Номер Налогоплательщика) состоит из 10 цифр
  с 1-го по 2-й знак - код субъекта Российской Федерации

  со 2-го по 4-й знак - номер местной налоговой инспекции

  с 5-го по 9-й знак - номер налоговой записи налогоплательщика в территориальном разделе
  ОГРН (Основной государственный регистрационный номер)

  10-й знак - контрольная цифра

  ИНН иностранного юридического лица с 1 января 2005 года всегда начинается с цифр «9909»,
  следующие 5 цифр соответствуют Коду иностранной организации,
  последняя — контрольная цифра.
*/
class INN {
  static get REG_EXP() {
    return new RegExp('^[0-9]{2}[0-9]{2}[0-9]{5}[0-9]$');
  }

  static validate(inn) {
    const KOEFS = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    const accRes = KOEFS.reduce((acc, koef, index) => acc + koef * inn[index], 0);
    const controlResult = parseInt(accRes % 11 % 10, 10);
    if (controlResult !== parseInt(inn[9], 10)) {
      return 'Неправильное контрольное число';
    }
    return INN.REG_EXP.test(inn) ? undefined : 'Введите номер длиной 10 знаков';
  }

  static isValid(inn) {
    return !INN.validate(inn);
  }

  static mask(value) {
    return value && value.replace(/\D/g, '').slice(0, 10);
  }

  static get placeholder() {
    return 'Введите ИНН';
  }

  static get hint() {
    return 'Введите 10-значный код';
  }

  static get name() {
    return 'ИНН';
  }

  static get field() {
    return 'inn';
  }

  constructor(inn) {
    if (!INN.isValid(`${inn}`)) {
      this._error = new Error('Невозможно создать ИНН. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${inn}`;
  }

  clone() {
    return new INN(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default INN;
