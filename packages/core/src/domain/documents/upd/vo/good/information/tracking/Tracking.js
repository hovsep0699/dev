/*
  Сведения о товаре, подлежащем прослеживаемости(СведПрослеж)
*/
import Num from './Number';
import MeasurementValue from './MeasurementValue';
import Measurement from '../../../measurement/Measurement';
import AdditionalIndicator from './AdditionalIndicator';

class Tracking {
  static validate(values) {
    const errorMsgs = [];
    Tracking.VOs.forEach((DomainVO) => {
      values.forEach((val) => {
        const msg = DomainVO.validate(val[DomainVO.field]);
        if (msg !== undefined) {
          errorMsgs.push(msg);
        }
      });
    });
    return errorMsgs.length > 0 ? 'СведПрослеж заполнено неверно' : undefined;
  }

  static isValid(value) {
    return !Tracking.validate(value);
  }

  static get name() {
    return 'Сведения о товаре, подлежащем прослеживаемости';
  }

  static get field() {
    return 'information.tracking';
  }

  static get VOs() {
    return [Num, Measurement, MeasurementValue, AdditionalIndicator];
  }
}

export default Tracking;
