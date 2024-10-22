import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../../../../common/pagination';
import { getActiveTariffs } from '../../store/actions';
import { activeTariffRowsSelector, activeTariffRecordsTotalSelector } from '../../store/selects';
import './style.css';

type Props = {
  onChange: Function;
  nextTariffId?: number;
};

/** Список активных тарифов для каточки тарифов */
export const TariffListTable = (props: Props) => {
  const { onChange, nextTariffId } = props;
  const [offset, setOffset] = useState(0);
  const tariffs = useSelector(activeTariffRowsSelector);
  const total = useSelector(activeTariffRecordsTotalSelector);
  const LIMIT = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveTariffs({ offset, limit: LIMIT }));
  }, [dispatch, offset]);

  return (
    <>
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td colSpan={2}>название</td>
            <td align="center">тип</td>
          </tr>
        </thead>
        <tbody>
          {!tariffs && (
            <tr>
              <td colSpan={3}>Этот список тарифов пуст.</td>
            </tr>
          )}
          {tariffs?.map((item: any) => {
            const { id, title, type_title } = item;
            return (
              <tr
                key={id}
                className={`tariff-active-select-table-row ${nextTariffId === id && 'selected'}`}
                onClick={() => onChange(id, title, type_title)}
              >
                <td colSpan={2}>{title}</td>
                <td align="center">{type_title}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  ВСЕГО ЗАПИСЕЙ: {total || 0}
                </div>
                <Pagination listLength={total} setOffset={setOffset} limit={LIMIT} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
