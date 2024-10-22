import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonKinds, Icons } from '@distate/components';
import Core from '@distate/core/dist/application/Core';
import { getStaff, getEmployee, deactivateEmployee, activeEmployee } from '../../store/actions';
import { selectStaff, selectStaffNumber, selectStaffFilter } from '../../store/selectors';
import { joinNoEmptyValues } from '../../../../helpers/heplers';
import { Pagination, PaginationLimit } from '../../../../common/pagination';
import { StaffTools } from './StaffTools';
import { EmployeeCard } from './EmployeeCard';

export const Staff = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [companyId, setCompanyId] = useState();
  const [cardVisible, setCardVisible] = useState(false);
  const dispatch = useDispatch();

  const staff = useSelector(selectStaff);
  const staffNumber = useSelector(selectStaffNumber) || 0;
  const staffFilter = useSelector(selectStaffFilter);

  const currentEmployeeId = Core?.company?._currentEmployeeId;

  useEffect(() => {
    const id = Core?.company?.localId;
    setCompanyId(id);
    dispatch(
      getStaff({ id, params: { offset, limit, statusSystemName: 'active', hash: 'staff' } })
    );
  }, [dispatch, limit, offset]);

  const onOpenCard = (id: number) => {
    dispatch(getEmployee(id));
    setCardVisible(true);
  };

  /** деактивация сотрудника */
  const onDeactivate = (employeeId: number) => {
    dispatch(
      deactivateEmployee({
        employeeId,
        companyId: Core?.company?.localId,
        params: staffFilter || { offset, limit, statusSystemName: 'active', hash: 'staff' }
      })
    );
  };

  /** активация сотрудника */
  const onActivation = (employeeId: number) => {
    dispatch(
      activeEmployee({
        employeeId,
        companyId: Core?.company?.localId,
        params: staffFilter || { offset, limit, statusSystemName: 'waiting_for_approval' }
      })
    );
    onOpenCard(employeeId);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StaffTools id={companyId!} limit={limit} hasStatus />
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
            const { id, surname, name, patronymic, position, email, status_system_name } = employee;
            const fio = joinNoEmptyValues([surname, name, patronymic]);

            /** если id пренадленижт главному сотруднику, то его нельзя удалить */
            const isMainEmployee = currentEmployeeId === id;
            /** флаг активированности */
            const isActive = status_system_name === 'active';
            /** флаг ожидания подтверждения */
            const isWaiting = status_system_name === 'waiting_for_approval';

            return (
              <tr key={id}>
                <td colSpan={2}>{fio}</td>
                <td>{position}</td>
                <td>{email}</td>
                <td align="right" colSpan={2}>
                  {!isActive && (
                    <Button
                      kind={ButtonKinds.LightGreen}
                      onClick={() => onActivation(id)}
                      icon={<Icons.IconCheck fill="currentColor" />}
                    >
                      Активировать
                    </Button>
                  )}
                  {/** если не главный сотрудник и имеет статус активирован или ожидает решения */}
                  {!isMainEmployee && (isActive || isWaiting) && (
                    <Button
                      kind={ButtonKinds.Danger}
                      onClick={() => onDeactivate(id)}
                      icon={<Icons.IconClose fill="currentColor" />}
                    >
                      Деактивировать
                    </Button>
                  )}{' '}
                  <Button kind={ButtonKinds.Secondary} onClick={() => onOpenCard(id)}>
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
