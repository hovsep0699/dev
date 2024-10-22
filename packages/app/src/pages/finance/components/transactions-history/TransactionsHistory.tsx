import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transactionsRecordsTotalSelector, transactionRowsSelector } from '../../store/selectors';
import { Pagination, PaginationLimit } from '../../../../common/pagination';
import Core from '@distate/core/dist/application/Core';
import { getTransactionsHistory } from '../../store/actions';
import { TransactionsFilter } from './tools/TransactionsFilter';

export const TransactionsHistory = ({ match }: any) => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const recordsTotal = useSelector(transactionsRecordsTotalSelector);
  const rows = useSelector(transactionRowsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const companyId = match?.params?.id;
    companyId && dispatch(getTransactionsHistory({ id: companyId, offset, limit }));
  }, [dispatch, offset, limit, match]);

  type AmoutProps = {
    type_system_name: string;
    amount: number;
  };
  /** ячейка колонки Сумма */
  const Amount = (amoutProps: AmoutProps) => {
    const { type_system_name, amount } = amoutProps;
    const isDeposit = type_system_name === 'deposit';
    const summColor = isDeposit ? '#44c533' : '#c8221b';
    const fixedAmount = (amount / 100).toFixed(2);
    const preparedAmount = isDeposit ? `+ ${fixedAmount}` : `- ${fixedAmount}`;

    return <span style={{ color: summColor }}>{preparedAmount}</span>;
  };

  return (
    <div>
      <TransactionsFilter id={Core.company.localId} />
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td width={80}>№</td>
            <td width={150}>Сумма</td>
            <td>Комментарий</td>
            <td width={150}>Дата</td>
          </tr>
        </thead>
        <tbody>
          {rows?.map((item, index) => {
            const { id, amount, comment, created_at, type_system_name } = item;
            return (
              <tr key={id} title={comment}>
                <td width={80}>{index + 1}</td>
                <td width={150}>
                  <Amount type_system_name={type_system_name} amount={amount} />
                </td>
                <td>{comment}</td>
                <td width={150}>{created_at} </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <PaginationLimit setLimit={setLimit} limit={limit} />
            </td>
            <td colSpan={2} align="right">
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
