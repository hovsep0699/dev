import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icons } from '@distate/components';
import { Pagination } from '../../../../../common/pagination';
import { deleteStaffForRole, getStaffForRole } from '../../../store/actions';
import { selectStaffForRoleRows, selectStaffForRoleRecordsTotal } from '../../../store/selectors';
import { joinNoEmptyValues } from '../../../../../helpers/heplers';
import { SubmodalAddEmployee } from './SubmodalAddEmployee';

type Props = {
  id: number;
};

/** Сотрудники - карточка роли */
export const StaffRole = (props: Props) => {
  const { id } = props;
  const [offset, setOffset] = useState(0);
  const [isVisibleSubmodal, setIsVisibleSubmodal] = useState(false);

  const staff = useSelector(selectStaffForRoleRows);
  const recordsTotal = useSelector(selectStaffForRoleRecordsTotal);

  const dispatch = useDispatch();

  useEffect(() => {
    id && dispatch(getStaffForRole({ id, props: { offset } }));
  }, [dispatch, id, offset]);

  const onDelete = (employeeId: number) => {
    dispatch(deleteStaffForRole({ groupId: id, employeeId, props: { offset } }));
  };

  return (
    <div>
      <h3 className="header">Сотрудники</h3>

      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>ФИО</td>
            <td>Должность</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {staff?.map(employee => {
            const { name, surname, patronymic, position, id } = employee;
            const fio = joinNoEmptyValues([surname, name, patronymic]);
            return (
              <tr key={id}>
                <td>{fio}</td>
                <td>{position}</td>
                <td align="right">
                  <Button
                    icon={<Icons.IconTrash fill="currentColor" />}
                    onClick={() => onDelete(id)}
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
                icon={<Icons.IconPlus fill="currentColor" />}
                onClick={() => setIsVisibleSubmodal(true)}
              >
                Добавить
              </Button>
            </td>
            <td align="right" colSpan={2}>
              <Pagination listLength={recordsTotal} setOffset={setOffset} />
            </td>
          </tr>
        </tfoot>
      </table>
      <SubmodalAddEmployee
        isVisible={isVisibleSubmodal}
        hide={() => setIsVisibleSubmodal(false)}
        id={id}
      />
    </div>
  );
};
