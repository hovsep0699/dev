import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonKinds } from '@distate/components';

import { Pagination, PaginationLimit } from '../../../../common/pagination';
import { getPersons } from '../../store/actions';
import { personsListSeletor, personsTotalSeletor } from '../../store/selects';
import { Card } from './card';
import { Tools } from './tools';

export type CardItemParams = {
  fio: string;
  socialNumber: string;
  activationStatus: string;
  email: string;
};

/** Система - Физические лица */
export const Persons = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [personInfo, setPersonInfo] = useState<CardItemParams>();
  const [idOpenCard, setIsOpenCard] = useState(false);

  const persons = useSelector(personsListSeletor);
  const total = useSelector(personsTotalSeletor);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersons({ offset, limit }));
  }, [dispatch, offset, limit]);

  const onOpenCard = (params: CardItemParams) => {
    setPersonInfo(params);
    setIsOpenCard(true);
  };

  return (
    <>
      <Tools />
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>ФИО</td>
            <td>СНИЛС</td>
            <td>Активация</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {persons?.map((item: any) => {
            const { id, name, surname, patronymic, socialNumber, email, active } = item;
            const activationStatus = active ? 'Активирован' : 'Заблокирован';

            const fio = [surname, name, patronymic].filter(item => item).join(' ');

            return (
              <tr key={id}>
                <td>{fio}</td>
                <td>{socialNumber}</td>
                <td>{activationStatus}</td>
                <td align="right">
                  <Button
                    kind={ButtonKinds.Secondary}
                    onClick={() => onOpenCard({ fio, socialNumber, activationStatus, email })}
                  >
                    Карточка клиента
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                  <PaginationLimit setLimit={setLimit} limit={limit} />
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>
                    ВСЕГО ЗАПИСЕЙ: {total}
                  </div>
                </div>
                <Pagination listLength={total} setOffset={setOffset} limit={limit} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      {personInfo && (
        <Card isVisible={idOpenCard} hide={() => setIsOpenCard(false)} personInfo={personInfo!} />
      )}
    </>
  );
};
