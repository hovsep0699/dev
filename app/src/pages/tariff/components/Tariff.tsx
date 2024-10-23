import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonKinds } from '@distate/components';
import { Pagination } from '../../../common/pagination';
import { TariffCard } from './tariff-card';
import { Tools } from './tools';
import {
  getActiveTariffs,
  getArchivedTariffs,
  getTariffTypes,
  getTariffStatuses,
  setIsOpenTariffCreate,
  setIsOpenTariffCard,
  setViewTariffId
} from '../store/actions';
import {
  activeTariffRowsSelector,
  activeTariffRecordsTotalSelector,
  archivedTariffRowsSelector,
  archivedTariffRecordsTotalSelector,
  viewTariffIdSelector,
  isOpenTariffCreateSelector,
  isOpenTariffCardSelector
} from '../store/selects';
import { TariffCreate } from './tariff-card/TariffCreate';

export enum TariffStatusType {
  active = 'active',
  archived = 'archived'
}

/** Тарифы */
export const Tariff = () => {
  const [offset, setOffset] = useState(0);
  const [tariffStatus, setTariffStatus] = useState(TariffStatusType.active);
  const [currentTariff, setCurrentTariff] = useState<any>();

  const dispatch = useDispatch();
  const activeTariffs = useSelector(activeTariffRowsSelector);
  const archivedTariffs = useSelector(archivedTariffRowsSelector);
  const activeTotal = useSelector(activeTariffRecordsTotalSelector);
  const archivedTotal = useSelector(archivedTariffRecordsTotalSelector);
  const viewTariffId = useSelector(viewTariffIdSelector);
  const isOpenTariffCreate = useSelector(isOpenTariffCreateSelector);
  const isOpenTariffCard = useSelector(isOpenTariffCardSelector);

  const rows = tariffStatus === TariffStatusType.active ? activeTariffs : archivedTariffs;
  const recordsTotal = tariffStatus === TariffStatusType.active ? activeTotal : archivedTotal;

  useEffect(() => {
    dispatch(getTariffTypes());
    dispatch(getTariffStatuses());
  }, [dispatch]);

  useEffect(() => {
    const isActive = tariffStatus === TariffStatusType.active;
    const isArchived = tariffStatus === TariffStatusType.archived;

    isActive && dispatch(getActiveTariffs({ offset, limit: 10 }));
    isArchived && dispatch(getArchivedTariffs({ offset, limit: 10 }));
  }, [tariffStatus, offset, dispatch]);

  const onOpenCard = (item: {}) => {
    dispatch(setIsOpenTariffCard({ isOpenTariffCard: true }));
    setCurrentTariff(item);
  };

  return (
    <>
      <Tools tariffStatus={tariffStatus} setTariffStatus={setTariffStatus} />
      <div style={{ marginTop: 15 }}>
        <table className="table">
          <thead className="common-table-head">
            <tr>
              <td colSpan={2}>название</td>
              <td>тип</td>
              <td align="center">компаний</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {!rows && (
              <tr>
                <td colSpan={5}>Этот список тарифов пуст.</td>
              </tr>
            )}
            {rows?.map((item: any) => {
              const { id, title, type_title, companies_counter } = item;
              return (
                <tr key={id}>
                  <td colSpan={2}>{title}</td>
                  <td>{type_title}</td>
                  <td align="center">{companies_counter}</td>
                  <td align="right">
                    <Button kind={ButtonKinds.Secondary} onClick={() => onOpenCard(item)}>
                      Карточка тарифа
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    ВСЕГО ЗАПИСЕЙ: {recordsTotal || 0}
                  </div>
                  <Pagination listLength={recordsTotal} setOffset={setOffset} />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {isOpenTariffCard && (
        <TariffCard
          isVisible={isOpenTariffCard}
          hide={() => {
            dispatch(setIsOpenTariffCard({ isOpenTariffCard: false }));
            dispatch(setViewTariffId({ viewTariffId: undefined }));
          }}
          tariffId={viewTariffId || currentTariff.id}
        />
      )}

      {isOpenTariffCreate && (
        <TariffCreate
          isVisible={isOpenTariffCreate}
          hide={() => dispatch(setIsOpenTariffCreate({ isOpenTariffCreate: false }))}
        />
      )}
    </>
  );
};
