/*
  Адрес в РФ или любой другой стране (АдрИнфТип)
 */

import CountryCode from './text_type/CountryCode';
import Address from './text_type/Address';

class AddressTextType {
  static validate(value) {
    const errorMsgs = [];
    AddressTextType.VOs.forEach((DomainVO) => {
      const msg = DomainVO.validate(value[DomainVO.field]);
      if (msg !== undefined) {
        errorMsgs.push(msg);
      }
    });
    return (errorMsgs.length > 0) ? 'Сведения об адресе заполнены неверно' : undefined;
  }

  static isValid(value) {
    return !AddressTextType.validate(value);
  }

  static get hint() {
    return 'Введите сведения об адресе';
  }

  static get placeholder() {
    return 'Введите сведения об адресе';
  }

  static get name() {
    return 'Сведения об адресе';
  }

  static get field() {
    return 'address';
  }

  static get VOs() {
    return [CountryCode, Address];
  }

  constructor(countryCode, address) {
    this._type = 'text';
    this.countryCode = countryCode;
    this.address = address;
  }

  clone() {
    return new AddressTextType(this.countryCode, this.address);
  }

  get type() {
    return this._type;
  }

  get countryCode() {
    return this._countryCode;
  }

  set countryCode(value) {
    this._countryCode = new CountryCode(value);
  }

  get address() {
    return this._address;
  }

  set address(value) {
    this._address = new Address(value);
  }

  get value() {
    return {
      type: this.type,
      [CountryCode.field]: this.countryCode,
      [Address.field]: this.address,
    };
  }
}

export default AddressTextType;
