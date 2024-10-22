import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icons, Button, ButtonKinds, Input, CheckBox, Modal } from '@distate/components';
import './style.css';
import { TariffTypeSwitcher } from './TariffTypeSwitcher';
import { LocksSettingsSwitcher } from './LocksSettingsSwitcher';
import { TariffListTable } from './TariffListTable';
import { createTariff, setTariffErrors } from '../../store/actions';
import {
  titleErrorsSelector,
  periodicalCostErrorsSelector,
  periodErrorsSelector
} from '../../store/selects';

type Props = {
  isVisible: boolean;
  hide: () => void;
};

/** модалка создания тарифа */
export const TariffCreate = (props: Props) => {
  const { hide, isVisible } = props;

  const [tariffTitle, setTariffTitle] = useState<string>();
  const [tariffType, setTariffType] = useState<number>(1);
  const [tariffStatus, setTariffStatus] = useState<number>(1);
  const [pricingConnectionCost, setPricingConnectionCost] = useState<number>(0);
  const [pricingPeriodicalCost, setPricingPeriodicalCost] = useState<number>(0);
  const [pricingPeriodYear, setPricingPeriodYear] = useState<number>(0);
  const [pricingPeriodMonth, setPricingPeriodMonth] = useState<number>(1);
  const [pricingPeriodDay, setPricingPeriodDay] = useState<number>(0);
  const [locksSettingsType, setLocksSettingsType] = useState<number>(1);
  const [locksSettingsNextTariff, setLocksSettingsNextTariff] = useState<number>();
  const [isPromotion, setIsPromotion] = useState(false);

  const [nextTariffTitle, setNextTariffTitle] = useState<string>();
  const [nextTariffType, setNextTariffType] = useState<string>();

  const dispatch = useDispatch();

  const [connectionCostInput, setConnectionCostInput] = useState('0.00');
  const [periodicalCostInput, setPeriodicalCostInput] = useState('0.00');

  const titleError = useSelector(titleErrorsSelector);
  const periodicalCostError = useSelector(periodicalCostErrorsSelector);
  const periodError = useSelector(periodErrorsSelector);

  /** Чекбокс изменения видимости в списке */
  const onChangeIsHidenInList = () => {
    setTariffStatus((oldValue: number) => (oldValue === 2 ? 1 : 2));
  };

  /** Сохранить */
  const onSave = () => {
    const formData = new FormData();
    tariffTitle && formData.append('tariff[title]', tariffTitle);
    tariffType && formData.append('tariff[type]', tariffType.toString());
    tariffStatus && formData.append('tariff[status]', tariffStatus.toString());
    formData.append(
      'pricing[connectionCost]',
      pricingConnectionCost ? (pricingConnectionCost * 100).toString() : '0'
    );
    formData.append(
      'pricing[periodicalCost]',
      pricingPeriodicalCost ? (pricingPeriodicalCost * 100).toString() : '0'
    );
    formData.append('pricing[isPromotion]', isPromotion ? '1' : '0');
    formData.append('pricing[period][year]', pricingPeriodYear.toString());
    formData.append('pricing[period][month]', pricingPeriodMonth.toString());
    formData.append('pricing[period][day]', pricingPeriodDay.toString());
    locksSettingsType && formData.append('locks_settings[type]', locksSettingsType.toString());
    formData.append('locks_settings[threshold]', '0');
    locksSettingsNextTariff &&
      formData.append('locks_settings[nextTariff]', locksSettingsNextTariff.toString());

    dispatch(createTariff(formData));
  };

  useEffect(() => {
    dispatch(setTariffErrors({ createTariffErrors: undefined }));
  }, [dispatch]);

  const onBlurConnectionCost = (e: any) => {
    const value = e.target.value;
    setConnectionCostInput(Number(value).toFixed(2));
    setPricingConnectionCost(e.target.value);
  };

  const onBlurPeriodicalCost = (e: any) => {
    const value = e.target.value;
    setPeriodicalCostInput(Number(value).toFixed(2));
    setPricingPeriodicalCost(e.target.value);
  };

  const changeTariffTypeHandler = ({ id }: { id: number }) => {
    setTariffType(id);
  };

  const changeNextTariffHandler = (id: number, title: string, type_title: string) => {
    setNextTariffTitle(title);
    setNextTariffType(type_title);
    setLocksSettingsNextTariff(id);
  };

  return (
    <Modal hide={() => hide()} isVisible={isVisible}>
      <Modal.Header title="Карточка тарифа" />
      <Modal.Body>
        <div>
          <span className="tariff-info-title">Тариф</span>
          <div className="tariff-info-table-wrapper">
            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">Название</div>
              <div>
                <Input
                  value={tariffTitle}
                  onChange={e => setTariffTitle(e.target.value)}
                  width={330}
                  errors={titleError}
                  error={Boolean(titleError)}
                />
              </div>
            </div>

            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">Тип</div>
              <div>
                <TariffTypeSwitcher
                  onChange={changeTariffTypeHandler}
                  tariffTypeId={Number(tariffType)}
                />
              </div>
            </div>

            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title"></div>
              <div className="tariff-info-table-value">
                <CheckBox
                  label={'аĸционный тариф'}
                  checked={isPromotion}
                  onChange={() => setIsPromotion(!isPromotion)}
                />
              </div>
            </div>

            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title"></div>
              <div>
                <CheckBox
                  label={'отображать в списке для подключения'}
                  checked={tariffStatus === 2}
                  onChange={onChangeIsHidenInList}
                />
              </div>
            </div>
          </div>

          <p className="tariff-info-title">Ценовая политика</p>

          <div className="tariff-info-table-wrapper">
            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">Стоимость перехода</div>
              <div>
                <Input
                  value={connectionCostInput}
                  onBlur={onBlurConnectionCost}
                  onChange={e => setConnectionCostInput(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">Абонентская плата</div>
              <div>
                <Input
                  value={periodicalCostInput}
                  onBlur={onBlurPeriodicalCost}
                  onChange={e => setPeriodicalCostInput(e.target.value)}
                  type="number"
                  error={Boolean(periodicalCostError)}
                  errors={periodicalCostError}
                />
              </div>
            </div>
            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">Периодичность</div>
              <div>
                <div className="tariff-info-table-period">
                  <Input
                    value={pricingPeriodYear.toString()}
                    label="Лет"
                    width={80}
                    name="year"
                    onChange={e => setPricingPeriodYear(Number(e.target.value))}
                    type="number"
                  />{' '}
                  <Input
                    value={pricingPeriodMonth.toString()}
                    label="Месяцев"
                    width={80}
                    name="month"
                    onChange={e => setPricingPeriodMonth(Number(e.target.value))}
                    type="number"
                  />{' '}
                  <Input
                    value={pricingPeriodDay.toString()}
                    label="Дней"
                    width={80}
                    name="day"
                    onChange={e => setPricingPeriodDay(Number(e.target.value))}
                    type="number"
                  />
                </div>
                <Input hidden errors={periodError} className="hidden-tariff-input" />
              </div>
            </div>
          </div>

          <p className="tariff-info-title">Ограничения</p>

          <div className="tariff-info-table-wrapper">
            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">Порог отключения</div>
              <div>
                <Input placeholder="0.00" disabled={true} />
              </div>
            </div>
            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">При достижении порога отключения</div>
              <div>
                <LocksSettingsSwitcher
                  tariffTypeId={locksSettingsType}
                  onChange={setLocksSettingsType}
                />
              </div>
            </div>
            {locksSettingsType === 2 && nextTariffTitle && (
              <div className="tariff-info-table-row">
                <div className="tariff-info-table-title">Тариф для перехода</div>
                <div className="tariff-info-table-value">{`${nextTariffTitle} (${nextTariffType})`}</div>
              </div>
            )}
          </div>

          {locksSettingsType === 2 && (
            <TariffListTable
              onChange={changeNextTariffHandler}
              nextTariffId={locksSettingsNextTariff}
            />
          )}

          <div style={{ display: 'flex', padding: '20px 0' }}>
            <div>
              <Button
                icon={<Icons.IconCheck fill="currentColor" />}
                kind={ButtonKinds.LightGreen}
                style={{ marginRight: 30 }}
                onClick={onSave}
              >
                Сохранить
              </Button>
            </div>
            <p style={{ fontSize: 12, color: '#626265' }}>
              Для редактирования всего тарифа уберите его из списка на подключение. Редактирование
              тарифа возможно только при отсутствии подключенных компаний.
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
