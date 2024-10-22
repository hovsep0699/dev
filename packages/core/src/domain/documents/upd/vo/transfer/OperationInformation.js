/**
 * Содержание операции.
 * Указывается, например, «Товары переданы», «Результаты работ сдал», «Услуги оказаны в полном объеме» или другое
 *
 * #СодОпер
 * */

class OperationInformation {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && OperationInformation.REG_EXP.test(value) ? undefined : 'Введите строку длиной 1-255';
  }

  static isValid(value) {
    return !OperationInformation.validate(value);
  }

  static get hint() {
    return 'Введите содержание операции, например, «Товары переданы», «Результаты работ сдал», «Услуги оказаны в полном объеме» или другое';
  }

  static get placeholder() {
    return 'Введите содержание операции';
  }

  static get name() {
    return 'Содержание операции';
  }

  static get field() {
    return 'transferDetails.operationInformation';
  }

  constructor(value) {
    this.value = value;
  }

  clone() {
    return new OperationInformation(this.value);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}

export default OperationInformation;
