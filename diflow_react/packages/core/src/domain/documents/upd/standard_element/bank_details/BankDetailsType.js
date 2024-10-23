/*
  Сведения о банке (СвБанк)
 */
import Name from './Name';
import BIK from './BIK';
import CorrespondentAccount from './CorrespondentAccount';

class BankDetailsType {
  static validate(value) {
    const errorMsgs = [];
    BankDetailsType.VOs.forEach((DomainVO) => {
      const msg = DomainVO.validate(value && value[DomainVO.field]);
      if (msg !== undefined) {
        errorMsgs.push(msg);
      }
    });
    return (errorMsgs.length > 0) ? 'Сведения о банке заполнены неверно' : undefined;
  }

  static isValid(value) {
    return !BankDetailsType.validate(value);
  }

  static get hint() {
    return 'Введите сведения о банке';
  }

  static get placeholder() {
    return 'Введите сведения о банке';
  }

  static get name() {
    return 'Сведения о банке';
  }

  static get field() {
    return 'bank';
  }

  static get VOs() {
    return [Name, BIK, CorrespondentAccount];
  }

  constructor(name, bik, correspondentAccount) {
    this.name = name;
    this.bik = bik;
    this.correspondentAccount = correspondentAccount;
  }

  clone() {
    return new BankDetailsType(this.name, this.bik, this.correspondentAccount);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = new Name(value);
  }

  set bik(value) {
    this._bik = new BIK(value);
  }

  get bik() {
    return this._bik;
  }

  set correspondentAccount(value) {
    this._correspondentAccount = new CorrespondentAccount(value);
  }

  get correspondentAccount() {
    return this._correspondentAccount;
  }

  get value() {
    return {
      [Name.field]: this.name,
      [BIK.field]: this.bik,
      [CorrespondentAccount.field]: this.correspondentAccount
    };
  }
}

export default BankDetailsType;
