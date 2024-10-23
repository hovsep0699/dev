/*
  Информационное поле факта хозяйственной жизни 1(ИнфПолФХЖ1)
*/
import assert from 'chai';
import TextInfoType from '../../standard_element/text_info/TextInfoType';
import TextInfoId from '../../standard_element/text_info/TextInfoId';
import TextInfoValue from '../../standard_element/text_info/TextInfoValue';

class InfoFieldFact1 {
  static validate(values) {
    const errorMsgs = [];
    InfoFieldFact1.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return (errorMsgs.length > 0) ? 'ИнфПолФЧЖ1 заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !InfoFieldFact1.validate(value);
  }

  static get name() {
    return 'Информационное поле';
  }

  static get field() {
    return 'invoice.informationField.attributeValues';
  }

  static get VOs() {
    return [TextInfoId, TextInfoValue];
  }

  constructor(informationFields) {
    this.informationFields = informationFields;
  }

  clone() {
    return new InfoFieldFact1(this.informationFields);
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

export default InfoFieldFact1;
