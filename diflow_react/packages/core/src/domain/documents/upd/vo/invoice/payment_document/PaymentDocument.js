/*
  К платежно-расчетному документу (UtdPaymentDocument)
  XML:
  <СвПРД СуммаПРД="9999" НомерПРД="К платёжному документу4" ДатаПРД="23.09.2019"/>
*/
import NumPD from './Num';
import DatePD from './Date';
import SumPD from './Sum';

class PaymentDocument {
  static validate(value) {
    const errorMsgs = [];
    PaymentDocument.VOs.forEach((DomainVO) => {
      const msg = DomainVO.validate(value[DomainVO.field]);
      if (msg !== undefined) {
        errorMsgs.push(msg);
      }
    });
    return (errorMsgs.length > 0) ? 'Платёжно-расчётный документ заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !PaymentDocument.validate(value);
  }

  static get name() {
    return 'К платежно-расчетному документу';
  }

  static get field() {
    return 'invoice.paymentDocuments';
  }

  static get VOs() {
    return [NumPD, DatePD, SumPD];
  }

  constructor(num, date, sum) {
    this.num = num;
    this.date = date;
    this.sum = sum;
  }

  clone() {
    return new PaymentDocument(this.num, this.date, this.sum);
  }

  get sum() {
    return this._sum;
  }

  set sum(value) {
    this._sum = new SumPD(value);
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = new DatePD(value);
  }

  get num() {
    return this._num;
  }

  set num(value) {
    this._num = new NumPD(value);
  }

  get value() {
    return {
      [NumPD.field]: this.num,
      [DatePD.field]: this.date,
      [SumPD.field]: this.sum
    };
  }
}

export default PaymentDocument;
