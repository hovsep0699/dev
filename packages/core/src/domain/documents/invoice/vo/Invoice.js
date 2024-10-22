import InfoFieldFact1 from './invoice/InfoFieldFact1';
import Code from './currency/Code';
import Num from './invoice/Num';
import Date from './invoice/Date';

class Invoice {
  /*
    <СвСчФакт НомерСчФ="1НОМЕР ДОКУМЕНТА" ДатаСчФ="26.09.2019" КодОКВ="643">
*/
  static validate(values) {
    const errorMsgs = [];
    Invoice.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return (errorMsgs.length > 0) ? 'СвСчФакт заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !Invoice.validate(value);
  }

  static get name() {
    return 'Универсальный передаточный документ';
  }


  static get field() {
    return 'invoice';
  }

  static get VOs() {
    return [Num, Date];
  }

  constructor(number, date, currencyCode) {
    this.number = number;
    this.date = date;
    this.currencyCode = currencyCode;
  }

  /* xml -НомерСчФ
  *  lbl - Документ №
  * */
  set number(value) {
    this._number = new Num(value);
  }

  get number() {
    return this._number;
  }

  /* xml -ДатаСчФ
  *  lbl - Дата
  * */
  set date(value) {
    this._date = new Date(value);
  }

  get date() {
    return this._date;
  }

  /* xml -КодОКВ
  *  lbl - Валюта (рубль 643)
  * */
  set currencyCode(value) {
    this._currencyCode = new Code(value);
  }

  get currencyCode() {
    return this._currencyCode;
  }

  /*
  К платежно-расчетному документу(пока этого поля нет в gui)

  <СвПРД СуммаПРД="8888" НомерПРД="К платёжному документу3" ДатаПРД="01.09.2019"/>
  <СвПРД СуммаПРД="567.45" НомерПРД="К платёжному документу4" ДатаПРД="23.09.2019"/>
*/
  set paymentDocuments(paymentDocs) {
    this._paymentDocs = paymentDocs;
  }

  get paymentDocuments() {
    return this._paymentDocs;
  }

  /*
    <ИнфПолФХЖ1>
        <ТекстИнф Идентиф="ИнфПоле1" Значен="ИнфЗн1"/>
        <ТекстИнф Идентиф="ИнфПоле2" Значен="ИнфЗн2"/>
    </ИнфПолФХЖ1>
 */
  set infoFields(values) {
    this._infoFields = new InfoFieldFact1(values);
  }

  get infoFields() {
    return this._infoFields;
  }

  set cargoFrom(value) {
    this._cargoFrom = value;
  }

  get cargoFrom() {
    return this._cargoFrom;
  }
}

export default Invoice;
