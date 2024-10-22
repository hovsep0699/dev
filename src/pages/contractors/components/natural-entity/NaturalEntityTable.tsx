import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonKinds } from '@distate/components';

import { getNaturalEntityContractors, createPersonInvitation } from '../../store/actions';
import { naturalEntity } from '../../store/selectors';
import {
  RelationStatus,
  ContractorTypes,
  DestinationType
} from '../../helpers/contractors.typings';
import { blockingContractor } from '../../store/actions';
import { Pagination } from '../../../../common/pagination';
import { NaturalEntityCard } from './NaturalEntityCard';

export const NaturalEntityTable = () => {
  const dispatch = useDispatch();
  const { rows: contractorList = [], offset: offsetSelector = 0, recordsTotal } = useSelector(
    naturalEntity
  );
  const [offset, setOffset] = React.useState(offsetSelector);
  const [isOpenCard, setIsOpenCard] = React.useState(false);
  const [userId, setUserId] = React.useState<number>();
  const [contractorId, setContractorId] = React.useState<number>();

  React.useEffect(() => {
    dispatch(getNaturalEntityContractors({ offset }));
  }, [dispatch, offset]);

  /** Блокировка контрагента */
  const onBlock = (id: number) => {
    dispatch(blockingContractor({ id, contractorType: ContractorTypes.natural_entity }));
  };

  /** Нажатие кнопки "пригласить повторно" */
  const onInvite = (id: number) => {
    dispatch(createPersonInvitation({ personID: id, type: DestinationType.Local }));
  };

  const openCard = (userId: number, contractorId: number) => {
    setUserId(userId);
    setContractorId(contractorId);
    setIsOpenCard(true);
  };

  return (
    <>
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>Контрагент</td>
            <td>СНИЛС</td>
            <td>Статус</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {contractorList.map(item => {
            let contractor: string;
            /** сборка ФИО */
            const patronymic = item?.patronymic ? ` ${item.patronymic}` : '';
            contractor = item.surname + ' ' + item.name + patronymic;

            const isActive = item.status === RelationStatus.Active;
            const status = isActive ? 'Активен' : 'Заблокирован';

            return (
              <tr key={item.id}>
                <td>{contractor}</td>
                <td>{item.socialNumber}</td>
                <td>{status}</td>
                <td align="right">
                  {isActive ? (
                    <Button
                      kind={ButtonKinds.Danger}
                      onClick={() => onBlock(item.contractorId)}
                      className="contractor-table-btn"
                    >
                      Заблокировать
                    </Button>
                  ) : (
                    <Button
                      kind={ButtonKinds.Secondary}
                      onClick={() => onInvite(item.id)}
                      className="contractor-table-btn"
                    >
                      Пригласить повторно
                    </Button>
                  )}
                  <Button
                    onClick={() => openCard(item.id, item.contractorId)}
                    className="contractor-table-btn"
                  >
                    Карточка контрагента
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
                <Pagination listLength={recordsTotal} setOffset={setOffset} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <NaturalEntityCard
        isVisible={isOpenCard}
        hide={() => setIsOpenCard(!isOpenCard)}
        userId={userId!}
        contractorId={contractorId!}
      />
    </>
  );
};
