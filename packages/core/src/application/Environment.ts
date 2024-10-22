import AuthGateway from './auth/AuthGateway';
import CompanyGateway from './company/CompanyGateway';
import BankGateway from '../domain/bank/BankGateway';
import IFNSGateway from '../domain/ifns/IFNSGateway';
import AddressGateway from '../domain/common/address/AddressGateway';
import AutocompleteGateway from './autocomplete/AutocompleteGateway';
import UPDGateway from './documents/upd/UPDGateway';
import InvoiceGateway from './documents/invoice/InvoiceGateway';
import NotificationGateway from './notifications/NotificationGateway';
import SignGateway from './sign/SignGateway';
import DocumentsGateway from './documents/common/DocumentsGateway';
import FolderGateway from './documents/common/FolderGateway';
import ContractorGateway from './contractor/common/ContractorGateway';
import DictionaryGateway from './dictionary/common/DictionaryGateway';

class Environment {
  private _authGateway: AuthGateway;
  private _companyGateway: CompanyGateway;
  private _bankGateway: BankGateway;
  private _ifnsGateway: IFNSGateway;
  private _addressGateway: AddressGateway;
  private _autocompleteGateway: AutocompleteGateway;
  private _updGateway: UPDGateway;
  private _invoiceGateway: InvoiceGateway;
  private _notificationsGateway: NotificationGateway;
  private _signGateway: SignGateway;
  private _documentsGateway: DocumentsGateway;
  private _folderGateway: FolderGateway;
  private _isDebug: Boolean;
  private _contractorGateway: ContractorGateway;
  private _dictionaryGateway: DictionaryGateway;

  constructor() {
    this._authGateway = new AuthGateway();
    this._companyGateway = new CompanyGateway();
    this._bankGateway = new BankGateway();
    this._ifnsGateway = new IFNSGateway();
    this._addressGateway = new AddressGateway();
    this._autocompleteGateway = new AutocompleteGateway();
    this._updGateway = new UPDGateway();
    this._invoiceGateway = new InvoiceGateway();
    this._notificationsGateway = new NotificationGateway();
    this._signGateway = new SignGateway();
    this._documentsGateway = new DocumentsGateway();
    this._folderGateway = new FolderGateway();
    this._isDebug = false;
    this._contractorGateway = new ContractorGateway();
    this._dictionaryGateway = new DictionaryGateway();
  }

  setIsDebug(value: Boolean): void {
    this._isDebug = value;
  }

  getIsDebug(): Boolean {
    return this._isDebug;
  }

  setCompanyGateway(companyGateway: CompanyGateway): void {
    this._companyGateway = companyGateway;
  }

  getCompanyGateway() {
    return this._companyGateway;
  }

  setAuthGateway(authGateway: AuthGateway): void {
    this._authGateway = authGateway;
  }

  getAuthGateway() {
    return this._authGateway;
  }

  setBankGateway(bankGateway: BankGateway): void {
    this._bankGateway = bankGateway;
  }

  getBankGateway() {
    return this._bankGateway;
  }

  setIFNSGateway(ifnsGateway: IFNSGateway): void {
    this._ifnsGateway = ifnsGateway;
  }

  getIFNSGateway() {
    return this._ifnsGateway;
  }

  setAddressGateway(addressGateway: AddressGateway): void {
    this._addressGateway = addressGateway;
  }

  getAddressGateway() {
    return this._addressGateway;
  }

  setAutocompleteGateway(autocompleteGateway: AutocompleteGateway): void {
    this._autocompleteGateway = autocompleteGateway;
  }

  getAutocompleteGateway() {
    return this._autocompleteGateway;
  }

  setUPDGateway(updGateway: UPDGateway): void {
    this._updGateway = updGateway;
  }

  getUPDGateway() {
    return this._updGateway;
  }

  setInvoiceGateway(invoiceGateway: InvoiceGateway): void {
    this._invoiceGateway = invoiceGateway;
  }

  getInvoiceGateway() {
    return this._invoiceGateway;
  }

  setNotificationsGateway(notificationsGateway: NotificationGateway) {
    this._notificationsGateway = notificationsGateway;
  }

  getNotificationsGateway() {
    return this._notificationsGateway;
  }

  setSignGateway(signGateway: SignGateway): void {
    this._signGateway = signGateway;
  }

  getSignGateway() {
    return this._signGateway;
  }

  setDocumentsGateway(documentsGateway: DocumentsGateway): void {
    this._documentsGateway = documentsGateway;
  }

  getDocumentsGateway() {
    return this._documentsGateway;
  }

  setFolderGateway(folderGateway: FolderGateway): void {
    this._folderGateway = folderGateway;
  }

  getFolderGateway() {
    return this._folderGateway;
  }

  setContractorGateway(contractorGateway: ContractorGateway): void {
    this._contractorGateway = contractorGateway;
  }

  getContractorGateway() {
    return this._contractorGateway;
  }

  setDictionaryGateway(dictionaryGateway: DictionaryGateway): void {
    this._dictionaryGateway = dictionaryGateway;
  }

  getDictionaryGateway() {
    return this._dictionaryGateway;
  }
}

const instance = new Environment();
export default instance;
