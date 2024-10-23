import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, ButtonKinds } from '@distate/components';

import {
  RelationStatus,
  DestinationType,
  ContractorTypes
} from '../../helpers/contractors.typings';
import {
  blockingContractor,
  createRoamingCompanyInvitation,
  createLocalRoamingCompanyInvitation
} from '../../store/actions';
import {
  getLegalEntityContractors,
  createLocalCompanyInvitation,
  createHub1cCompanyInvitation
} from '../../store/actions';
import { legalEntity } from '../../store/selectors';
import { Pagination } from '../../../../common/pagination';
import { LegalEntityCard } from './LegalEntityCard';
import { joinNoEmptyValues } from '../../../../helpers/heplers';

export const LegalEntityTable = () => {
  const dispatch = useDispatch();
  const { rows: contractorList = [], offset: offsetSelector = 0, recordsTotal } = useSelector(
    legalEntity
  );
  const [offset, setOffset] = React.useState(offsetSelector);
  const [isOpenCard, setIsOpenCard] = React.useState(false);
  const [userId, setUserId] = React.useState<number>();
  const [contractorId, setContractorId] = React.useState<number>();

  React.useEffect(() => {
    dispatch(getLegalEntityContractors({ offset }));
  }, [dispatch, offset]);

  /** Блокировка контрагента */
  const onBlock = (id: number) => {
    dispatch(blockingContractor({ id, contractorType: ContractorTypes.legal_entity }));
  };

  /** Нажатие кнопки "пригласить повторно" */
  const onInvite = (
    id?: number,
    externalType?: DestinationType,
    fnsUid?: string,
    inn?: string,
    networkId?: string
  ) => {
    const type = externalType ? externalType : DestinationType.Local;
    if (type === DestinationType.Local) {
      dispatch(createLocalCompanyInvitation({ companyID: id, type }));
    }
    if (type === DestinationType.Roaming) {
      dispatch(createRoamingCompanyInvitation({ fnsUid, inn, type }));
    }
    if (type === DestinationType.LoaclRoaming) {
      dispatch(createLocalRoamingCompanyInvitation({ type, fnsUid, networkId }));
    }
    if (type === DestinationType.Hub1c) {
      dispatch(createHub1cCompanyInvitation({ fnsUid, inn, type }));
    }
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
            <td>ИНН</td>
            <td>Статус</td>
            <td>Тип</td>
            <td>Дополнительно</td>
            <td colSpan={2}></td>
          </tr>
        </thead>
        <tbody>
          {contractorList.map(item => {
            let type;
            switch (item.externalType) {
              case null:
              case DestinationType.Local:
                type = 'Локальный';
                break;
              case DestinationType.Roaming:
                type = 'Роуминг';
                break;
              case DestinationType.LoaclRoaming:
                type = 'Локальный Роуминг';
                break;
              case DestinationType.Connector:
                type = 'Коннектор';
                break;
              case DestinationType.Hub1c:
                type = '1С-ЭДО';
                break;
              default:
                type = '';
            }
            const additionally = joinNoEmptyValues([item?.externalOperator, item?.network]) || '';
            const isActive = item.status === RelationStatus.Active;
            const isConnector = item.externalType === DestinationType.Connector;
            const status = isActive ? 'Активен' : 'Заблокирован';

            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.inn}</td>
                <td>{status}</td>
                <td>{type}</td>
                <td>{additionally}</td>
                <td colSpan={2} align="right">
                  <div>
                    {isActive && !isConnector && (
                      <Button
                        kind={ButtonKinds.Danger}
                        onClick={() => onBlock(item.contractorId)}
                        className="contractor-table-btn"
                      >
                        Заблокировать
                      </Button>
                    )}
                    {!isActive && !isConnector && (
                      <Button
                        kind={ButtonKinds.Secondary}
                        onClick={() =>
                          onInvite(item.id, item.externalType, item.fnsUid, item.inn, item.network)
                        }
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
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7}>
              <div className="pagination-right">
                <Pagination listLength={recordsTotal} setOffset={setOffset} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <LegalEntityCard
        isVisible={isOpenCard}
        hide={() => setIsOpenCard(!isOpenCard)}
        userId={userId!}
        contractorId={contractorId!}
      />
    </>
  );
};
