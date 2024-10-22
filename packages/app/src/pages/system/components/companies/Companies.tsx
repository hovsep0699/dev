import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonKinds } from '@distate/components';

import { Pagination, PaginationLimit } from '../../../../common/pagination';
import { getCompanies, getCompanyInfo } from '../../store/actions';
import { companiesTotalSeletor, companiesListSeletor } from '../../store/selects';
import { Card } from './card';
import { Tools } from './tools';
import { ActivationButtons } from './ActivationButtons';

/** Система - Юридические лица */
export const Companies = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [companyId, setCompanyId] = useState<number>();
  const [idOpenCard, setIsOpenCard] = useState(false);

  const companies = useSelector(companiesListSeletor);
  const total = useSelector(companiesTotalSeletor);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies({ offset, limit }));
  }, [dispatch, offset, limit]);

  const onOpenCard = (id: number) => {
    dispatch(getCompanyInfo(id));
    setCompanyId(id);
    setIsOpenCard(true);
  };

  return (
    <>
      <Tools />
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>имя компании</td>
            <td>инн</td>
            <td>активация</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {companies?.map((item: any) => {
            const { id, name, inn, is_active } = item;

            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{inn}</td>
                <td>
                  {is_active ? (
                    'Активирован'
                  ) : (
                    <div>
                      <ActivationButtons id={id} />
                    </div>
                  )}
                </td>
                <td align="right">
                  <Button kind={ButtonKinds.Secondary} onClick={() => onOpenCard(id)}>
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

      <Card isVisible={idOpenCard} hide={() => setIsOpenCard(false)} companyId={companyId!} />
    </>
  );
};
