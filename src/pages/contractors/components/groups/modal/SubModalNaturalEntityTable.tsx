import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Icons } from '@distate/components';

import {
  NaturalEntityInfo as NaturalEntityInfoSelector,
  naturalEntityInfoAdded
} from '../../../store/selectors';
import { RelationStatus } from '../../../helpers/contractors.typings';
import {
  addNaturalEntityToGroup,
  getNaturalEntityGroup,
  getAddedGroupNaturalEntity
} from '../../../store/actions';
import { Pagination } from '../../../../../common/pagination';
import { NaturalEntityFilter } from './filters';

export const SubModalNaturalEntityTable = ({ groupId }: { groupId: number }) => {
  const dispatch = useDispatch();

  const naturalEntityInfo = useSelector(NaturalEntityInfoSelector);
  /** список добавленных ФЛ */
  const naturalEntityList = naturalEntityInfo?.rows || [];
  const isEmty = naturalEntityList.length === 0;

  const naturalEntityAddedOffset = useSelector(naturalEntityInfoAdded)?.offset;

  const [offset, setOffset] = React.useState(naturalEntityAddedOffset);

  const onAdd = async (contractorId: number) => {
    await dispatch(addNaturalEntityToGroup({ groupId, contractorId }));
    dispatch(getNaturalEntityGroup({ id: groupId, offset }));
    dispatch(getAddedGroupNaturalEntity({ id: groupId, offset }));
  };

  return (
    <table className="table">
      <thead className="common-table-head">
        <tr>
          <td>ФИО</td>
          <td>Статус</td>
          <td>СНИЛС</td>
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
          naturalEntityList.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.status === RelationStatus.Active ? 'активный' : 'заблокированный'}</td>
              <td>{item.socialNumber}</td>
              <td>
                <Button
                  icon={<Icons.IconPlus fill="currentColor" />}
                  onClick={() => onAdd(item.contractorId)}
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
              <NaturalEntityFilter id={groupId} />
              <Pagination listLength={naturalEntityInfo?.recordsTotal} setOffset={setOffset} />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
