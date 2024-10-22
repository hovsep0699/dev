import LegalAddress from './LegalAddress';

class NoLegalAddress extends LegalAddress {
  isNull() {
    return true;
  }
}

export default NoLegalAddress;
