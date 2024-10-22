import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonKinds, ButtonSizes, Icons } from '@distate/components';
import SecurityService from '@distate/core/dist/application/security/SecurityService';
import { getFinanceInfo } from '../../store/actions';
import { root as financeSelector } from '../../store/selectors';
import { ChangeBalanceModal } from './ChangeBalanceModal';
import { BillModal } from './BillModal';
import { TariffCard } from './TariffCard';
import { ChangeTariffModal } from './ChangeTariffModal';

/** Финансы - Информация */
export const Information = ({ match }: any) => {
  const dispatch = useDispatch();

  const {
    isVks,
    companyName,
    balance,
    accountNumber,
    currentTariff,
    isPostpaid,
    tariffBalance,
    authorized
  } = useSelector(financeSelector);

  const isPromotion = currentTariff?.isPromotion;

  const companyId = match?.params?.id;
  const tariffId = currentTariff?.tariff_id;

  const [isChangeBalance, setIsChangeBalance] = useState(false);
  const [changeBalanceTitle, setChangeBalanceTitle] = useState('');
  const [isAdd, setIsAdd] = useState(true);
  const [isBill, setIsBill] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [isChangeTariff, setIsChangeTariff] = useState(false);
  const [isEnableBalance, setIsEnableBalance] = useState(false);
  const [isEnableTariff, setIsEnableTariff] = useState(false);

  useEffect(() => {
    companyId && dispatch(getFinanceInfo(companyId));
  }, [companyId, dispatch]);

  useEffect(() => {
    /** получение прав на редактирование баланса */
    const hasChangeBalanceRole = SecurityService.hasRole('ROLE_BALANCE_CHANGER');
    setIsEnableBalance(hasChangeBalanceRole);

    /** получение прав на редактирование тарифа */
    const hasChangeTariffRole = SecurityService.hasRole('ROLE_TARIFF_CHANGER');
    setIsEnableTariff(hasChangeTariffRole);
  }, [dispatch]);

  /** Пополнить баланс */
  const onTopUpBalance = () => {
    setIsChangeBalance(true);
    setChangeBalanceTitle('Зачисление средств');
    setIsAdd(true);
  };

  /** Списать баланс */
  const onWriteOffBalance = () => {
    setIsChangeBalance(true);
    setChangeBalanceTitle('Списание средств');
    setIsAdd(false);
  };

  return (
    <div>
      <h3 className="header">{companyName}</h3>

      <div className="two-columns-center">
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Номер лицевого счета:</div>
          <div className="two-columns-center_value">{accountNumber}</div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Баланс компании:</div>
          <div
            className="two-columns-center_value"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {balance ? (
              <div>
                {Number(balance) / 100} {isPromotion ? 'док.' : 'р.'}
              </div>
            ) : (
              <div>0.00 {isPromotion ? 'док.' : 'р.'}</div>
            )}
            <div>
              {!isVks && (
                <Button
                  kind={ButtonKinds.Orange}
                  icon={<Icons.IconShare fill="currentColor" />}
                  size={ButtonSizes.Small}
                  style={{ margin: '0 10px 0 20px' }}
                  onClick={() => setIsBill(true)}
                >
                  Выставить счет
                </Button>
              )}
              {isEnableBalance && isVks && (
                <Button
                  kind={ButtonKinds.LightGreen}
                  icon={<Icons.IconArrowUp fill="currentColor" />}
                  size={ButtonSizes.Small}
                  style={{ margin: '0 10px 0 20px' }}
                  onClick={onTopUpBalance}
                >
                  Пополнить
                </Button>
              )}
              {isEnableBalance && isVks && (
                <Button
                  kind={ButtonKinds.Danger}
                  icon={<Icons.IconArrowDown fill="currentColor" />}
                  size={ButtonSizes.Small}
                  onClick={onWriteOffBalance}
                >
                  Списать
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Тариф:</div>
          <div
            className="two-columns-center_value"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div>{currentTariff?.tariff_title}</div>
            <Button
              kind={ButtonKinds.Secondary}
              size={ButtonSizes.Small}
              style={{ margin: '0 10px 0 20px', minWidth: 140 }}
              onClick={() => setIsCard(true)}
            >
              Карточка тарифа
            </Button>
            {isEnableTariff && (
              <Button
                icon={<Icons.IconFiles fill="currentColor" />}
                size={ButtonSizes.Small}
                style={{ minWidth: 140 }}
                onClick={() => setIsChangeTariff(true)}
              >
                Сменить тариф
              </Button>
            )}
          </div>
        </div>
      </div>

      {/** если флаг существует и это не постоплата */}
      {typeof isPostpaid !== undefined && !isPostpaid && (
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Баланс тарифа:</div>
          <div className="two-columns-center_value">
            {
              <div>
                {(Number(tariffBalance) / 100).toFixed(2)} {isPromotion ? 'док.' : 'р.'} из них
                заблокировано {(Number(authorized) / 100).toFixed(2)} {isPromotion ? 'док.' : 'р.'}
              </div>
            }
          </div>
        </div>
      )}

      <ChangeBalanceModal
        hide={() => setIsChangeBalance(false)}
        isVisible={isChangeBalance}
        title={changeBalanceTitle}
        id={companyId}
        isAdd={isAdd}
      />
      <BillModal
        hide={() => setIsBill(false)}
        isVisible={isBill}
        id={companyId}
        accountNumber={accountNumber!}
      />
      {tariffId && isCard && (
        <TariffCard hide={() => setIsCard(false)} isVisible={isCard} tariffId={tariffId} />
      )}
      {tariffId && (
        <ChangeTariffModal
          hide={() => setIsChangeTariff(false)}
          isVisible={isChangeTariff}
          currentTariffId={tariffId}
          companyId={companyId}
        />
      )}
    </div>
  );
};
