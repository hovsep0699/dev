/*
  Сведения о грузоотправителе(строка 3 счет-фактуры) (ГрузОт)
*/
import ParticipantType from '../../standard_element/participant/ParticipantType';
import CargoFromUserInput from './cargo_from/CargoFromUserInput';
import EmptyOption from '../../../../common/options/EmptyOption';
import IsSameOption from '../../../../common/options/IsSameOption';

class CargoFrom {
  static validate(values) {
    const errorMsgs = [];
    CargoFrom.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return (errorMsgs.length > 0) ? 'ГрузОт заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !CargoFrom.validate(value);
  }

  static get name() {
    return 'Грузоотправитель';
  }

  static get hint() {
    return 'Указывается, если грузоотправитель не совпадает с продавцом';
  }

  static get field() {
    return 'cargoFrom';
  }

  static get VOs() {
    return [ParticipantType];
  }

  static get options() {
    return [EmptyOption, IsSameOption, CargoFromUserInput];
  }

  constructor(participant) {
    this.participant = participant;
  }

  clone() {
    return new CargoFrom(this.participant);
  }

  get participant() {
    return this._participant;
  }

  set participant(value) {
    this._participant = value;
  }

  get value() {
    return this.participant;
  }
}

export default CargoFrom;
