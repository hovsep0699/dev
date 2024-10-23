import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Icons } from '@distate/components';
import { getEmployeeNoContractorGroups, addEmployeeContractorGroups } from '../../store/actions';
import {
  selectEmployeeNoContractorGroupRows,
  selectEmployeeNoContractorGroupTotal
} from '../../store/selectors';
import { Pagination } from '../../../../common/pagination';

type Props = {
  hide: () => void;
  isVisible: boolean;
  id: number;
};
/** группы контрагентов, которые можно добавить сотруднику */
export const EmployeeContractorGroupsSubmodal = (props: Props) => {
  const { hide, isVisible, id } = props;
  const dispatch = useDispatch();

  const rows = useSelector(selectEmployeeNoContractorGroupRows);
  const recordsTotal = useSelector(selectEmployeeNoContractorGroupTotal);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    id && dispatch(getEmployeeNoContractorGroups({ id, props: { offset } }));
  }, [dispatch, id, offset]);

  const onAddGroup = (groupId: number) => {
    dispatch(addEmployeeContractorGroups({ groupId, employeeId: id }));
  };

  return (
    <Modal hide={hide} isVisible={isVisible} zIndex={1001}>
      <Modal.Header title="Добавление элементов" />

      <Modal.Body>
        <table className="table">
          <thead className="common-table-head">
            <tr>
              <td>Группа контрагентов</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {rows?.map(row => {
              const { id, title } = row;
              return (
                <tr key={id}>
                  <td>{title}</td>
                  <td align="right">
                    <Button
                      icon={<Icons.IconPlus fill="currentColor" />}
                      onClick={() => onAddGroup(id)}
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
              <td></td>
              <td>
                <div className="pagination-right">
                  <Pagination setOffset={setOffset} listLength={recordsTotal} />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </Modal.Body>
    </Modal>
  );
};
