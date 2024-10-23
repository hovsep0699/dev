/*
<СведТов ...>
  <Акциз>
    <СумАкциз>5</СумАкциз>
  </Акциз>
</СведТов>
*/
class Excise {
  static get REG_EXP() {
    return new RegExp('^[0-9]{1,19}([.][0-9]{1,2})?$');
  }

  static validate(value) {
    return value && !Excise.REG_EXP.test(value) ? 'Введите число в формате 19.2' : undefined;
  }

  static isValid(value) {
    return !Excise.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return '';
    return `${value}`.replace(/[^\d.]/g, '')
      .replace(/^([^.]*[.])|[.]/g, '$1');
  }

  static get hint() {
    return 'Введите акциз';
  }

  static get placeholder() {
    return '-';
  }

  static get name() {
    return 'В том числе акциз';
  }

  static get field() {
    return 'excise';
  }

  constructor(value) {
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default Excise;
