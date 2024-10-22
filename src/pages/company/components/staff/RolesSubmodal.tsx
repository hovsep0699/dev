import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Icons } from '@distate/components';
import { Pagination } from '../../../../common/pagination';
import { getEmployeeNoRoles, addRoleToEmployee } from '../../store/actions';
import { selectNoRolesRows, selectNoRolesTotal } from '../../store/selectors';

type Props = {
  hide: () => void;
  isVisible: boolean;
  id: number;
};
/** роли, которые можно добавить сотруднику */
export const RolesSubmodal = (props: Props) => {
  const { hide, isVisible, id } = props;
  const rows = useSelector(selectNoRolesRows);
  const noRolesTotal = useSelector(selectNoRolesTotal);
  const [offset, setOffset] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const props = { offset };
    id && dispatch(getEmployeeNoRoles({ id, props }));
  }, [dispatch, id, offset]);

  const onAddRole = (groupId: number) => {
    dispatch(addRoleToEmployee({ employeeId: id, groupId }));
  };

  return (
    <Modal hide={hide} isVisible={isVisible} zIndex={1001}>
      <Modal.Header title="Добавление элементов" />

      <Modal.Body>
        <table className="table">
          <thead className="common-table-head">
            <tr>
              <td>Роль</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {rows?.map(row => (
              <tr key={row.id}>
                <td>{row.title}</td>
                <td align="right">
                  <Button
                    icon={<Icons.IconPlus fill="currentColor" />}
                    onClick={() => onAddRole(row.id)}
                  >
                    Добавить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <div className="pagination-right">
                  <Pagination setOffset={setOffset} listLength={noRolesTotal} />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </Modal.Body>
    </Modal>
  );
};
