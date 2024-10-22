import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Icons } from '@distate/components';

import {
  legalEntityInfo as legalEntityInfoSelector,
  legalEntityInfoAdded
} from '../../../store/selectors';
import { RelationStatus } from '../../../helpers/contractors.typings';
import { addLegalEntityToGroup } from '../../../store/actions';
import { Pagination } from '../../../../../common/pagination';
import { LegalEntityFilter } from './filters';
import { getExternalTypeToString } from '../../../../../helpers/heplers';
import { TruncateText } from '../../../../../common/truncate-text';

export const SubModalLegalEntityTable = ({ groupId }: { groupId: number }) => {
  const dispatch = useDispatch();

  const legalEntityInfo = useSelector(legalEntityInfoSelector);
  const legalEntityList = legalEntityInfo?.rows || [];
  const isEmty = legalEntityList.length === 0;

  const legalEntityAddedOffset = useSelector(legalEntityInfoAdded)?.offset;

  const [offset, setOffset] = React.useState(legalEntityAddedOffset);

  const onAdd = (contractorId: number) => {
    dispatch(addLegalEntityToGroup({ groupId, contractorId, offset }));
  };

  return (
    <table className="table">
      <thead className="common-table-head">
        <tr>
          <td>Название</td>
          <td>Статус</td>
          <td>ИНН</td>
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
          legalEntityList.map(item => {
            const {
              externalType,
              externalOperator,
              network,
              id,
              name,
              status,
              inn,
              contractorId
            } = item;
            const typeToString = getExternalTypeToString(externalType, externalOperator, network);

            return (
              <tr key={id}>
                <td>
                  <TruncateText text={name + typeToString} />
                </td>
                <td>{status === RelationStatus.Active ? 'активный' : 'заблокированный'}</td>
                <td>{inn}</td>
                <td>
                  <Button
                    icon={<Icons.IconPlus fill="currentColor" />}
                    onClick={() => onAdd(contractorId)}
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
          <td colSpan={4}>
            <div className="pagination-right">
              <LegalEntityFilter id={groupId} />
              <Pagination listLength={legalEntityInfo?.recordsTotal} setOffset={setOffset} />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
