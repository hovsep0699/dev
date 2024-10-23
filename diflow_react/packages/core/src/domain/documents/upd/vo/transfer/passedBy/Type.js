/*
  Тип физического лица, принявшего товары (груз)
*/
import Employee from './type/Employee';
import Assignee from './type/Assignee';
import FL from './type/FL';

class Type {
  static validate(values) {
    const errorMsgs = [];
    Type.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return (errorMsgs.length > 0) ? 'Тип физического лица заполнен неверно' : undefined;
  }

  static isValid(value) {
    return !Type.validate(value);
  }

  static get name() {
    return 'Товар передал';
  }

  static get hint() {
    return 'Выберите тип физического лица, принявшего товары (груз)';
  }

  static get field() {
    return 'type';
  }

  static get options() {
    return [Employee, Assignee, FL];
  }

  constructor(participant) {
    this.participant = participant;
  }

  clone() {
    return new Type(this.type);
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get value() {
    return this.type;
  }
}

export default Type;
