import OKPOUL from './UL/OKPO';
import INNUL from './UL/INN';
import Name from './UL/Name';
import KPPUL from './UL/KPP';

class UL {
  static validate(value) {
    const errorMsgs = [];
    UL.VOs.forEach((DomainVO) => {
      const msg = DomainVO.validate(value && value[DomainVO.field]);
      if (msg !== undefined) {
        errorMsgs.push(msg);
      }
    });
    return (errorMsgs.length > 0) ? 'Данные юридического лица заполнены неверно' : undefined;
  }

  static isValid(value) {
    return !UL.validate(value);
  }

  static get name() {
    return 'Юридическое лицо';
  }

  static get field() {
    return 'legalEntity';
  }

  static get VOs() {
    return [Name, OKPOUL, INNUL, KPPUL];
  }
}

export default UL;
