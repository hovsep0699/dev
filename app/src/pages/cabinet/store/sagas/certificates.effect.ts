import { takeLatest, put } from 'redux-saga/effects';
import { Flash } from '../../../../common/flash/Flash';
import { getCertificates, setCertificates, changeUseCertificate } from '../actions';
import { cabinetGateway } from '@distate/core/dist/application/cabinet/CabinetGateway';
import { expandCertificateList } from '@distate/core/dist/application/certificate/CertificateHelper';
import cryptoPro from '@distate/core/dist/infrastructure/CryptoPro';

/** Кабинет - Сертификаты */
export function* certificatesEffect() {
  yield takeLatest(getCertificates, getCertificatesWorker);
  yield takeLatest(changeUseCertificate, changeUseCertificateWorker);
}

/** получение информации о сертификатах */
function* getCertificatesWorker({ payload }: { payload: any }) {
  try {
    /** получаем сертификаты */
    const certificates = yield cabinetGateway.getCertificates(payload);

    const localCertificates = yield cryptoPro.get();
    /** отпечатки установленных на компьютер сертификатов */
    const localThumbprints = localCertificates.map((item: any) => item.Thumbprint);

    /** достаем из сертов дополнительную информацию */
    const extendedRows = yield expandCertificateList(certificates.rows);

    yield put(
      setCertificates({ certificates: { ...certificates, rows: extendedRows, localThumbprints } })
    );
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}

/** смена используемого сертификата */
function* changeUseCertificateWorker({ payload }: { payload: number }) {
  try {
    yield cabinetGateway.changeUseCertificate(payload);
    yield put(getCertificates({}));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
