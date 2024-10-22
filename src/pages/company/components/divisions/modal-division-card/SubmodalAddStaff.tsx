import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@distate/components';
import { Button, Icons } from '@distate/components';
import { Pagination } from '../../../../../common/pagination';
import { joinNoEmptyValues } from '../../../../../helpers/heplers';
import { addEmployeeToDivision, getNoDivisionEmployee } from '../../../store/actions';
import { selectNoDivisionStaff, selectNoDivisionStaffTotal } from '../../../store/selectors';

type Props = {
  hide: () => void;
  isVisible: boolean;
  divisionId: number;
};

/** добавлеие новых сотрудников в подразделение */
export const SubmodalAddStaff = (props: Props) => {
  const { isVisible, hide, divisionId } = props;

  const [offset, setOffset] = useState(0);

  const dispatch = useDispatch();

  const staff = useSelector(selectNoDivisionStaff);
  const staffNumber = useSelector(selectNoDivisionStaffTotal) || 0;

  useEffect(() => {
    dispatch(getNoDivisionEmployee({ divisionId, params: { offset } }));
  }, [dispatch, divisionId, offset]);

  const onAdd = (employeeId: number) => {
    dispatch(addEmployeeToDivision({ divisionId, employeeId }));
  };

  return (
    <Modal hide={() => hide()} isVisible={isVisible} zIndex={1001}>
      <Modal.Header title="Добавление элементов" />
      <Modal.Body>
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
                        onClick={() => onAdd(id)}
                        icon={<Icons.IconPlus fill="currentColor" />}
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
                  <div className="pagination-right">
                    <Pagination listLength={staffNumber} setOffset={setOffset} />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal.Body>
    </Modal>
  );
};
