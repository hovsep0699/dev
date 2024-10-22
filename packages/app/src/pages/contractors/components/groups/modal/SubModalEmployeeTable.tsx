import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Icons } from '@distate/components';

import {
  addEmployeeToGroup,
  getAddedGroupEmployee,
  getEmployeeGroup
} from '../../../store/actions';

import {
  employeeEntityInfo as employeeEntityInfoSelector,
  employeeEntityInfoAdded
} from '../../../store/selectors';
import { RelationStatus } from '../../../helpers/contractors.typings';
import { Pagination } from '../../../../../common/pagination';
import { EmployeeFilter } from './filters';

export const SubModalEmployeeTable = ({ groupId }: { groupId: number }) => {
  const dispatch = useDispatch();

  const employeeInfo = useSelector(employeeEntityInfoSelector);
  /** список добавленных Сотрудников */
  const employeeList = employeeInfo?.rows || [];
  const isEmty = employeeList.length === 0;

  const employeeEntityAddedOffset = useSelector(employeeEntityInfoAdded)?.offset;

  const [offset, setOffset] = React.useState(employeeEntityAddedOffset);

  const onAdd = async (contractorId: number) => {
    await dispatch(addEmployeeToGroup({ groupId, contractorId }));
    dispatch(getEmployeeGroup({ id: groupId, offset }));
    dispatch(getAddedGroupEmployee({ id: groupId, offset }));
  };

  return (
    <table className="table">
      <thead className="common-table-head">
        <tr>
          <td>ФИО</td>
          <td>Статус</td>
          <td>Должность</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {isEmty && (
          <tr>
            <td>Список пуст.</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
        {!isEmty &&
          employeeList.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.status === RelationStatus.Active ? 'активный' : 'заблокированный'}</td>
              <td>{item.position}</td>
              <td>
                <Button
                  icon={<Icons.IconPlus fill="currentColor" />}
                  onClick={() => onAdd(item.id)}
                >
                  Добавить
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>
            <div className="pagination-right">
              <EmployeeFilter id={groupId} />
              <Pagination listLength={employeeInfo?.recordsTotal} setOffset={setOffset} />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
