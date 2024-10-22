import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonKinds, Icons } from '@distate/components';
import Core from '@distate/core/dist/application/Core';

import { StaffTools } from '../StaffTools';
import { Pagination, PaginationLimit } from '../../../../../common/pagination';
import { joinNoEmptyValues } from '../../../../../helpers/heplers';
import { selectStaffDeactivated, selectStaffNumberDeactivated } from '../../../store/selectors';
import { getStaffDeactivated, getEmployee, activeEmployee } from '../../../store/actions';
import { EmployeeCard } from '../EmployeeCard';

/** Отключенные (Сотрудники) */
export const Deactivated = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [companyId, setCompanyId] = useState();
  const [cardVisible, setCardVisible] = useState(false);
  const dispatch = useDispatch();

  const staff = useSelector(selectStaffDeactivated);
  const staffNumber = useSelector(selectStaffNumberDeactivated) || 0;

  useEffect(() => {
    const id = Core?.company?.localId;
    setCompanyId(id);
    dispatch(getStaffDeactivated({ id, params: { offset, limit, statusSystemName: 'inactive' } }));
  }, [dispatch, limit, offset]);

  /** кнопка Карточка сотрудника */
  const onOpenCard = (id: number) => {
    dispatch(getEmployee(id));
    setCardVisible(true);
  };

  /** кнопка Активировать */
  const onActivation = (employeeId: number) => {
    dispatch(
      activeEmployee({
        employeeId,
        companyId: Core?.company?.localId,
        params: { offset, limit, statusSystemName: 'inactive' }
      })
    );
    onOpenCard(employeeId);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StaffTools id={companyId!} limit={limit} statusSystemName="inactive" />
        <PaginationLimit setLimit={setLimit} limit={limit} />
      </div>

      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td colSpan={2}>ФИО сотрудника</td>
            <td>должность</td>
            <td>e-mail</td>
            <td colSpan={2}></td>
          </tr>
        </thead>
        <tbody>
          {staff?.map(employee => {
            const { id, surname, name, patronymic, position, email } = employee;
            const fio = joinNoEmptyValues([surname, name, patronymic]);
            return (
              <tr key={id}>
                <td colSpan={2}>{fio}</td>
                <td>{position}</td>
                <td>{email}</td>
                <td align="right" colSpan={2}>
                  <Button
                    kind={ButtonKinds.LightGreen}
                    onClick={() => onActivation(id)}
                    icon={<Icons.IconCheck fill="currentColor" />}
                  >
                    Активировать
                  </Button>

                  <Button
                    kind={ButtonKinds.Secondary}
                    onClick={() => onOpenCard(id)}
                    style={{ marginLeft: 10 }}
                  >
                    Карточка сотрудника
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>ВСЕГО ЗАПИСЕЙ: {staffNumber}</td>
            <td colSpan={3} align="right">
              <div className="pagination-right">
                <Pagination listLength={staffNumber} setOffset={setOffset} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <EmployeeCard hide={() => setCardVisible(false)} isVisible={cardVisible} />
    </>
  );
};
