/*
  Номер расчётного счёта состоит из 20 цифр

 (1—3-я цифры) означают, кто открыл счет.
  Например
    408 – физические лица и ИП;
    с 411 по 419 — государственные организации;
    с 420 по 422 — юридические лица и так далее.

  (4—5-я цифры) - показывают вид деятельности лица, открывшего счет.
  Например
   02 – это счет, открытый физлицом, являющимся индивидуальным предпринимателем.
   40702 – счет открыт на юрлицо, открытое или закрытое акционерное общество.

  (6—8-я цифры) - Валюта счета
  Например
    810 – это российский рубль для переводов внутри страны
    643 – рубль для международных переводов
    840 – американский доллар
    978 – евро

  (9-я цифра) — контрольная цифра для выявления случайной ошибки в наборе номера счёта

  (10—13-я цифры) — четырехзначный код подразделения банка (не путать с другим реквизитом – БИК)
   (иногда не подразделяется и является частью внутреннего номера счёта в банке);

  (14—20-я цифры) — семизначный внутренний номер (лицевого) счёта в банке.

  В целях создания резерва рекомендовано предусматривать возможность обработки номеров счетов из 25 знаков (резерв на дополнительные 5 знаков).
*/
class AccountNumber {
  static get REG_EXP() {
    return new RegExp('^[0-9]{20}$');
  }

  static validateWithBIK(accountNumber, bik) {
    const bikAccountNumber = `${bik.slice(-3)}${accountNumber}`;
    let checksum = 0;
    const KOEFS = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
    KOEFS.forEach((koef, index) => {
      checksum += koef * (bikAccountNumber[index] % 10);
    });
    if (checksum % 10 !== 0) {
      return 'Неправильное контрольное число';
    }
    return undefined;
  }

  static validate(value) {
    return value && !AccountNumber.REG_EXP.test(value) ? 'Введите число длиной 20 знаков' : undefined;
  }

  static isValid(value) {
    return !AccountNumber.validate(value);
  }

  static isValidWithBIK(accountNumber, bik) {
    return !AccountNumber.validateWithBIK(accountNumber, bik);
  }

  static mask(value) {
    return value && value.replace(/\D/g, '').slice(0, 20);
  }

  static get placeholder() {
    return 'Введите номер';
  }

  static get hint() {
    return 'Введите 20-значный «Номер расчётного счёта»';
  }

  static get name() {
    return 'Номер расчётного счёта';
  }

  static get field() {
    return 'accountNumber';
  }

  constructor(accountNumber) {
    if (AccountNumber.isValid(`${accountNumber}`)) {
      this._value = `${accountNumber}`;
    } else {
      this._value = accountNumber;
    }
  }

  clone() {
    return new AccountNumber(this.value);
  }

  get value() {
    return this._value;
  }
}

export default AccountNumber;
