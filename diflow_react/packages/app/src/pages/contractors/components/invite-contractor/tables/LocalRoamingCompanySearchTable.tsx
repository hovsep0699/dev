import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@distate/components';

import './style.css';
import { DestinationType, RelationStatus } from '../../../helpers/contractors.typings';
import { selectSearch } from '../../../store/selectors';
import {
  createLocalRoamingCompanyInvitation,
  getFoundLocalRoamingCompany
} from '../../../store/actions';
import { Pagination } from '../../../../../common/pagination';

/** Таблица для вывода результата поиска компании - Локальный Роуминг */
export const LocalRoamingCompanySearchTable = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = React.useState();

  const { rows: legalEntityList = [], recordsTotal, searchParams } =
    useSelector(selectSearch)?.localRoamingCompany || {};

  /** запись в стор значения пагинации*/
  React.useEffect(() => {
    offset !== undefined && dispatch(getFoundLocalRoamingCompany({ ...searchParams, offset }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offset]);

  type LocalRoamingCompanyPayload = {
    type: DestinationType;
    fnsUid: string;
    networkId: string;
  };
  const onClick = (args: LocalRoamingCompanyPayload) => {
    dispatch(createLocalRoamingCompanyInvitation(args));
  };

  return (
    <table className="table user-search-table">
      <thead className="common-table-head">
        <tr>
          <td>Наименование</td>
          <td>ИНН</td>
          <td>Дополнительно</td>
        </tr>
      </thead>
      <tbody>
        {legalEntityList.map(item => (
          <tr key={item.inn}>
            <td>{item.name}</td>
            <td>{item.inn}</td>
            <td>{item.networkName}</td>
            <td>
              {item.relationStatus !== RelationStatus.Active ? (
                <Button
                  onClick={() =>
                    onClick({
                      type: DestinationType.LoaclRoaming,
                      fnsUid: item.fnsUid,
                      networkId: item.network
                    })
                  }
                >
                  Пригласить
                </Button>
              ) : (
                'уже является контрагентом'
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>
            <div className="pagination-right">
              <Pagination listLength={recordsTotal} setOffset={setOffset} />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
