import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, ButtonKinds } from '@distate/components';

import {
  ContractorTypes,
  InvitationDecision,
  DestinationType,
  IncomeContractorStatus
} from '../../helpers/contractors.typings';
import { invitationDecision } from '../../store/actions';
import { getInviteYouContractor } from '../../store/actions';
import { inviteYou } from '../../store/selectors';
import { Pagination } from '../../../../common/pagination';
import { InviteYouTools } from './InviteYouTools';
import { InfoBadge } from '../../../../common/info-badge';
import { TruncateText } from '../../../../common/truncate-text';
import { arrToString } from '../../helpers/contractors.helpers';

export const InviteYouContractor = () => {
  const dispatch = useDispatch();
  const {
    rows: contractorList = [],
    recordsTotal,
    offset: offsetSelector = 0,
    searchParams = {}
  } = useSelector(inviteYou);
  const [offset, setOffset] = React.useState(offsetSelector);

  React.useEffect(() => {
    dispatch(getInviteYouContractor({ ...searchParams, offset }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offset]);

  /** Принять приглашение */
  const onAccept = (id: number) => {
    dispatch(invitationDecision({ id, decision: InvitationDecision.accept, offset, searchParams }));
  };

  /** Отклонить приглашение */
  const onReject = async (id: number) => {
    dispatch(invitationDecision({ id, decision: InvitationDecision.reject, offset, searchParams }));
  };

  return (
    <>
      <InviteYouTools />
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>Контрагент</td>
            <td align="center">Тип</td>
            <td>Статус</td>
            <td>Дополнительно</td>
            <td align="right">Дата создания</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {contractorList.map(item => {
            const {
              id,
              fnsUid,
              network,
              surname,
              name,
              patronymic,
              contractorType,
              inn,
              title,
              errorMessage,
              status: itemStatus,
              createdAt
            } = item;

            /** для колонки Контрагент */
            let contractor;
            if (contractorType === ContractorTypes.natural_entity) {
              contractor = arrToString([surname, name, patronymic]);
            } else {
              contractor = arrToString([title, inn]);
            }

            /** для колонки Дополтенельно */
            const additionally = arrToString([fnsUid, network]);

            let type;
            switch (item.type) {
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

            let status;
            switch (itemStatus) {
              case IncomeContractorStatus.processed:
                status = 'Обработано';
                break;
              case IncomeContractorStatus.created:
                status = 'Ожидание';
                break;
              case IncomeContractorStatus.error:
                status = 'Ошибка';
                break;
              default:
                status = '';
            }

            const isError = itemStatus === IncomeContractorStatus.error;

            return (
              <tr key={id}>
                <td>{contractor && <TruncateText text={contractor} />}</td>
                <td align="center">{type}</td>
                <td>
                  {isError ? <InfoBadge str={status} title={errorMessage || status} /> : status}
                </td>
                <td>{(fnsUid || network) && <TruncateText text={additionally!} />}</td>
                <td align="right">{createdAt}</td>
                <td>
                  {itemStatus === IncomeContractorStatus.created && (
                    <>
                      <Button kind={ButtonKinds.Secondary} onClick={() => onAccept(id)}>
                        Принять
                      </Button>{' '}
                      <Button kind={ButtonKinds.Danger} onClick={() => onReject(id)}>
                        Отклонить
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <div className="pagination-right">
                <Pagination listLength={recordsTotal} setOffset={setOffset} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
