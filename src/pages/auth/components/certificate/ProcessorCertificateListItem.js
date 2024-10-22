import React from 'react';
import CertificateListItem from './CertificateListItem';
import { removeSymbol } from '../../../../utils/StringUtil';
import { ddmmyyyy_hhmmss } from '../../../../utils/DateUtil';

class ProcessorCertificateListItem {
  static getTransformation(certificate, isSelected, onClick, isActive, disabledHint) {
    const companyNameCleanedFromDoubleQuotes = removeSymbol(
      certificate.subject.O || certificate.subject.CN || certificate.subject.G,
      '"'
    );
    const computedFIO = `${certificate.subject.SN} ${certificate.subject.G}`;
    const formatedValidToDate = ddmmyyyy_hhmmss(certificate.validTo);

    return (
      <CertificateListItem
        key={certificate.thumbprint}
        thumbprint={certificate.thumbprint}
        title={companyNameCleanedFromDoubleQuotes}
        validToDate={formatedValidToDate}
        fio={computedFIO}
        isCompany={certificate.isCompany}
        onClick={onClick}
        selected={isSelected}
        isActive={isActive}
        disabledHint={disabledHint}
      />
    );
  }
}

export default ProcessorCertificateListItem;
