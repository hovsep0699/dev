import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Icons, ButtonKinds } from '@distate/components';
import { Pagination } from '../../../../common/pagination';
import { getTariffs, changeTariff } from '../../store/actions';
import { tariffsRecordsTotalSelector, tariffsRowsSelector } from '../../store/selectors';
import { RadioButton } from '../../../../common/radio-button';
import { TariffCard } from './TariffCard';

type Props = {
  hide: () => void;
  isVisible: boolean;
  currentTariffId: number;
  companyId: number;
};

/** Изменить тариф */
export const ChangeTariffModal = (props: Props) => {
  const { hide, isVisible, currentTariffId, companyId } = props;
  const [offset, setOffset] = useState(0);
  const [isCard, setIsCard] = useState(false);
  const [tariffId, setTariffId] = useState<number>();
  const [tariffTitle, setTariffTitle] = useState<string>();
  const [selectedTariff, setSelectedTariff] = useState<number>();

  const tariffs = useSelector(tariffsRowsSelector);
  const recordsTotal = useSelector(tariffsRecordsTotalSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTariffs({ offset, notStatusSystemName: 'archive' }));
  }, [dispatch, offset]);

  const openCard = (id: number, title: string) => {
    setTariffId(id);
    setTariffTitle(title);
    setIsCard(true);
  };

  const onChangeTariffClick = () => {
    dispatch(changeTariff({ id: companyId, tariffId: selectedTariff }));
  };

  return (
    <>
      <Modal hide={hide} isVisible={isVisible}>
        <Modal.Header title="Изменить тариф" />

        <Modal.Body>
          <table className="table">
            <thead className="common-table-head">
              <tr>
                <td colSpan={3}>Название</td>
              </tr>
            </thead>
            <tbody>
              {tariffs?.map(item => {
                const { id, title } = item;
                return (
                  <tr key={id}>
                    <td colSpan={2}>
                      <RadioButton
                        value={id}
                        name="tariff"
                        defaultChecked={currentTariffId === id}
                        onChange={() => setSelectedTariff(id)}
                        id={id}
                        label={title}
                        style={{ justifyContent: 'left' }}
                      />
                    </td>
                    <td align="right">
                      <Button kind={ButtonKinds.Secondary} onClick={() => openCard(id, title)}>
                        Карточка тарифа
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
                    kind={ButtonKinds.Orange}
                    onClick={onChangeTariffClick}
                    icon={<Icons.IconCheck fill="currentColor" />}
                  >
                    Сменить тариф
                  </Button>
                </td>
                <td align="right" colSpan={2}>
                  <div className="pagination-right">
                    <Pagination listLength={recordsTotal} setOffset={setOffset} />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </Modal.Body>
      </Modal>
      {tariffId && (
        <TariffCard
          hide={() => setIsCard(false)}
          isVisible={isCard}
          tariffId={tariffId}
          title={tariffTitle}
        />
      )}
    </>
  );
};
