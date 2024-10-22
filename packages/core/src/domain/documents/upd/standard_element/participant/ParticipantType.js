/*
  УчастникТип
 */
import Division from './Division';
import InformationForParticipant from './InformationForParticipant';
import Bank from './Bank';
import AddressRussianType from '../address/AddressRussianType';
import ContactType from '../contact/ContactType';
import Type from './Type';
import Name from './UL/Name';
import IP from './IP';
import UL from './UL';

class ParticipantType {
  static validate() {
    return undefined;
  }

  static isValid(value) {
    return !ParticipantType.validate(value);
  }

  static get hint() {
    return 'Введите сведения об участнике';
  }

  static get placeholder() {
    return 'Введите сведения об участнике';
  }

  static get name() {
    return 'Участник';
  }

  static get field() {
    return 'participant';
  }

  static get VOs() {
    return [
      Type,
      ...IP.VOs,
      ...UL.VOs,
      Division,
      InformationForParticipant,
      AddressRussianType,
      Bank,
      ContactType
    ];
  }

  constructor(
    okpo,
    division,
    informationForParticipant,
    name,
    accountNumber,
    bankDetails,
    regionCode,
    postalCode,
    district,
    city,
    settlement,
    street,
    house,
    building,
    room,
    phone,
    email,
    type
  ) {
    this.okpo = okpo;
    this.division = division;
    this.informationForParticipant = informationForParticipant;
    this.name = name;
    this.setBank(accountNumber, bankDetails);
    this.setAddress(
      regionCode,
      postalCode,
      district,
      city,
      settlement,
      street,
      house,
      building,
      room
    );
    this.setContact(phone, email);
    this.type = type;
  }

  clone() {
    return new ParticipantType(
      this.okpo,
      this.division,
      this.informationForParticipant,
      this.name,
      this.bank.accountNumber,
      this.bank.bankDetails,
      this.address.regionCode,
      this.address.postalCode,
      this.address.district,
      this.address.city,
      this.address.settlement,
      this.address.street,
      this.address.house,
      this.address.building,
      this.address.room,
      this.contact.phone,
      this.contact.email,
      this.type
    );
  }

  set okpo(value) {
    // this._okpo = new OKPO(value);
  }

  get okpo() {
    return this._okpo;
  }

  set division(value) {
    this._division = new Division(value);
  }

  get division() {
    return this._division;
  }

  set informationForParticipant(value) {
    this._informationForParticipant = new InformationForParticipant(value);
  }

  get informationForParticipant() {
    return this._informationForParticipant;
  }

  set name(value) {
    this._name = new Name(value);
  }

  get name() {
    return this._name;
  }

  setBank(accountNumber, bankDetails) {
    this._bank = new Bank(accountNumber, bankDetails);
  }

  get bank() {
    return this._bank;
  }

  setAddress(regionCode, postalCode, district, city, settlement, street, house, building, room) {
    this._address = new AddressRussianType(
      regionCode,
      postalCode,
      district,
      city,
      settlement,
      street,
      house,
      building,
      room
    );
  }

  get address() {
    return this._address;
  }

  setContact(phone, email) {
    this._contact = new ContactType(phone, email);
  }

  get contact() {
    return this._contact;
  }

  set type(value) {
    this._type = new Type(value);
  }

  get type() {
    return this._type;
  }

  get value() {
    return {
      // [OKPO.field]: this.okpo,
      [Division.field]: this.division,
      [InformationForParticipant.field]: this.informationForParticipant,
      [Name.field]: this.name,
      [Bank.field]: this.bank,
      [AddressRussianType.field]: this.address,
      [Type.field]: this.type
    };
  }
}

export default ParticipantType;
