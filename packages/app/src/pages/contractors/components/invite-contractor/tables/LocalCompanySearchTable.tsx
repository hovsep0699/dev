import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@distate/components';
import './style.css';
import { DestinationType, RelationStatus } from '../../../helpers/contractors.typings';
import { selectSearch } from '../../../store/selectors';
import { createLocalCompanyInvitation, getFoundLocalCompany } from '../../../store/actions';
import { Pagination } from '../../../../../common/pagination';

/** Таблица для вывода результата поиска компании - Локальный */
export const LocalCompanySearchTable = () => {
  const dispatch = useDispatch();
  const selectSearchState = useSelector(selectSearch);
  const searchContractors = selectSearchState?.company?.rows || [];
  const [offset, setOffset] = React.useState();

  /** запись в стор значения пагинации*/
  React.useEffect(() => {
    offset &&
      dispatch(getFoundLocalCompany({ ...selectSearchState?.company?.searchParams, offset }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offset]);

  type LocalCompanyPayload = {
    type: DestinationType;
    companyID: number;
  };

  const onClick = (args: LocalCompanyPayload) => {
    dispatch(createLocalCompanyInvitation(args));
  };

  return (
    <table className="table user-search-table">
      <thead className="common-table-head">
        <tr>
          <td>Наименование</td>
          <td>ИНН</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {searchContractors.map(item => (
          <tr key={item.inn}>
            <td>{item.name}</td>
            <td>{item.inn}</td>
            <td>
              {item.relationStatus !== RelationStatus.Active ? (
                <Button
                  onClick={() =>
                    onClick({
                      companyID: +item.id,
                      type: DestinationType.Local
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
              <Pagination
                listLength={selectSearchState.company?.recordsTotal}
                setOffset={setOffset}
              />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
