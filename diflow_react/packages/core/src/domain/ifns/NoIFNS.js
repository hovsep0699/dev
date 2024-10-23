import IFNS from './IFNS';

class NoIFNS extends IFNS {
  isNull() {
    return true;
  }
}

export default NoIFNS;
