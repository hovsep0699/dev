import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icons, Button, ButtonKinds, Input, CheckBox } from '@distate/components';
import './style.css';
import { RadioButton } from '../../../../common/radio-button';
import {
  isTariffEditingSelector,
  currentTariffSelector,
  tariffStatusesSelector,
  tariffErrorsSelector
} from '../../store/selects';
import { TariffTypeSwitcher } from './TariffTypeSwitcher';
import { TariffStatusSystemName } from '../../helpers/typings';
import { ViewAdditionState } from './TariffCard';
import { LocksSettingsSwitcher } from './LocksSettingsSwitcher';
import { TariffListTable } from './TariffListTable';
import { editTariff, setIsTariffEditing, setTariffErrors } from '../../store/actions';
import { yearDeclension, monthDeclension, dayDeclension } from '../../../../helpers/declension';

type TariffValueType = {
  /** id отображаемого тарифа */
  id?: number;
  /** название тарифа */
  title?: string;
  /** название типа - предоплатный, постоплатный */
  tariffTypeTitle?: string;
  /** название статуса 'Не отображается в списке для подключения' или отображается */
  statusTitle?: string;
  /** id типа тарифа - предоплатный или постоплатный */
  tariffTypeId?: number;
  /** id статуса - отображать или нет в списке для подключения */
  status?: number;
  /** стоимость перехода на тариф */
  connectionCost?: number;
  /** абонентская плана */
  periodicalCost?: number;
  /** периодичность - год */
  year?: number;
  /** периодичность - месяц */
  month?: number;
  /** периодичность - день */
  day?: number;
  /** при достижении порога отключения - блокировать или переводить на другой тариф*/
  locksSettingsType?: number;
  /** название следующего тарифа */
  nextTariffTitle?: string;
  /** название типа следующего тарифа - предоплатный или постоплатный */
  nextTariffType?: string;
  /** id следующего тарифа */
  nextTariffId?: number;
  /** количество компаний подключенных к тарифу */
  companiesCount?: number;
  /** флаг акционного тарифа */
  isPromotion?: boolean;
};

