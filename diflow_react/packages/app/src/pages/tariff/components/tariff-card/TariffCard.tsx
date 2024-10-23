import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Icons, ButtonKinds } from '@distate/components';
import { DocumentFlow } from './DocumentFlow';
import { TariffInfo } from './TariffInfo';
import { setTariffStatus, getTariff } from '../../store/actions';
import { tariffStatusSystemNameSelector } from '../../store/selects';

export enum ViewAdditionState {
  'hide',
  'view'
}

type Props = {
  isVisible: boolean;
  hide: () => void;
  tariffId: number;
};

/** Карточка тарифа */
export const TariffCard = (props: Props) => {
  const { isVisible, hide, tariffId } = props;

  const statusName = useSelector(tariffStatusSystemNameSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    /** получение описания открытого тарифа */
    dispatch(getTariff(tariffId));
  }, [dispatch, tariffId]);

  const onArchive = () => {
    dispatch(setTariffStatus({ tariffId, statusSystemName: 'archive' }));
  };

  const onActive = () => {
    dispatch(setTariffStatus({ tariffId, statusSystemName: 'active' }));
  };

  return (
    <>
      <Modal hide={() => hide()} isVisible={isVisible}>
        <Modal.Header title="Карточка тарифа" />
        <Modal.Body>
          <TariffInfo />
          <DocumentFlow tariffId={tariffId} />
          {statusName === 'archive' ? (
            <Button
              icon={<Icons.IconCheck fill="currentColor" />}
              kind={ButtonKinds.LightGreen}
              style={{ marginTop: 15 }}
              onClick={onActive}
            >
              Активировать
            </Button>
          ) : (
            <Button
              icon={<Icons.IconArchive fill="currentColor" />}
              kind={ButtonKinds.Danger}
              style={{ marginTop: 15 }}
              onClick={onArchive}
            >
              В архив
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
