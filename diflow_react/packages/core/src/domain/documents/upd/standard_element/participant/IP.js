import FIO from '../fio/FIO';
import OKPOIP from './IP/OKPO';
import INNIP from './IP/INN';
import OGRNIP from './IP/OGRNIP';

class IP {
  static validate(value) {
    const errorMsgs = [];
    IP.VOs.forEach((DomainVO) => {
      const msg = DomainVO.validate(value && value[DomainVO.field]);
      if (msg !== undefined) {
        errorMsgs.push(msg);
      }
    });
    return (errorMsgs.length > 0) ? 'Данные индивидуального предпринимателя заполнены неверно' : undefined;
  }

  static isValid(value) {
    return !IP.validate(value);
  }

  static get name() {
    return 'Индивидуальный предприниматель';
  }

  static get field() {
    return 'individualEntrepreneur';
  }

  static get VOs() {
    return [FIO, OKPOIP, INNIP, OGRNIP];
  }
}

export default IP;
