import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icons } from '@distate/components';
import { Pagination } from '../../../../../common/pagination';
import { joinNoEmptyValues } from '../../../../../helpers/heplers';
import { deleteEmployeeFromDivision, getDivisionEmployee } from '../../../store/actions';
import { selectDivisionStaff, selectDivisionStaffTotal } from '../../../store/selectors';
import { SubmodalAddStaff } from './SubmodalAddStaff';

type Props = {
  divisionId: number;
};

/** блок сотрудников в карточке подразделения */
export const DivisionStaff = (props: Props) => {
  const { divisionId } = props;
  const [offset, setOffset] = useState(0);
  const [isVisibleSubmodal, setIsVisibleSubmodal] = useState(false);

  const staff = useSelector(selectDivisionStaff);
  const staffNumber = useSelector(selectDivisionStaffTotal) || 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDivisionEmployee({ divisionId, params: { offset } }));
  }, [dispatch, divisionId, offset]);

  const onDelete = (employeeId: number) => {
    dispatch(
      deleteEmployeeFromDivision({
        divisionId,
        employeeId
      })
    );
  };

  return (
    <div>
      <h3 className="header">Сотрудники</h3>
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>ФИО</td>
            <td>должность</td>
            <td align="right"></td>
          </tr>
        </thead>
        <tbody>
          {staff?.map(employee => {
            const { id, surname, name, patronymic, position } = employee;
            const fio = joinNoEmptyValues([surname, name, patronymic]);

            return (
              <tr key={id}>
                <td>{fio}</td>
                <td>{position}</td>
                <td align="right">
                  <Button
                    onClick={() => onDelete(id)}
                    icon={<Icons.IconTrash fill="currentColor" />}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Button
                onClick={() => setIsVisibleSubmodal(true)}
                icon={<Icons.IconPlus fill="currentColor" />}
              >
                Добавить
              </Button>
            </td>
            <td align="right" colSpan={2}>
              <div className="pagination-right">
                <Pagination listLength={staffNumber} setOffset={setOffset} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <SubmodalAddStaff
        isVisible={isVisibleSubmodal}
        hide={() => setIsVisibleSubmodal(false)}
        divisionId={divisionId}
      />
    </div>
  );
};
