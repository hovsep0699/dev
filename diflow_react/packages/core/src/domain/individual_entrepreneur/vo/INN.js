/*
  ИНН(Идентификационный Номер Налогоплательщика) состоит из 12 цифр

  ИНН ИП присваивается при регистрации физического лица в качестве индивидуального предпринимателя.
  Так как ИНН присваивается физическому лицу один раз, то ИНН физического лица совпадает с ИНН индивидуального предпринимателя.

  с 1-го по 2-й знак - код субъекта Российской Федерации

  со 2-го по 4-й знак - номер местной налоговой инспекции

  с 5-го по 10-й знак - номер налоговой записи налогоплательщика в территориальном разделе
  ОГРН (Основной государственный регистрационный номер)

  11 - 12-й знак - контрольные цифры
*/
class INN {
  static get REG_EXP() {
    return new RegExp('^[0-9]{2}[0-9]{2}[0-9]{6}[0-9]{2}$');
  }

  static validate(inn) {
    const KOEFS1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    const KOEFS2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    const acc1 = KOEFS1.reduce((acc, koef, index) => acc + koef * inn[index], 0);
    const acc2 = KOEFS2.reduce((acc, koef, index) => acc + koef * inn[index], 0);
    const controlResult_1 = parseInt(acc1 % 11 % 10, 10);
    const controlResult_2 = parseInt(acc2 % 11 % 10, 10);

    if ((controlResult_1 !== parseInt(inn[10], 10)) || (controlResult_2 !== parseInt(inn[11], 10))) {
      return 'Неправильное контрольное число';
    }
    return INN.REG_EXP.test(inn) ? undefined : 'Введите номер длиной 12 знаков';
  }

  static isValid(inn) {
    return !INN.validate(inn);
  }

  static mask(value) {
    return value && value.replace(/\D/g, '').slice(0, 12);
  }

  static get placeholder() {
    return 'Введите ИНН';
  }

  static get hint() {
    return 'Введите 12-значный код';
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
