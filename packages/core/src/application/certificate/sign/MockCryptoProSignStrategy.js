import SignStrategy from './SignStrategy';

export default class MockCryptoProSignStrategy extends SignStrategy {
  constructor(mockJson) {
    super();
    this._promiseSign = Promise.resolve(mockJson.signature);
  }

  sign() {
    return this._promiseSign;
  }
}
