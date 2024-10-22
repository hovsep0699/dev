/*
  Информация для участника документооборота(ИнфДляУчаст) A(атрибут) текст(1-255)
 */
class InfomationForParticipant {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && !InfomationForParticipant.REG_EXP.test(value) ? 'Введите строку длиной 1–255 знаков' : undefined;
  }

  static isValid(value) {
    return !InfomationForParticipant.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 255);
  }

  static get placeholder() {
    return 'Введите информацию для участника документооборота';
  }

  static get hint() {
    return 'Информация, позволяющая получающему документ участнику документооборота обеспечить его автоматизированную обработку';
  }

  static get name() {
    return 'Информация для участника документооборота';
  }

  static get field() {
    return 'informationForParticipant';
  }

  constructor(value) {
    if (!InfomationForParticipant.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать ИнфДляУчаст. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new InfomationForParticipant(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default InfomationForParticipant;
