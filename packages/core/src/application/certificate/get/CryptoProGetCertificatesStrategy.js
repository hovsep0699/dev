import CryptoPro from '../../../infrastructure/CryptoPro';
import GetSertificatesStrategy from './GetCertificatesStrategy';

export default class CryptoProGetCertificatesStrategy extends GetSertificatesStrategy {
  get() {
    return CryptoPro.get().catch((error) => {
      const errObj = { message: error.message, pluginName: 'CryptoPro Extension for CAdES Browser Plug-in'};
      if (error.step) errObj.step = error.step;
      throw errObj;
    });
  }
}
