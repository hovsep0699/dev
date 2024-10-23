/*
  Фамилия, имя, отчество физического лица (ФИОТип)
*/

import Surname from './Surname';
import Name from './Name';
import Patronymic from './Patronymic';

class FIO {
  static validate(value) {
    // TODO реализовать валидацию
    return undefined;
  }

  static isValid(value) {
    return !FIO.validate(value);
  }

  static get hint() {
    return 'Введите фамилию, имя и отчество';
  }

  static get name() {
    return 'ФИО';
  }

  static get field() {
    return 'fio';
  }

  static get VOs() {
    return [Surname, Name, Patronymic];
  }

  constructor({ surname, name, patronymic }) {
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
  }

  clone() {
    return new FIO(this.value);
  }

  get value() {
    return {
      [Surname.field]: this.surname,
      [Name.field]: this.name,
      [Patronymic.field]: this.patronymic,
    };
  }

  get surname() {
    return this._surname;
  }

  set surname(value) {
    this._surname = new Surname(value);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = new Name(value);
  }

  get patronymic() {
    return this._patronymic;
  }

  set patronymic(value) {
    this._patronymic = new Patronymic(value);
  }
}

export default FIO;
