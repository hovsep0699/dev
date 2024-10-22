/*
  Номер средств идентификации товаров (НомСредИдентТов)
*/
import PackNumber from './PackNumber';
import Type from './Type';
import NumbersCollection from './NumbersCollection';

class IdentificationNumbers {
  static validate(values) {
    const errorMsgs = [];
    IdentificationNumbers.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return errorMsgs.length > 0 ? 'НомСредИдентТов заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !IdentificationNumbers.validate(value);
  }

  static get name() {
    return 'Номер средств идентификации товаров';
  }

  static get field() {
    return 'information.identificationNumbers';
  }

  static get VOs() {
    return [PackNumber, Type, NumbersCollection];
  }
}

export default IdentificationNumbers;
