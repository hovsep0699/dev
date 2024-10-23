/*
  Текстовая информация (ТекстИнфТип)
 */
import TextInfoId from './TextInfoId';
import TextInfoValue from './TextInfoValue';

class TextInfoType {
  static validate(value) {
    const errorMsgs = [];
    TextInfoType.VOs.forEach((DomainVO) => {
      const msg = DomainVO.validate(value[DomainVO.field]);
      if (msg !== undefined) {
        errorMsgs.push(msg);
      }
    });
    return (errorMsgs.length > 0) ? 'Инфополе заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !TextInfoType.validate(value);
  }

  static get hint() {
    return 'Начните вводить название валюты и выберите его из выпадающего списка';
  }

  static get placeholder() {
    return 'Введите инфополе';
  }

  static get name() {
    return 'ТекстИнфТип';
  }

  static get field() {
    return 'invoice.informationField.attributeValues';
  }

  static get VOs() {
    return [TextInfoId, TextInfoValue];
  }

  constructor(id, infoValue) {
    this.id = id;
    this.infoValue = infoValue;
  }

  clone() {
    return new TextInfoType(this.id, this.infoValue);
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = new TextInfoId(value);
  }

  set infoValue(value) {
    this._infoValue = new TextInfoValue(value);
  }

  get infoValue() {
    return this._infoValue;
  }

  get value() {
    return {
      [TextInfoId.field]: this.id,
      value: this.infoValue
    };
  }
}

export default TextInfoType;
