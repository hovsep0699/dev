import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationLimit } from '../../../../common/pagination';
import { getEmployeeDivisions, changeEmployeeDefaultDivision } from '../../store/actions';
import {
  selectEmployeeDivisionsRows,
  selectEmployeeDivisionsTotal,
  selectEmployeeDefaultDivisionId,
  selectEmployeeId
} from '../../store/selectors';
import { RadioButton } from '../../../../common/radio-button';

type Props = {
  id: number;
};

/** Подразделения - "Карточка сотрудника" */
export const EmployeeDivision = (props: Props) => {
  const { id } = props;
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();
  const divisions = useSelector(selectEmployeeDivisionsRows);
  const recordsTotal = useSelector(selectEmployeeDivisionsTotal);
  const defaultDivisionId = useSelector(selectEmployeeDefaultDivisionId);
  const employeeId = useSelector(selectEmployeeId);

  useEffect(() => {
    id && dispatch(getEmployeeDivisions({ id, props: { offset, limit } }));
  }, [dispatch, id, offset, limit]);

  const onChangeDefaultDivision = (e: any) => {
    const divisionId = e.target.value;
    dispatch(changeEmployeeDefaultDivision({ employeeId, divisionId }));
  };

  return (
    <>
      <h3 className="header">Подразделения</h3>

      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>Наименование</td>
            <td>КПП</td>
            <td align="center">по умолчанию</td>
          </tr>
        </thead>
        <tbody>
          {divisions?.map(division => (
            <tr key={division.id}>
              <td>{division.title}</td>
              <td>{division.kpp}</td>
              <td align="center">
                <RadioButton
                  value={division.id}
                  name="division"
                  defaultChecked={defaultDivisionId === division.id}
                  onChange={onChangeDefaultDivision}
                  id={division.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <PaginationLimit setLimit={setLimit} limit={limit} />
            </td>
            <td colSpan={1}>
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
