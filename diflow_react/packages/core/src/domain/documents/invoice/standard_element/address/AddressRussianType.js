/*
  Адрес в Российской Федерации (АдрРФТип)
 */

import RegionCode from './russian_type/RegionCode';
import PostalCode from './russian_type/PostalCode';
import District from './russian_type/District';
import City from './russian_type/City';
import Settlement from './russian_type/Settlement';
import Street from './russian_type/Street';
import House from './russian_type/House';
import Building from './russian_type/Building';
import Room from './russian_type/Room';

class AddressRussianType {
  static validate(value) {
    const errorMsgs = [];
    AddressRussianType.VOs.forEach((DomainVO) => {
      const msg = DomainVO.validate(value && value[DomainVO.field]);
      if (msg !== undefined) {
        errorMsgs.push(msg);
      }
    });
    return (errorMsgs.length > 0) ? 'Сведения об адресе заполнены неверно' : undefined;
  }

  static isValid(value) {
    return !AddressRussianType.validate(value);
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
    return [
      RegionCode,
      PostalCode,
      District,
      City,
      Settlement,
      Street,
      House,
      Building,
      Room
    ];
  }

  constructor(regionCode, postalCode, district, city, settlement, street, house, building, room) {
    this._type = 'russian';
    this.regionCode = regionCode;
    this.postalCode = postalCode;
    this.district = district;
    this.city = city;
    this.settlement = settlement;
    this.street = street;
    this.house = house;
    this.building = building;
    this.room = room;
  }

  clone() {
    return new AddressRussianType(
      this.regionCode,
      this.postalCode,
      this.district,
      this.city,
      this.settlement,
      this.street,
      this.house,
      this.building,
      this.room
    );
  }

  get type() {
    return this._type;
  }

  get regionCode() {
    return this._regionCode;
  }

  set regionCode(value) {
    this._regionCode = new RegionCode(value);
  }

  get postalCode() {
    return this._postalCode;
  }

  set postalCode(value) {
    this._postalCode = new PostalCode(value);
  }

  get district() {
    return this._district;
  }

  set district(value) {
    this._district = new District(value);
  }

  get city() {
    return this._city;
  }

  set city(value) {
    this._city = new City(value);
  }

  get settlement() {
    return this._settlement;
  }

  set settlement(value) {
    this._settlement = new Settlement(value);
  }

  get street() {
    return this._street;
  }

  set street(value) {
    this._street = new Street(value);
  }

  get house() {
    return this._house;
  }

  set house(value) {
    this._house = new House(value);
  }

  get building() {
    return this._building;
  }

  set building(value) {
    this._building = new Building(value);
  }

  get room() {
    return this._room;
  }

  set room(value) {
    this._room = new Room(value);
  }

  get value() {
    return {
      type: this.type,
      [RegionCode.field]: this.regionCode,
      [PostalCode.field]: this.postalCode,
      [District.field]: this.district,
      [City.field]: this.city,
      [Settlement.field]: this.settlement,
      [Street.field]: this.street,
      [House.field]: this.house,
      [Building.field]: this.building,
      [Room.field]: this.room
    };
  }
}

export default AddressRussianType;
