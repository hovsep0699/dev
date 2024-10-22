import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationLimit, Pagination } from '../../../../common/pagination';
import { tariffRowsSelector, tariffRecordsTotalSelector } from '../../store/selectors';
import { getTariffsByCompanyId } from '../../store/actions';

export const TariffHistory = ({ match }: any) => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const recordsTotal = useSelector(tariffRecordsTotalSelector);
  const rows = useSelector(tariffRowsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const companyId = match?.params?.id;
    companyId && dispatch(getTariffsByCompanyId({ id: companyId, offset }));
  }, [dispatch, match, offset]);

  return (
    <div>
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td colSpan={2}>Название тарифа</td>
            <td>Дата старта</td>
            <td>Дата окончания</td>
          </tr>
        </thead>
        <tbody>
          {rows?.map(item => {
            const { id, tariff_title, from, to } = item;
            return (
              <tr key={id}>
                <td colSpan={2}>{tariff_title}</td>
                <td>{from}</td>
                <td>{to} </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <PaginationLimit setLimit={setLimit} limit={limit} />
            </td>
            <td align="right" colSpan={2}>
              <div className="pagination-right">
                <Pagination listLength={recordsTotal} setOffset={setOffset} limit={limit} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
