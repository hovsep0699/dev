import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '@distate/components';
import { TariffFlowItem } from '../../helpers/finance.typings';
import { root as financeSelector, selectedTariffSelector } from '../../store/selectors';
import { getTariffCard } from '../../store/actions';
import { dayDeclension, monthDeclension, yearDeclension } from '../../../../helpers/declension';

type Props = {
  hide: () => void;
  isVisible: boolean;
  tariffId: number;
  title?: string;
};

/** Карточка тарифа */
export const TariffCard = (props: Props) => {
  const { hide, isVisible, tariffId, title } = props;

  const { balance = NaN, currentTariff, tariffFlow } = useSelector(financeSelector);
  const tariff = useSelector(selectedTariffSelector);

  const isPromotion = tariff?.pricing?.isPromotion;

  /** признак предоплатного тарифа */
  const isPrepaid = tariff?.tariff?.type?.systemName === 'prepaid';
  /** стоимость перехода */
  const connectionCost = tariff?.pricing?.connectionCost;
  /** абонентская плата */
  const periodicalCost = tariff?.pricing?.periodicalCost;
  const periodDay = tariff?.pricing?.period?.day;
  const periodMonth = tariff?.pricing?.period?.month;
  const periodYear = tariff?.pricing?.period?.year;

  const day = periodDay && dayDeclension(Number(periodDay));
  const month = periodMonth && monthDeclension(Number(periodMonth));
  const year = periodYear && yearDeclension(Number(periodYear));

  const period = [year, month, day].filter(item => item).join(' ');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTariffCard(tariffId));
  }, [dispatch, tariffId]);

  const getPrice = (cost: number) => {
    if (cost > 0) {
      /** если предоплата - берется баланс тарифа, нет - баланс компании */
      const number = isPrepaid ? Math.trunc(periodicalCost / cost) : Math.trunc(balance / cost);
      return (
        <b>
          {' '}
          - {number}шт.{!isPromotion && ` (${(cost / 100).toFixed(2)} р.)`}
        </b>
      );
    }
    return <b> - не тарифицируется</b>;
  };

  return (
    <Modal hide={hide} isVisible={isVisible} zIndex={9998} width="max-content">
      <Modal.Header title="Карточка тарифа" />

      <Modal.Body>
        <h3>{title || currentTariff?.tariff_title}</h3>

        <div className="tariff-price-balance">
          <div className="tariff-price-balance-title">
            {Boolean(connectionCost) && <div>Стоимость перехода</div>}
            {isPrepaid && <div>Абонентская плата</div>}
          </div>
          <div>
            {Boolean(connectionCost) && (
              <div>
                <b>{(connectionCost / 100).toFixed(2)}</b> {isPromotion ? 'док.' : 'р.'}
              </div>
            )}
            {isPrepaid && (
              <div>
                {(periodicalCost / 100).toFixed(2)} {isPromotion ? 'док.' : 'р.'} / {period}
              </div>
            )}
          </div>
        </div>
        {isPrepaid && (
          <div className="tariff-price-description">
            Списание производится в начале периода. Оплата документов производится из внесенных
            средств. Все неизрасходованные средства в конце периода сгорают. За внесенные средства
            вы сможете отправить:
          </div>
        )}

        <ul className="tariff-description-ul">
          {tariffFlow?.rows?.map((item: TariffFlowItem) => {
            const { id, title, cost } = item;
            return (
              <li key={id}>
                {title}
                {getPrice(cost)}
              </li>
            );
          })}
        </ul>

        <div>
          Если счет становится меньше порога отключения ( 0.00 {isPromotion ? 'док.' : 'р.'} ) , то
          вы не сможете отправлять документы.
        </div>
      </Modal.Body>
    </Modal>
  );
};
