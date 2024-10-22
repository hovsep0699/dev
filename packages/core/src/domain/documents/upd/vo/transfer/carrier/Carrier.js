/*
  Перевозчик
*/
import ParticipantType from '../../../standard_element/participant/ParticipantType';
import CarrierUserInput from './CarrierUserInput';
import EmptyOption from '../../../../../common/options/EmptyOption';

class Carrier {
  static validate(values) {
    const errorMsgs = [];
    Carrier.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return (errorMsgs.length > 0) ? 'Поле Перевозчик заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !Carrier.validate(value);
  }

  static get name() {
    return 'Перевозчик';
  }

  static get hint() {
    return 'Заполните данные перевозчика';
  }

  static get field() {
    return 'carrier';
  }

  static get VOs() {
    return [ParticipantType];
  }

  static get options() {
    return [EmptyOption, CarrierUserInput];
  }

  constructor(participant) {
    this.participant = participant;
  }

  clone() {
    return new Carrier(this.participant);
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

export default Carrier;
