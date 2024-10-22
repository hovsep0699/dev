import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fileDownload from 'js-file-download';
import { Icons } from '@distate/components';
import { dateFormat } from '@distate/components/dist/FormSchema';
import Core from '@distate/core/dist/application/Core';
import { Pagination, PaginationLimit } from '../../../../common/pagination';
import { Conventions } from './Conventions';
import { getCertificates, changeUseCertificate } from '../../store/actions';
import {
  certificatesSelector,
  certificatesRecordsTotalSelector,
  localThumbprintsSelector
} from '../../store/selectors';
import { ConfirmationModal } from './ConfirmationModal';

/** Кабинет - Сертификаты */
export const Certificate = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isVisible, setIsVisible] = useState(false);
  const [currentThumbprint, setCurrentThumbprint] = useState<string>();
  const [selectedCerificate, setSelectedCerificate] = useState<{
    id: number;
    thumbprint: string;
  }>();

  const certificates = useSelector(certificatesSelector);
  const recordsTotal = useSelector(certificatesRecordsTotalSelector);
  const localThumbprints = useSelector(localThumbprintsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentThumbprint(Core.certificate.thumbprint);
  }, []);

  useEffect(() => {
    dispatch(getCertificates({ offset, limit }));
  }, [dispatch, limit, offset]);

  /** обработка нажатия - скачать сертификат */
  const onDownloadCertificate = (data: any) => {
    fileDownload(new Blob([data]), 'certificate.cer');
  };

  /** сменить используемый сертификат */
  const onChangUseCertificate = (id: number, thumbprint: string) => {
    setSelectedCerificate({
      id,
      thumbprint
    });
    setIsVisible(true);
  };

  const onConfirmation = () => {
    dispatch(changeUseCertificate(selectedCerificate?.id));
    setCurrentThumbprint(selectedCerificate?.thumbprint);
    setIsVisible(false);
  };

  return (
    <>
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>Ф.И.О.</td>
            <td>должность</td>
            <td>действителен с</td>
            <td>действителен до</td>
            <td colSpan={3}>отпечаток</td>
            <td align="center">используется</td>
            <td align="center">скачать</td>
          </tr>
        </thead>
        <tbody>
          {certificates?.map((item: any) => {
            const { id, fio, position, dateFrom, dateTo, thumbprint, data } = item;
            const from = dateFormat(dateFrom, 'yyyy-MM-dd');
            const to = dateFormat(dateTo, 'yyyy-MM-dd');

            const now = new Date();
            const isTimeNotMatch = now < dateFrom || now > dateTo;

            const isCurrentCertificate = currentThumbprint === thumbprint;

            /** если сертификат истек или еще не начал действовать - добавляем цвет фону */
            let rowColor = isTimeNotMatch ? '#efefef' : '';
            /** если отпечатка нет среди локальных сертов, то перекрашиваем строку, иначе оставляем предыдущее значение */
            rowColor = !localThumbprints?.includes(thumbprint) ? '#fbe5e4' : rowColor;

            const isCanSelecting =
              !isTimeNotMatch && localThumbprints?.includes(thumbprint) && !isCurrentCertificate;

            return (
              <tr key={id} style={{ background: rowColor }}>
                <td>{fio}</td>
                <td>{position}</td>
                <td>{from}</td>
                <td>{to}</td>
                <td colSpan={3}>{thumbprint}</td>
                <td align="center">
                  {isCurrentCertificate && <Icons.IconCheck fill="currentColor" />}
                  {isCanSelecting && (
                    <Icons.IconMarkerAlt
                      fill="currentColor"
                      onClick={() => onChangUseCertificate(id, thumbprint)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </td>
                <td align="center">
                  {
                    <Icons.IconDownload
                      fill="currentColor"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onDownloadCertificate(data)}
                    />
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <PaginationLimit setLimit={setLimit} limit={limit} />
            </td>
            <td colSpan={5} align="right">
              <div className="pagination-right">
                <Pagination listLength={recordsTotal} setOffset={setOffset} limit={limit} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <Conventions />
      <ConfirmationModal
        hide={() => setIsVisible(false)}
        isVisible={isVisible}
        handleCheck={onConfirmation}
      />
    </>
  );
};
