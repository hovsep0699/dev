/*
  Сведения о факторе (СвФактор)
*/
import ParticipantType from '../../standard_element/participant/ParticipantType';
import EmptyOption from '../../../../common/options/EmptyOption';
import FactorUserInput from './FactorUserInput';

class Factor {
  static validate(values) {
    const errorMsgs = [];
    Factor.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return (errorMsgs.length > 0) ? 'СвФактор заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !Factor.validate(value);
  }

  static get name() {
    return 'Сведения о факторе';
  }

  static get hint() {
    return 'Заполните сведения о факторе';
  }

  static get field() {
    return 'factor';
  }

  static get VOs() {
    return [ParticipantType];
  }

  static get options() {
    return [EmptyOption, FactorUserInput];
  }

  constructor(participant) {
    this.participant = participant;
  }

  clone() {
    return new Factor(this.participant);
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

export default Factor;
