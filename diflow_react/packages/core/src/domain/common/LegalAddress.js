import Region from './address/Region';
import PostIndex from './address/PostIndex';

export default class LegalAddress {
  constructor({
    postalCode,
    region,
    city = '',
    settlement = '',
    district = '',
    building = '',
    house = '',
    street = '',
    room = ''
  } = {}) {
    if (this.isNull()) return;
    if (!region) {
      throw new Error('Невозможно создать юридический адрес компании. Нет обязательного поля (Регион)');
    }
    if (postalCode && !(postalCode instanceof PostIndex)) {
      throw new Error('Почтовый индекс должен быть экземпляром класса PostIndex');
    }
    if (!(region instanceof Region)) {
      throw new Error('Регион должен быть экземпляром класса Region');
    }

    this._region = region;
    this._city = city;
    this._settlement = settlement;
    this._district = district;
    this._postalCode = postalCode;
    this._building = building;
    this._house = house;
    this._street = street;
    this._room = room;
  }

  isNull() {
    return false;
  }

  set type(value) {
    this._type = value;
  }

  get type() {
    return this._type;
  }

  get region() {
    return this._region;
  }

  get city() {
    return this._city;
  }

  get settlement() {
    return this._settlement;
  }

  get district() {
    return this._district;
  }

  get postalCode() {
    return this._postalCode;
  }

  get building() {
    return this._building;
  }

  get house() {
    return this._house;
  }

  get street() {
    return this._street;
  }

  get room() {
    return this._room;
  }
}
