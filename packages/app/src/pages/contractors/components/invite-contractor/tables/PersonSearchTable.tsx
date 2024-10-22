import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@distate/components';

import './style.css';
import { selectSearch } from '../../../store/selectors';
import { DestinationType, RelationStatus } from '../../../helpers/contractors.typings';
import { createPersonInvitation, getFoundPerson } from '../../../store/actions';
import { Pagination } from '../../../../../common/pagination';

export const PersonSearchTable = () => {
  const dispatch = useDispatch();
  const selectSearchState = useSelector(selectSearch);
  const personList = useSelector(selectSearch)?.person?.rows || [];
  const [offset, setOffset] = React.useState();

  /** запись в стор значения пагинации*/
  React.useEffect(() => {
    offset && dispatch(getFoundPerson({ ...selectSearchState?.person?.searchParams, offset }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offset]);

  type PersonPayload = {
    type: DestinationType;
    personID: number;
  };
  const onClick = (args: PersonPayload) => {
    dispatch(createPersonInvitation(args));
  };

  return (
    <table className="table user-search-table">
      <thead className="common-table-head">
        <tr>
          <td>Имя</td>
          <td>Фамилия</td>
          <td>Отчество</td>
          <td>СНИЛС</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {personList.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.surname}</td>
            <td>{item.patronymic}</td>
            <td>{item.socialNumber}</td>
            <td>
              {item.relationStatus !== RelationStatus.Active ? (
                <Button
                  onClick={() => onClick({ personID: +item.id, type: DestinationType.Local })}
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
          <td colSpan={5}>
            <div className="pagination-right">
              <Pagination
                listLength={selectSearchState?.person?.recordsTotal}
                setOffset={setOffset}
              />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
