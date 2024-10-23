import BIK from './BIK';
import AccountNumber from './AccountNumber';

class BankDetails {
  constructor(id, bik, accountNumber, correspondentAccount, bankName, shortBankName) {
    this._id = id;
    this._bik = new BIK(bik);
    this._accountNumber = new AccountNumber(accountNumber);
    this._correspondentAccount = correspondentAccount;
    this._bankName = bankName;
    this._shortBankName = shortBankName;
  }

  get bik() {
    return this._bik;
  }

  get accountNumber() {
    return this._accountNumber;
  }

  get correspondentAccount() {
    return this._correspondentAccount;
  }

  get bankName() {
    return this._bankName;
  }

  get shortBankName() {
    return this._shortBankName;
  }
}

export default BankDetails;
