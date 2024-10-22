import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Icons, Input, ButtonKinds } from '@distate/components';
import { setBill } from '../../store/actions';

type Props = {
  hide: () => void;
  isVisible: boolean;
  id: number;
  accountNumber: string;
};

/** Модалка выставления счета */
export const BillModal = (props: Props) => {
  const { hide, isVisible, id, accountNumber } = props;

  const [sum, setSum] = useState('0.00');

  const dispatch = useDispatch();

  const onBill = () => {
    dispatch(setBill({ id, sum: Number(sum) * 100 }));
  };

  const onChangeSum = (e: any) => {
    setSum(e.target.value);
  };

  const onBlurSum = (e: any) => {
    const value = e.target.value;
    if (value.includes('.')) {
      setSum(Number(value).toFixed(2));
    } else {
      const preparedSum = Number(value).toFixed(2);
      setSum(preparedSum);
    }
  };

  return (
    <Modal hide={hide} isVisible={isVisible}>
      <Modal.Header title="Выставить счет" />

      <Modal.Body>
        <div>Пополнение лицевого счета №{accountNumber} на сумму:</div>
        <div className="two-columns-center">
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">
              Сумма<span style={{ color: '#e64f49' }}>*</span>
            </div>
            <div className="two-columns-center_value">
              <Input
                width={150}
                value={sum}
                onChange={e => onChangeSum(e)}
                onBlur={e => onBlurSum(e)}
              />
            </div>
          </div>
          <div className="two-columns-center_row">
            <div className="two-columns-center_name"></div>
            <div className="two-columns-center_value">
              <Button
                icon={<Icons.IconShare fill="currentColor" />}
                kind={ButtonKinds.Orange}
                onClick={onBill}
              >
                Выставить счет
              </Button>
              <Button
                icon={<Icons.IconClose fill="currentColor" />}
                style={{ marginLeft: 10 }}
                onClick={hide}
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
