/*
  Сведения о лице, передавшем товар (груз) (СвЛицПер)
*/
import Type from './Type';
import FIO from '../../../standard_element/fio/FIO';
import Position from './Position';
import CompanyName from './CompanyName';
import AssigneeBasis from './AssigneeBasis';
import ShipmentBasis from './ShipmentBasis';
import Information from './Information';

class PassedBy {
  static validate(value) {
    // TODO реализовать валидацию
    return undefined;
  }

  static isValid(value) {
    return !PassedBy.validate(value);
  }

  static get hint() {
    return 'Введите сведения о лице, передавшем товар (груз)';
  }

  static get name() {
    return 'Товар передал';
  }

  static get field() {
    return 'passedBy';
  }

  static get VOs() {
    return [Type, FIO, Position, CompanyName, ShipmentBasis, AssigneeBasis, Information];
  }

  constructor({ type, fio }) {
    // TODO доделать
    this.type = type;
    this.fio = fio;
  }

  clone() {
    return new PassedBy(this.value);
  }

  get value() {
    return {
      [Type.field]: this.type,
      [FIO.field]: this.fio,
    };
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = new Type(value);
  }

  get fio() {
    return this._fio;
  }

  set fio(value) {
    this._fio = new FIO(value);
  }
}

export default PassedBy;
