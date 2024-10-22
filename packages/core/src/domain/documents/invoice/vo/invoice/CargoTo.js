/*
  Сведения о грузополучателе(строка 4 счет-фактуры) (ГрузПолуч)
*/
import ParticipantType from '../../standard_element/participant/ParticipantType';

class CargoTo {
  static validate(values) {
    const errorMsgs = [];
    CargoTo.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return (errorMsgs.length > 0) ? 'ГрузПолуч заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !CargoTo.validate(value);
  }

  static get name() {
    return 'Грузополучатель';
  }

  static get hint() {
    return 'Заполните данные грузополучателя';
  }

  static get field() {
    return 'cargoTo';
  }

  static get VOs() {
    return [ParticipantType];
  }

  constructor(participant) {
    this.participant = participant;
  }

  clone() {
    return new CargoTo(this.participant);
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

export default CargoTo;
