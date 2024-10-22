import CCertificate from './CCertificate';

/** получение информации о сертификате */
export const getCertificateInfo = async(data) => {
    const certificate = await cadesplugin.CreateObjectAsync('CAPICOM.Certificate');
    certificate.Import(data);
    
    return new CCertificate(certificate, {
      thumbprint: await certificate.Thumbprint,
      data: await certificate.Export(0),
      validFrom: await certificate.ValidFromDate,
      validTo: await certificate.ValidToDate,
      subjectName: await certificate.SubjectName,
      serialNumber: await certificate.SerialNumber,
      issuerName: await certificate.IssuerName
  })
}

/** расширение информации о сертификатах */
export const expandCertificateList = (certificateRows) => {
  const promises = certificateRows.map(async (item) => {
    const certificateInfo = await getCertificateInfo(item.data, item.thumbprint);

    return {
      ...item,
      /** начало действия сертификата - временной формат */
      dateFrom: certificateInfo?.getValidFromDate(),
      /** окончание дейсвтия сертификата - временной формат */
      dateTo: certificateInfo?.getValidToDate(),
      /** ФИО */
      fio: certificateInfo?.dnSubject?.SN + ' ' + certificateInfo?.dnSubject?.G,
      /** должность */
      position: certificateInfo?.dnSubject?.T,
      /** назване компании */
      companyName: certificateInfo?.Name,
      /** ОГРН */
      ogrn: certificateInfo?.dnSubject?.OGRN,
      /** ИНН */
      inn: certificateInfo?.dnSubject?.INNLE || certificateInfo?.dnSubject?.INN
    };
  })
  return Promise.all(promises);
};

  
