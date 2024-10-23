import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  ContractorTypes,
  DestinationType,
  IncomeContractorStatus
} from '../../helpers/contractors.typings';
import { Pagination } from '../../../../common/pagination';
import { getWaitingAnswerContractor } from '../../store/actions';
import { waitingAnswer } from '../../store/selectors';
import { WaitingAnswerTools } from './WaitingAnswerTools';
import { InfoBadge } from '../../../../common/info-badge';
import { TruncateText } from '../../../../common/truncate-text';
import { arrToString } from '../../helpers/contractors.helpers';

export const WaitingAnswerContractor = () => {
  const dispatch = useDispatch();
  const {
    rows: contractorList = [],
    recordsTotal,
    offset: offsetSelector = 0,
    searchParams = {}
  } = useSelector(waitingAnswer);
  const [offset, setOffset] = React.useState(offsetSelector);

  React.useEffect(() => {
    dispatch(getWaitingAnswerContractor({ ...searchParams, offset }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offset]);

  return (
    <>
      <WaitingAnswerTools />
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>Контрагент</td>
            <td align="center">Тип</td>
            <td>Статус</td>
            <td>Дополнительно</td>
            <td align="right">Дата создания</td>
          </tr>
        </thead>
        <tbody>
          {contractorList.map(item => {
            const {
              id,
              surname,
              name,
              patronymic,
              title,
              inn,
              contractorType,
              fnsUid,
              network,
              status: itemStatus,
              errorMessage,
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

            const isError = itemStatus === IncomeContractorStatus.error;

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
              case DestinationType.Hub1c:
                type = '1С-ЭДО';
                break;
              case DestinationType.Connector:
                type = 'Коннектор';
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

            return (
              <tr key={id}>
                <td>{contractor && <TruncateText text={contractor} />}</td>
                <td align="center">{type}</td>
                <td>
                  {isError ? <InfoBadge str={status} title={errorMessage || status} /> : status}
                </td>
                <td>{(fnsUid || network) && <TruncateText text={additionally!} />}</td>
                <td align="right">{createdAt}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
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
