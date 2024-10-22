/*
  Информационное поле факта хозяйственной жизни 2(ИнфПолФХЖ2)
*/
import assert from 'chai';
import TextInfoType from '../../standard_element/text_info/TextInfoType';

class InfoFieldFact2 {
  static validate(values) {
    const errorMsgs = [];
    InfoFieldFact2.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return (errorMsgs.length > 0) ? 'ИнфПолФЧЖ2 заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !InfoFieldFact2.validate(value);
  }

  static get name() {
    return 'Информационное поле';
  }


  static get field() {
    return 'infoFields';
  }

  static get VOs() {
    return [TextInfoType];
  }

  constructor(informationFields) {
    this.informationFields = informationFields;
  }

  clone() {
    return new InfoFieldFact2(this.informationFields);
  }

  get informationFields() {
    return this._informationFields;
  }

  set informationFields(values) {
    assert.isArray(values);
    values.forEach((val) => {
      assert.instanceOf(val, TextInfoType);
    });
    this._informationFields = values;
  }

  get value() {
    return this.informationFields;
  }
}

export default InfoFieldFact2;
