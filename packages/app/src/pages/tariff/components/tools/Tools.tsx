import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icons } from '@distate/components';
import { TariffStatusType } from '../Tariff';
import './style.css';
import { setIsOpenTariffCreate } from '../../store/actions';

type Props = {
  tariffStatus: TariffStatusType;
  setTariffStatus: Function;
};

export const Tools = (props: Props) => {
  const { setTariffStatus, tariffStatus } = props;

  const dispatch = useDispatch();

  return (
    <div>
      <Button
        className={`tools-checkbox_button${tariffStatus === TariffStatusType.active && '-active'}`}
        onClick={() => setTariffStatus(TariffStatusType.active)}
      >
        Активные
      </Button>
      <Button
        className={`tools-checkbox_button${tariffStatus === TariffStatusType.archived &&
          '-active'}`}
        onClick={() => setTariffStatus(TariffStatusType.archived)}
      >
        Архивированные
      </Button>
      <Button
        icon={<Icons.IconPlus fill="currentColor" />}
        style={{ marginLeft: 10 }}
        onClick={() => dispatch(setIsOpenTariffCreate({ isOpenTariffCreate: true }))}
      >
        Новый тариф
      </Button>
    </div>
  );
};
