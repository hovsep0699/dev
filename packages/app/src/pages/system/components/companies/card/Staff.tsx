import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fileDownload from 'js-file-download';
import { Button } from '@distate/components';
import { dateFormat } from '@distate/components/dist/FormSchema';
import { getCompanyEmployee, getCertificates, setCertificates } from '../../../store/actions';
import { employeeSelector, certificatesSelector } from '../../../store/selects';
import './style.css';

type Props = {
  companyId: number;
};

export const Staff = (props: Props) => {
  const { companyId } = props;

  const dispatch = useDispatch();
  const empployee = useSelector(employeeSelector);
  const certificates = useSelector(certificatesSelector);

  useEffect(() => {
    companyId && dispatch(getCompanyEmployee(companyId));
  }, [companyId, dispatch]);

  const [visibleCert, setVisibleCert] = useState<number>();

  /** показать информацию о сертификате */
  const onView = (id: number) => {
    dispatch(getCertificates(id));
    setVisibleCert(id);
  };

  /** скрыть информацию о сертификате */
  const onHide = () => {
    dispatch(setCertificates({ certificates: undefined }));
    setVisibleCert(undefined);
  };

  /** скачать сертификат */
  const onDownloadCertificate = (data: any) => {
    fileDownload(new Blob([data]), 'certificate.cer');
  };

  return (
    <div>
      <h2 className="text-center title" style={{ paddingBottom: 15 }}>
        Сотрудники компании
      </h2>

      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>ФИО</td>
            <td>Должность</td>
            <td>Email</td>
            <td align="center">Сертификаты</td>
          </tr>
        </thead>
        <tbody>
          {empployee?.rows?.map((item: any) => {
            const { id, surname, name, patronymic, position, email } = item;
            const fio = [surname, name, patronymic].filter(item => item).join(' ');

            const isVisible = visibleCert === id;

            const validCertificates = certificates?.filter((item: any) => {
              const { dateTo, dateFrom, active } = item;

              const now = new Date();
              const isTimeNotMatch = now < dateFrom || now > dateTo;

              const inactive = isTimeNotMatch && !active;

              return !inactive;
            });

            const isEmptyCertList = !validCertificates || validCertificates.length === 0;

            return (
              <React.Fragment key={id}>
                <tr>
                  <td>{fio}</td>
                  <td>{position}</td>
                  <td>{email}</td>
                  <td align="center">
                    {isVisible ? (
                      <Button onClick={onHide}>Скрыть</Button>
                    ) : (
                      <Button onClick={() => onView(id)}>Показать</Button>
                    )}
                  </td>
                </tr>
                {isVisible && (
                  <tr>
                    {isEmptyCertList ? (
                      <td colSpan={4} className="license-element-td">
                        <h2>Сертификаты отсутствуют</h2>
                      </td>
                    ) : (
                      <td colSpan={4} className="license-element-td">
                        {validCertificates?.map((item: any) => {
                          const { id, companyName, fio, inn, ogrn, dateTo, data } = item;
                          const date = dateFormat(dateTo, 'dd.MM.yyyy hh:mm:ss');

                          return (
                            <div key={id} className="license-element-wrapper">
                              <div className="license-element-left">
                                <h3>{companyName}</h3>
                                <div>{fio}</div>
                              </div>
                              <div className="license-element-right">
                                {inn && <div>ИНН {inn}</div>}
                                {ogrn && <div>ОГРН {ogrn}</div>}
                                <div>Действителен до {date}</div>
                                <Button onClick={() => onDownloadCertificate(data)}>Скачать</Button>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                    )}
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
