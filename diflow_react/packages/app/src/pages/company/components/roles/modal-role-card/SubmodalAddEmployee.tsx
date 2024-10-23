import React, { useState, useEffect } from 'react';
import { Modal } from '@distate/components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icons } from '@distate/components';
import {
  selectNoStaffForRoleRecordsTotal,
  selectNoStaffForRoleRows
} from '../../../store/selectors';
import { joinNoEmptyValues } from '../../../../../helpers/heplers';
import { Pagination } from '../../../../../common/pagination';
import { addStaffForRole, getNoStaffForRole } from '../../../store/actions';

type Props = {
  id: number;
  hide: () => void;
  isVisible: boolean;
};

/** модалка добавления сотрудников в роль */
export const SubmodalAddEmployee = (props: Props) => {
  const { id, isVisible, hide } = props;

  const staff = useSelector(selectNoStaffForRoleRows);
  const recordsTotal = useSelector(selectNoStaffForRoleRecordsTotal);

  const [offset, setOffset] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    id && dispatch(getNoStaffForRole({ groupId: id, props: { offset } }));
  }, [dispatch, id, offset]);

  const onAdd = (employeeId: number) => {
    dispatch(addStaffForRole({ groupId: id, employeeId, props: { offset } }));
  };

  return (
    <Modal hide={() => hide()} isVisible={isVisible} zIndex={1001}>
      <Modal.Header title={'Добавление элементов'} />

      <Modal.Body>
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
                      icon={<Icons.IconCheck fill="currentColor" />}
                      onClick={() => onAdd(id)}
                    >
                      Добавить
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td align="right" colSpan={3}>
                <Pagination listLength={recordsTotal} setOffset={setOffset} />
              </td>
            </tr>
          </tfoot>
        </table>
      </Modal.Body>
    </Modal>
  );
};
