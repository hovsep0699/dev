import GetCertificatesStrategy from './get/GetCertificatesStrategy';
import SignStrategy from './sign/SignStrategy';
import DiffCertificatesStrategy from './diff/DiffCertificatesStrategy';
import DomainCertificate from '../../domain/common/Certificate';

import CryptoProGetCertificatesStrategy from './get/CryptoProGetCertificatesStrategy';
import MockDiffCertificatesStrategy from './diff/MockDiffCertificatesStrategy';
import diffMock from '../../mocks/200/diffs_certs_only_last_inactive.json';
import CryptoProSignStrategy from './sign/CryptoProSignStrategy';
import AJAXDiffCertificatesStrategy from './diff/AJAXDiffCertificatesStrategy';
import { CERT } from '../error/Error';
import errorFactory from '../error/ErrorFactory';

class Service {
  constructor() {
    this._getCertificatesFromUserFilesystem = () => {
      if (!this._getCertificatesStrategy) {
        return Promise.reject(new Error('Необходимо задать стратегию для получения сертификатов'));
      }
      return this._getCertificatesStrategy.get();
    };

    this._getCertificatesThumbprints = doSomeJob => (certs) => {
      doSomeJob(certs);
      return certs.map(cert => cert.Thumbprint);
    };

    this._wrapCert = cert => new DomainCertificate(cert.Subject, cert.Thumbprint, cert.ValidFromDate, cert.ValidToDate, cert.SerialNumber, cert.isActive);
    this._wrapProviderCertsToDomainCerts = certs => certs.filter(Boolean).map(this._wrapCert);

    this._storeCertsToMap = certsMap => (certs) => {
      certs.forEach(cert => certsMap.set(cert.Thumbprint, cert));
    };

    this._getCertificatesDiff = (thumbprints) => {
      if (!this._diffCertificatesStrategy) {
        throw new Error('Необходимо задать стратегию для получения активных/неактивных сертификатов');
      }
      return this._diffCertificatesStrategy.diff(thumbprints);
    };
    this._handleCertificateDiff = certsMap => isReturnActiveCerts => ({ thumbprints }) => thumbprints.map(({ thumbprint, is_active, isHasThumbprintInServerRes }) => {
      if (isHasThumbprintInServerRes === isReturnActiveCerts) {
        const rawCert = certsMap.get(thumbprint);
        rawCert.isActive = (is_active && isHasThumbprintInServerRes) || !isReturnActiveCerts;
        return rawCert;
      }
      return undefined;
    });
  }

  set getCertificatesStrategy(strategy) {
    if (!(strategy instanceof GetCertificatesStrategy)) {
      throw new Error('Параметр должен быть подклассом GetCertificatesStrategy');
    }
    this._getCertificatesStrategy = strategy;
  }

  get getCertificatesStrategy() {
    if (!this._getCertificatesStrategy) {
      throw new Error('Необходимо задать стратегию для получения сертификатов');
    }
    return this._getCertificatesStrategy;
  }

  set signStrategy(strategy) {
    if (!(strategy instanceof SignStrategy)) {
      throw new Error('Параметр должен быть подклассом SignStrategy');
    }
    this._signStrategy = strategy;
  }

  get signStrategy() {
    if (!this._signStrategy) {
      throw new Error('Необходимо задать стратегию для подписания');
    }
    return this._signStrategy;
  }

  set diffCertificatesStrategy(strategy) {
    if (!(strategy instanceof DiffCertificatesStrategy)) {
      throw new Error('Параметр должен быть подклассом DiffCertificatesStrategy');
    }
    this._diffCertificatesStrategy = strategy;
  }

  get diffCertificatesStrategy() {
    if (!this._diffCertificatesStrategy) {
      throw new Error('Необходимо задать стратегию для получения активных/неактивных сертификатов');
    }
    return this._diffCertificatesStrategy;
  }

  getAllCertificates() {
    return this._getCertificatesFromUserFilesystem()
      .then(this._wrapProviderCertsToDomainCerts);
  }

  getLoginCertificates() {
    const certsMap = new Map();

    return this._getCertificatesFromUserFilesystem()
      .then(this._getCertificatesThumbprints(this._storeCertsToMap(certsMap)))
      .then(this._getCertificatesDiff)
      .then(this._handleCertificateDiff(certsMap)(true))
      .then(this._wrapProviderCertsToDomainCerts)
      .catch((error) => {
        throw errorFactory(CERT, 'Ошибка с сертификатами. Метод getLoginCertificates', error);
      });
  }

  getRegisterCertificates() {
    const certsMap = new Map();

    return this._getCertificatesFromUserFilesystem()
      .then(this._getCertificatesThumbprints(this._storeCertsToMap(certsMap)))
      .then(this._getCertificatesDiff)
      .then(this._handleCertificateDiff(certsMap)(false))
      .then(this._wrapProviderCertsToDomainCerts)
      .catch((error) => {
        throw errorFactory(CERT, 'Ошибка с сертификатами. Метод getRegisterCertificates', error);
      });
  }

  sign(info, thumbprint) {
    return this._signStrategy.sign(info, thumbprint);
  }
}

export const CertificateService = new Service();
CertificateService.getCertificatesStrategy = new CryptoProGetCertificatesStrategy();
CertificateService.diffCertificatesStrategy = new AJAXDiffCertificatesStrategy();
CertificateService.signStrategy = new CryptoProSignStrategy();

export const MockCertificateService = new Service();
MockCertificateService.getCertificatesStrategy = new CryptoProGetCertificatesStrategy();
MockCertificateService.diffCertificatesStrategy = new MockDiffCertificatesStrategy(diffMock);
MockCertificateService.signStrategy = new CryptoProSignStrategy();
