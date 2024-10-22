import CryptoProLib from './CryptoProLib';
import {
  INIT, LIST_CERTS, CERT_IDS, CERT_INFO, CERT_INFO_ALL
} from '../application/certificate/get/Steps';

class CryptoPro {
  constructor() {
    this.cryptopro = new CryptoProLib();
  }

  async signData (dataBase64, thumbprint) {
    try {
      await this.cryptopro.init();
      return this.cryptopro.signData(dataBase64, thumbprint);
    }
    catch (e) {
      throw new Error(e.message);
    }
  }


  get() {
    let currentStep = INIT;
    const listCerts = () => {
      currentStep = LIST_CERTS;
      return this.cryptopro.listCertificates();
    };
    const getCertIds = (certificates) => {
      currentStep = CERT_IDS;
      return certificates.map(cert => cert.id);
    };
    const getCertInfo = (thumbprints) => {
      currentStep = CERT_INFO;
      return thumbprints.map(thumbprint => this.cryptopro.certificateInfo(thumbprint));
    };
    const getCertInfoAll = (certInfoPromises) => {
      currentStep = CERT_INFO_ALL;
      return Promise.all(certInfoPromises);
    };
    return this.cryptopro.init()
      .then(listCerts)
      .then(getCertIds)
      .then(getCertInfo)
      .then(getCertInfoAll)
      .catch((e) => {
        throw { message: e.message, step: currentStep };
      });
  }
}

const instance = new CryptoPro();
export default instance;