/** Информация о тарифе в каторчке тарифа */
export const TariffInfo = () => {
  const dispatch = useDispatch();

  const tariff = useSelector(currentTariffSelector);

  const tariffStatuses = useSelector(tariffStatusesSelector);
  const [tariffValues, setTariffValues] = useState<TariffValueType>({});

  const { periodicalCost, nextTariffTitle, nextTariffType, year, month, day } = tariffValues;

  const id = tariff?.tariff?.id;
  const title = tariff?.tariff?.title;
  const tariffTypeTitle = tariff?.tariff?.type?.title;
  const statusSystemName = tariff?.tariff?.status?.systemName;

  const lockSettingActionType = tariff?.locks_settings?.type?.systemName;
  const lockSettingActionTitle = tariff?.locks_settings?.type?.title;

  const [activeStatusId, setActiveStatusId] = useState();
  const [hideStatusId, setHideStatusId] = useState();
  const [isPromotion, setIsPromotion] = useState(false);

  const [connectionCostInput, setConnectionCostInput] = useState('0.00');
  const [periodicalCostInput, setPeriodicalCostInput] = useState('0.00');

  useEffect(() => {
    setConnectionCostInput(Number(tariff?.pricing?.connectionCost / 100).toFixed(2));
    setPeriodicalCostInput(Number(tariff?.pricing?.periodicalCost / 100).toFixed(2));
  }, [tariff]);

  const tariffErrors = useSelector(tariffErrorsSelector);
  const isEditing = useSelector(isTariffEditingSelector);
  /** свойства для переключения радиокнопки отображать или нет дополнительные настройки */
  const [viewAddition, setViewAddition] = useState(ViewAdditionState.hide);

  const periodYear = year && yearDeclension(+year);
  const periodMonth = month && monthDeclension(+month);
  const periodDay = day && dayDeclension(+day);
  const periodResult = [periodYear, periodMonth, periodDay].filter(item => item).join(' ');

  const isAllowEditing = tariff?.tariff?.companiesCount === 0 && tariff?.tariff?.status?.id === 1;

  useEffect(() => {
    const statusTitle =
      statusSystemName !== TariffStatusSystemName.active
        ? 'Не отображается в списке для подключения'
        : 'Отображается в списке для подключения';

    setTariffValues({
      id,
      title,
      tariffTypeTitle,
      statusTitle,
      tariffTypeId: tariff?.tariff?.type?.id,
      status: tariff?.tariff?.status?.id,
      connectionCost: tariff?.pricing?.connectionCost,
      periodicalCost: tariff?.pricing?.periodicalCost,
      year: tariff?.pricing?.period?.year,
      month: tariff?.pricing?.period?.month,
      day: tariff?.pricing?.period?.day,
      isPromotion: tariff?.pricing?.isPromotion,
      locksSettingsType: tariff?.locks_settings?.type?.id,
      nextTariffTitle: tariff?.locks_settings?.nextTariff?.title,
      nextTariffType: tariff?.locks_settings?.nextTariff?.type?.title,
      nextTariffId: tariff?.locks_settings?.nextTariff?.id,
      companiesCount: tariff?.tariff?.companiesCount
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewAddition, id]);

  useEffect(() => {
    /** переключатель редактирования */
    dispatch(setIsTariffEditing({ isTariffEditing: false }));
    /** переключатель - отобразить Дополнительно */
    setViewAddition(ViewAdditionState.hide);
    /** обнуление ошибок */
    dispatch(setTariffErrors({ tariffErrors: undefined }));
  }, [dispatch, id]);

  useEffect(() => {
    const { id: activeId } = tariffStatuses.find(
      (item: any) => item.system_name === TariffStatusSystemName.active
    );
    const { id: hideId } = tariffStatuses.find(
      (item: any) => item.system_name === TariffStatusSystemName.hidden
    );

    setActiveStatusId(activeId);
    setHideStatusId(hideId);
  }, [tariffStatuses]);

  useEffect(() => {
    tariff?.pricing?.isPromotion && setIsPromotion(tariff?.pricing?.isPromotion);
  }, [tariff]);

  /** Чекбокс изменения видимости в списке */
  const onChangeIsHidenInList = () => {
    setTariffValues((oldValue: any) => {
      const oldId = oldValue?.status;
      if (oldId === activeStatusId) {
        return {
          ...oldValue,
          status: hideStatusId
        };
      } else {
        return {
          ...oldValue,
          status: activeStatusId
        };
      }
    });
  };

  /** Сохранить */
  const onSave = () => {
    const {
      id,
      title,
      tariffTypeId,
      connectionCost,
      year,
      month,
      day,
      locksSettingsType,
      nextTariffId,
      status
    } = tariffValues;

    const formData = new FormData();
    title && formData.append('tariff[title]', title);
    tariffTypeId && formData.append('tariff[type]', tariffTypeId.toString());
    status && formData.append('tariff[status]', status.toString());
    connectionCost && formData.append('pricing[connectionCost]', String(connectionCost * 100));
    periodicalCost && formData.append('pricing[periodicalCost]', String(periodicalCost * 100));
    formData.append('pricing[period][year]', year?.toString() || '0');
    formData.append('pricing[period][month]', month?.toString() || '0');
    formData.append('pricing[period][day]', day?.toString() || '0');
    formData.append('pricing[isPromotion]', isPromotion ? '1' : '0');
    locksSettingsType && formData.append('locks_settings[type]', locksSettingsType.toString());
    formData.append('locks_settings[threshold]', '0');
    nextTariffId && formData.append('locks_settings[nextTariff]', nextTariffId.toString());

    dispatch(editTariff({ id, formData }));
  };

  /** обработчик изменения типа тарифа */
  const changeTariffTypeHandler = (item: { id: number; title: string }) => {
    const { id, title } = item;

    setTariffValues((oldValue: any) => ({
      ...oldValue,
      tariffTypeId: id,
      tariffTypeTitle: title
    }));
  };

  /** Отменить */
  const onCancel = () => {
    dispatch(setIsTariffEditing({ isTariffEditing: false }));
  };

  const onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setTariffValues((oldValue: any) => ({
      ...oldValue,
      [name]: value
    }));
  };

  const onBlurConnectionCost = (e: any) => {
    const value = e.target.value;
    setConnectionCostInput(Number(value).toFixed(2));
    setTariffValues((oldValue: any) => ({
      ...oldValue,
      connectionCost: Number(value)
    }));
  };

  const onBlurPeriodicalCost = (e: any) => {
    const value = e.target.value;
    setPeriodicalCostInput(Number(value).toFixed(2));
    setTariffValues((oldValue: any) => ({
      ...oldValue,
      periodicalCost: Number(value)
    }));
  };

  /** Редактировать */
  const onEdit = () => {
    dispatch(setIsTariffEditing({ isTariffEditing: true }));
    setViewAddition(ViewAdditionState.view);
  };

  const changeLocksSettingHandler = (id: number) => {
    setTariffValues(oldValue => ({
      ...oldValue,
      locksSettingsType: id
    }));
  };

  const changeNextTariffHandler = (id: number, title: string, type_title: string) => {
    setTariffValues((oldValue: any) => ({
      ...oldValue,
      nextTariffTitle: title,
      nextTariffType: type_title,
      nextTariffId: id
    }));
  };

  return (
    <div className="tariff-card-block">
      <span className="tariff-info-title">Тариф</span>
      <div className="tariff-info-table-wrapper">
        <div className="tariff-info-table-row">
          <div className="tariff-info-table-title">Название</div>
          <div>
            {isEditing ? (
              <Input
                value={tariffValues?.title}
                onChange={e => onChange(e)}
                width={330}
                name="title"
                error={Boolean(tariffErrors?.tariff?.title)}
                errors={tariffErrors?.tariff?.title}
              />
            ) : (
              tariffValues?.title
            )}
          </div>
        </div>

        <div className="tariff-info-table-row">
          <div className="tariff-info-table-title">Тип</div>
          <div>
            {isEditing && isAllowEditing ? (
              <TariffTypeSwitcher
                onChange={changeTariffTypeHandler}
                tariffTypeId={tariffValues.tariffTypeId}
              />
            ) : (
              tariffValues.tariffTypeTitle
            )}
          </div>
        </div>
        <div className="tariff-info-table-row">
          <div className="tariff-info-table-title"></div>
          <div>
            {isEditing ? (
              <CheckBox
                label={'отображать в списке для подключения'}
                checked={tariffValues?.status === activeStatusId}
                onChange={onChangeIsHidenInList}
              />
            ) : (
              tariffValues.statusTitle
            )}
          </div>
        </div>

        <div className="tariff-info-table-row" style={{ marginBottom: 10 }}>
          <div className="tariff-info-table-title"></div>
          <div className="tariff-info-table-value">
            {isEditing ? (
              <CheckBox
                label={'аĸционный тариф'}
                checked={isPromotion}
                onChange={() => setIsPromotion(!isPromotion)}
              />
            ) : (
              tariff?.pricing?.isPromotion && 'Аĸционный тариф'
            )}
          </div>
        </div>

        <div className="tariff-info-table-row">
          <div className="tariff-info-table-title">Дополнительно</div>
          <div className="tariff-info-table-value">
            <RadioButton
              value={0}
              name="addition"
              checked={viewAddition === ViewAdditionState.hide}
              onChange={() => setViewAddition(ViewAdditionState.hide)}
              id={12}
              label="скрыть"
            />
            <RadioButton
              value={1}
              name="addition"
              onChange={() => setViewAddition(ViewAdditionState.view)}
              checked={viewAddition === ViewAdditionState.view}
              id={22}
              label="отобразить"
            />
          </div>
        </div>
      </div>

      {viewAddition === ViewAdditionState.view && (
        <>
          <p className="tariff-info-title">Ценовая политика</p>

          <div className="tariff-info-table-wrapper">
            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">Стоимость перехода</div>
              <div>
                {isEditing && isAllowEditing ? (
                  <Input
                    value={connectionCostInput}
                    onBlur={onBlurConnectionCost}
                    onChange={e => setConnectionCostInput(e.target.value)}
                    type="number"
                  />
                ) : (
                  <div>{Number(connectionCostInput).toFixed(2)} р.</div>
                )}
              </div>
            </div>
            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">Абонентская плата</div>
              <div>
                {isEditing && isAllowEditing ? (
                  <Input
                    value={periodicalCostInput}
                    onBlur={onBlurPeriodicalCost}
                    onChange={e => setPeriodicalCostInput(e.target.value)}
                    type="number"
                  />
                ) : (
                  <div>{Number(periodicalCostInput).toFixed(2)} р.</div>
                )}
              </div>
            </div>
            <div className="tariff-info-table-row">
              <div className="tariff-info-table-title">Периодичность</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="tariff-info-table-period">
                  {isEditing && isAllowEditing ? (
                    <>
                      <Input
                        value={tariffValues?.year}
                        label="Лет"
                        width={80}
                        name="year"
                        onChange={onChange}
                        type="number"
                        placeHolder="0"
                      />{' '}
                      <Input
                        value={tariffValues?.month}
                        label="Месяцев"
                        width={80}
                        name="month"
                        onChange={onChange}
                        type="number"
                        placeHolder="0"
                      />{' '}
                      <Input
                        value={tariffValues?.day}
                        label="Дней"
                        width={80}
                        name="day"
                        onChange={onChange}
                        type="number"
                        placeHolder="0"
                      />
                    </>
                  ) : (
                    <div>{periodResult}</div>
                  )}
                </div>
                <Input
                  hidden
                  errors={tariffErrors?.pricing?.period}
                  className="hidden-tariff-input"
                />
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
                {isEditing && isAllowEditing ? (
                  <LocksSettingsSwitcher
                    tariffTypeId={tariffValues.locksSettingsType || 1}
                    onChange={changeLocksSettingHandler}
                  />
                ) : (
                  <div>{lockSettingActionTitle}</div>
                )}
              </div>
            </div>
            {tariffValues?.locksSettingsType === 2 && lockSettingActionType === 'move' && (
              <div className="tariff-info-table-row">
                <div className="tariff-info-table-title">Тариф для перехода</div>
                <div className="tariff-info-table-value">{`${nextTariffTitle} (${nextTariffType})`}</div>
              </div>
            )}
          </div>
        </>
      )}

      {isEditing && isAllowEditing && tariffValues?.locksSettingsType === 2 && (
        <TariffListTable
          onChange={changeNextTariffHandler}
          nextTariffId={tariffValues.nextTariffId}
        />
      )}

      <div style={{ padding: '20px 0' }}>
        {isEditing ? (
          <>
            <Button
              icon={<Icons.IconSave fill="currentColor" />}
              kind={ButtonKinds.LightGreen}
              onClick={onSave}
              style={{ marginRight: 5 }}
            >
              Сохранить
            </Button>

            <Button
              icon={<Icons.IconClose fill="currentColor" />}
              kind={ButtonKinds.Danger}
              onClick={onCancel}
            >
              Отмена
            </Button>
          </>
        ) : (
          <Button icon={<Icons.IconPencil fill="currentColor" />} onClick={() => onEdit()}>
            Редактировать
          </Button>
        )}
      </div>
    </div>
  );
};
