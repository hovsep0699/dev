import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logos } from '../../../../helpers/path';
import { Button, ButtonKinds, Input, Select } from '@distate/components';
import { getPeriodStart, Period } from '../../../../helpers/dateUtils';
import {
  ConnectorId,
  ConnectorName,
  ConnectorStatusName,
  ConnectorStatus
} from '../../helpers/company.typings';
import {
  createConnectorAccount,
  clearErrors,
  getConnector,
  updateConnector,
  startConnector,
  stopConnector
} from '../../store/actions';
import {
  selectConnectorLoginErrors,
  selectConnectorPasswordErrors,
  selectConnectorStatus,
  selectConnectorLogin,
  selectConnectorBoxID,
  selectConnectorFnsUid,
  selectConnectorKpp,
  selectConnectorId,
  selectConnectorErrorMessage,
  selectConnectorPosition
} from '../../store/selectors';

/** Карточка коннетора */
export const Connector = (props: any) => {
  const { id } = props.match.params;
  const src = logos[id as never];
  const dispatch = useDispatch();
  const loginErrors = useSelector(selectConnectorLoginErrors);
  const passwordErrors = useSelector(selectConnectorPasswordErrors);

  const connectorStatus = useSelector(selectConnectorStatus);
  const connectorLogin = useSelector(selectConnectorLogin);
  const connectorPosition = useSelector(selectConnectorPosition);
  const connectorBoxID = useSelector(selectConnectorBoxID);
  const connectorFnsUid = useSelector(selectConnectorFnsUid);
  const connectorKpp = useSelector(selectConnectorKpp);
  const connectorId = useSelector(selectConnectorId);
  const errorMessage = useSelector(selectConnectorErrorMessage);

  const [boxId, setBoxId] = useState<string | undefined>(connectorBoxID);
  const [login, setLogin] = useState<string | undefined>(connectorLogin);
  const [password, setPassword] = useState<string>();
  const [importFrom, setImportFrom] = useState<HTMLSelectElement>();
  const [kpp, setKpp] = useState<string | undefined>(connectorKpp);
  const [fnsUid, setFnsUid] = useState<string | undefined>(connectorFnsUid);
  const [position, setPosition] = useState<string>();

  useEffect(() => {
    /** получение данных коннектора */
    dispatch(getConnector(id));

    /** очистка старых ошибок при первом входе */
    dispatch(clearErrors());
    setPosition(connectorPosition);
  }, [dispatch, id, connectorPosition]);

  /** опции селекта "Импортировать документы" */
  const IMPORT_DOCUMENTS_SELECT = [
    {
      value: Period.week,
      label: 'За текущую неделю'
    },
    {
      value: Period.month,
      label: 'За текущий месяц'
    },
    {
      value: Period.quarter,
      label: 'За текущий квартал'
    }
  ];

  const onSendForm = () => {
    const formData = {
      boxId,
      login,
      password,
      importFrom: getPeriodStart(importFrom?.value as never),
      operatorCode: id,
      position,
      fnsUid,
      kpp
    };
    dispatch(createConnectorAccount(formData));
  };

  const onUpdate = () => {
    dispatch(
      updateConnector({
        id: connectorId,
        data: {
          boxId,
          login,
          password,
          fnsUid,
          kpp,
          position
        }
      })
    );
  };

  const onStart = () => {
    dispatch(startConnector(connectorId));
  };

  const onStop = () => {
    dispatch(stopConnector(connectorId));
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className="connector-icon-wrapper">
          <img src={src} alt={id} />
        </div>
        <div className="connector-content">
          <div className="connector-title">
            <span className="connector-title-span">{ConnectorName[id as never]}</span>
            {connectorStatus && (
              <div className="connector-description">{ConnectorStatusName[connectorStatus]}</div>
            )}
          </div>
        </div>
      </div>
      <div className="two-columns-center">
        <div style={{ color: 'red' }}>{errorMessage && errorMessage}</div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Логин</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              value={login}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
              placeholder="Введите логин"
              error={!!loginErrors}
              errors={loginErrors}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Пароль</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              value={password}
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              error={!!passwordErrors}
              errors={passwordErrors}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Должность</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              value={position}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosition(e.target.value)}
              placeholder="Введите должность"
            />
          </div>
        </div>
        {id === ConnectorId.Kontur && (
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">BoxID</div>
            <div className="two-columns-center_value">
              <Input
                width={300}
                value={boxId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBoxId(e.target.value)}
                placeholder="Введите BoxID из аккаунта Диадока"
              />
            </div>
          </div>
        )}
        {id === ConnectorId.Korus && (
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">fnsUid</div>
            <div className="two-columns-center_value">
              <Input
                width={300}
                value={fnsUid}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFnsUid(e.target.value)}
                placeholder="Идентификатор участника документооборота ФНС"
              />
            </div>
          </div>
        )}
        {id === ConnectorId.Tenzor && (
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">КПП</div>
            <div className="two-columns-center_value">
              <Input
                width={300}
                value={kpp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKpp(e.target.value)}
                placeholder="Введите КПП СБИС"
              />
            </div>
          </div>
        )}
        {connectorStatus === null && (
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">Импортировать документы</div>
            <div className="two-columns-center_value">
              <Select
                width={300}
                value={importFrom}
                options={IMPORT_DOCUMENTS_SELECT}
                onChange={(e: HTMLSelectElement) => setImportFrom(e)}
                placeholder="Выберите период"
              />
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      {(connectorStatus === null || connectorStatus === ConnectorStatus.created) && (
        <Button className="connector-green-button" onClick={onSendForm}>
          Подключить
        </Button>
      )}
      {connectorStatus === ConnectorStatus.stopped && (
        <>
          <Button onClick={onStart} className="connector-green-button">
            Запустить
          </Button>
          <Button kind={ButtonKinds.Secondary} onClick={onUpdate}>
            Сохранить
          </Button>
        </>
      )}
      {connectorStatus === ConnectorStatus.connector && (
        <Button kind={ButtonKinds.Danger} onClick={onStop}>
          Приостановить
        </Button>
      )}
    </>
  );
};
