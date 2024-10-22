import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icons, CheckBox } from '@distate/components';
import { getEmployeeCertificate, changeCertificateActivation } from '../../store/actions';
import {
  selectEmployeeCertificateRows,
  selectEmployeeCertificateTotal
} from '../../store/selectors';
import { Pagination, PaginationLimit } from '../../../../common/pagination';
import fileDownload from 'js-file-download';

type Props = {
  id: number;
};

/** Сертификаты сотрудника */
export const EmployeeCertificate = (props: Props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const certificates = useSelector(selectEmployeeCertificateRows);
  const recordsTotal = useSelector(selectEmployeeCertificateTotal);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    id && dispatch(getEmployeeCertificate({ id, props: { offset, limit } }));
  }, [dispatch, id, offset, limit]);

  /** обработка нажатия - скачать сертификат */
  const onDownloadCertificate = (data: any) => {
    fileDownload(new Blob([data]), 'certificate.cer');
  };

  /** обработчик изменения активности сертификата */
  const onChangeCertificateActivation = (certificateId: number, active: boolean) => {
    dispatch(
      changeCertificateActivation({
        id: certificateId,
        isActive: active,
        employeeId: id,
        props: { offset, limit }
      })
    );
  };

  return (
    <>
      <h3 className="header">Сертификаты</h3>

      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>Должность</td>
            <td colSpan={2}>Действителен до</td>
            <td align="center">Активен</td>
            <td align="center">Скачать</td>
          </tr>
        </thead>
        <tbody>
          {certificates?.map(row => {
            const { id, active, valid_until, data, position } = row;
            return (
              <tr key={id}>
                <td>{position}</td>
                <td colSpan={2}>{valid_until}</td>
                <td align="center">
                  <CheckBox
                    checked={active}
                    onChange={e => onChangeCertificateActivation(id, active)}
                  />
                </td>
                <td align="center">
                  <Icons.IconDownload
                    onClick={() => onDownloadCertificate(data)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <PaginationLimit setLimit={setLimit} limit={limit} />
            </td>
            <td colSpan={2}>
              <div className="pagination-right">
                <Pagination setOffset={setOffset} listLength={recordsTotal} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
