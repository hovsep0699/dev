import CryptoPro from '../../../infrastructure/CryptoPro';
import SignStrategy from './SignStrategy';

export default class CryptoProSignStrategy extends SignStrategy {
  sign(dataBase64, thumbprint) {
    return CryptoPro.signData(dataBase64, thumbprint);
  }
}
