/*
  Банковские реквизиты (БанкРекв)
 */
import BankAccountNumber from './BankAccountNumber';
import BankDetailsType from '../bank_details/BankDetailsType';

class Bank {
  static validate(value) {
    const errorMsgs = [];
    Bank.VOs.forEach((DomainVO) => {
      const msg = DomainVO.validate(value && value[DomainVO.field]);
      if (msg !== undefined) {
        errorMsgs.push(msg);
      }
    });
    return (errorMsgs.length > 0) ? 'Банковские реквизиты заполнены неверно' : undefined;
  }

  static isValid(value) {
    return !Bank.validate(value);
  }

  static get name() {
    return 'Банковские резвизиты';
  }

  static get hint() {
    return 'Введите банковские реквизиты';
  }

  static get placeholder() {
    return 'Введите банковские реквизиты';
  }

  static get field() {
    return 'bankDetails';
  }

  static get VOs() {
    return [BankAccountNumber, BankDetailsType];
  }

  constructor(accountNumber, bankDetails) {
    this.accountNumber = accountNumber;
    this.setBankDetails(bankDetails);
  }

  clone() {
    return new Bank(
      this.accountNumber.value,
      this.bankDetails.name.value,
      this.bankDetails.bik.value,
      this.bankDetails.correspondentAccount.value
    );
  }

  get accountNumber() {
    return this._accountNumber;
  }

  set accountNumber(value) {
    this._accountNumber = new BankAccountNumber(value);
  }

  setBankDetails({ name, bik, correspondentAccount }) {
    this._bankDetails = new BankDetailsType(name.value, bik.value, correspondentAccount.value);
  }

  get bankDetails() {
    return this._bankDetails;
  }

  get value() {
    return {
      [BankAccountNumber.field]: this.accountNumber,
      [BankDetailsType.field]: this.bankDetails
    };
  }
}

export default Bank;
