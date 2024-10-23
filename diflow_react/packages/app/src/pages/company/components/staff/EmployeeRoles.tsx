import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icons } from '@distate/components';
import { getEmployeeRoles, deleteRoleToEmployee } from '../../store/actions';
import { selectRolesRows, selectRolesTotal } from '../../store/selectors';
import { Pagination } from '../../../../common/pagination';
import { RolesSubmodal } from './RolesSubmodal';

type Props = {
  id: number;
};
/** Роли сотрудника */
export const EmployeeRoles = (props: Props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const roles = useSelector(selectRolesRows) || [];
  const rolesTotal = useSelector(selectRolesTotal);

  const [isVisibleSubmodal, setIsVisibleSubmodal] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    id && dispatch(getEmployeeRoles({ id, props: { offset } }));
  }, [dispatch, id, offset]);

  /** удаление роли у сотрудника */
  const onDelete = (groupId: number) => {
    dispatch(deleteRoleToEmployee({ groupId, employeeId: id }));
  };

  /** открытие модалки с доступными ролями для добавления пользователю */
  const openRolesSubmodal = () => {
    setIsVisibleSubmodal(true);
  };

  return (
    <>
      <h3 className="header">Роли</h3>

      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>Роль</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {roles.map(row => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td align="right">
                <Button
                  icon={<Icons.IconTrash fill="currentColor" />}
                  onClick={() => onDelete(row.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Button
                icon={<Icons.IconPlus fill="currentColor" />}
                onClick={() => openRolesSubmodal()}
              >
                Добавить
              </Button>
            </td>
            <td>
              <div className="pagination-right">
                <Pagination setOffset={setOffset} listLength={rolesTotal} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <RolesSubmodal
        hide={() => setIsVisibleSubmodal(false)}
        isVisible={isVisibleSubmodal}
        id={id}
      />
    </>
  );
};
