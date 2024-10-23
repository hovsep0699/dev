import LegalAddress from '../common/LegalAddress';

export default class IndependentDepartmentAddress {
  constructor(address) {
    if (!(address instanceof LegalAddress)) {
      throw new Error('Параметр должен быть экземпляром типа LegalAddress');
    }
  }
}
