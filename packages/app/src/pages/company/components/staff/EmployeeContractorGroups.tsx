import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icons } from '@distate/components';
import { Pagination } from '../../../../common/pagination';
import { getEmployeeContractorGroups, deleteEmployeeContractorGroups } from '../../store/actions';
import {
  selectEmployeeContractorGroupRows,
  selectEmployeeContractorGroupTotal
} from '../../store/selectors';
import { EmployeeContractorGroupsSubmodal } from './EmployeeContractorGroupsSubmodal';

type Props = {
  id: number;
};

/** Группы контрагентов */
export const EmployeeContractorGroups = (props: Props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const rows = useSelector(selectEmployeeContractorGroupRows);
  const recordsTotal = useSelector(selectEmployeeContractorGroupTotal);

  const [offset, setOffset] = useState(0);
  const [isOpenSubmodal, setIsOpenSubmodal] = useState(false);

  useEffect(() => {
    id && dispatch(getEmployeeContractorGroups({ id, props: { offset } }));
  }, [dispatch, id, offset]);

  const onDelete = (groupId: number) => {
    dispatch(deleteEmployeeContractorGroups({ groupId, employeeId: id }));
  };

  /** открытие модалки добавления группы контрагентов сотруднику */
  const onOpenGropListModal = () => {
    setIsOpenSubmodal(true);
  };

  return (
    <>
      <h3 className="header">Группы контрагентов</h3>

      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td align="left">Группа контрагентов</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {rows?.map(item => {
            const { id, title } = item;
            return (
              <tr key={id}>
                <td>{title}</td>
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
              <Button icon={<Icons.IconPlus fill="currentColor" />} onClick={onOpenGropListModal}>
                Добавить
              </Button>
            </td>
            <td>
              <div className="pagination-right">
                <Pagination setOffset={setOffset} listLength={recordsTotal} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <EmployeeContractorGroupsSubmodal
        hide={() => setIsOpenSubmodal(false)}
        isVisible={isOpenSubmodal}
        id={id}
      />
    </>
  );
};
