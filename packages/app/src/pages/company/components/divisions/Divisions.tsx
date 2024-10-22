import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonKinds, Icons, Input } from '@distate/components';

import { Pagination, PaginationLimit } from '../../../../common/pagination';
import { getCompanyDivisions } from '../../store/actions';
import { selectDivisionsRows, selectDivisionsRecordsTotal } from '../../store/selectors';
import { ModalDivisionCard } from './modal-division-card';
import { ModalCreateDivision } from './modal-create-division';
import { CompanyDivision } from '../../helpers/company.typings';

/** Подразделения */
export const Divisions = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchTitle, setSearchTitle] = useState<string>();
  const [isVisibleCard, setIsVisibleCard] = useState(false);
  const [isVisibleCreateDivision, setIsVisibleCreateDivision] = useState(false);
  const [divisionProps, setDivisionProps] = useState<CompanyDivision & { id: number }>();

  const dispatch = useDispatch();

  const divisions = useSelector(selectDivisionsRows);
  const recordsTotal = useSelector(selectDivisionsRecordsTotal);

  useEffect(() => {
    dispatch(getCompanyDivisions({ props: { offset, limit } }));
  }, [dispatch, limit, offset]);

  const onSearch = () => {
    dispatch(getCompanyDivisions({ props: { offset, limit, title: searchTitle } }));
  };

  const onOpenModal = (division: any) => {
    const { id, address, classificationNumber, kpp, title, visible, contact } = division;
    setDivisionProps({
      id,
      title,
      kpp,
      classificationNumber,
      visible,
      region: address?.region?.id,
      regionTitle: address?.region?.title, 
      postalCode: address?.postalCode,
      district: address?.district,
      city: address?.city,
      street: address?.street,
      building: address?.building,
      house: address?.house,
      room: address?.room,
      settlement: address?.settlement,
      phone: contact?.phone,
      email: contact?.email
    });

    setIsVisibleCard(true);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
        <div style={{ display: 'flex' }}>
          <Input width={400} onChange={e => setSearchTitle(e.target.value)} value={searchTitle} />
          <Button onClick={onSearch} icon={<Icons.IconSearch fill="currentColor" />}>
            Поиск
          </Button>
        </div>
        <PaginationLimit setLimit={setLimit} limit={limit} />
      </div>

      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>Наименование</td>
            <td colSpan={2}>КПП</td>
          </tr>
        </thead>
        <tbody>
          {divisions?.map(division => {
            const { id, title, kpp } = division;
            return (
              <tr key={id}>
                <td>{title}</td>
                <td>{kpp}</td>
                <td align="right">
                  <Button kind={ButtonKinds.Secondary} onClick={() => onOpenModal(division)}>
                    Карточка подразделения
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Button
                icon={<Icons.IconPlus fill="currentColor" />}
                onClick={() => setIsVisibleCreateDivision(true)}
              >
                Добавить подразделение
              </Button>
            </td>
            <td align="right" colSpan={2}>
              <Pagination listLength={recordsTotal} setOffset={setOffset} limit={limit} />
            </td>
          </tr>
        </tfoot>
      </table>

      {isVisibleCard && <ModalDivisionCard
        isVisible={isVisibleCard}
        hide={() => setIsVisibleCard(false)}
        divisionProps={divisionProps!}
      />}
      {isVisibleCreateDivision && <ModalCreateDivision
        isVisible={isVisibleCreateDivision}
        hide={() => setIsVisibleCreateDivision(false)}
      />}
    </>
  );
};
