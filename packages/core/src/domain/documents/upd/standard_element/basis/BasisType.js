/*
  Типовой элемент <ОснованиеТип>.
 */
import DocName from './DocName';
import DocNumber from './DocNumber';
import DocDate from './DocDate';
import Information from './Information';
import DocId from './DocId';

class BasisType {
  static validate(value) {
    // TODO релизовать валидацию
    return undefined;
  }

  static isValid(value) {
    return !BasisType.validate(value);
  }

  static get field() {
    return 'basis';
  }

  static get VOs() {
    return [DocName, DocNumber, DocDate, Information, DocId];
  }

  constructor(docName, docNumber, docDate, information, docId) {
    this.docName = docName;
    this.docNumber = docNumber;
    this.docDate = docDate;
    this.information = information;
    this.docId = docId;
  }

  clone() {
    return new BasisType(this.docName, this.docNumber, this.docDate, this.information, this.docId);
  }

  get docName() {
    return this._docName;
  }

  set docName(value) {
    this._docName = new DocName(value);
  }

  set docNumber(value) {
    this._docNumber = new DocNumber(value);
  }

  get docNumber() {
    return this._docNumber;
  }

  set docDate(value) {
    this._docDate = new DocDate(value);
  }

  get docDate() {
    return this._docDate;
  }

  set information(value) {
    this._information = new Information(value);
  }

  get information() {
    return this._information;
  }

  set docId(value) {
    this._docId = new DocId(value);
  }

  get docId() {
    return this._docId;
  }

  get value() {
    return {
      [DocName.field]: this.docName,
      [DocNumber.field]: this.docNumber,
      [DocDate.field]: this.docDate,
      [Information.field]: this.information,
      [DocId.field]: this.docId
    };
  }
}

export default BasisType;
