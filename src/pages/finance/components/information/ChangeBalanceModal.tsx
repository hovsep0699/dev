import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Icons, Input, ButtonKinds } from '@distate/components';
import { changeBalance } from '../../store/actions';
import './style.css';

type Props = {
  hide: () => void;
  isVisible: boolean;
  title: string;
  id: number;
  isAdd: boolean;
};

/** Модалка для пополнения и списания средств */
export const ChangeBalanceModal = (props: Props) => {
  const { hide, isVisible, title, id, isAdd } = props;
  const [sum, setSum] = useState('0.00');
  const [comment, setComment] = useState('');

  const [sumError, setSumError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setSum('0.00');
    setComment('');
  }, [isVisible]);

  const validate = () => {
    let valid = true;
    if (comment.trim().length === 0) {
      setCommentError(true);
      valid = false;
    } else {
      setCommentError(false);
    }

    if (Number(sum) === 0) {
      setSumError(true);
      valid = false;
    } else {
      setSumError(false);
    }

    return valid;
  };

  const onConfirm = () => {
    const prepareSum = isAdd ? Number(sum) * 100 : -(Number(sum) * 100);
    validate() && dispatch(changeBalance({ id, sum: prepareSum, comment, hide }));
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
      <Modal.Header title={title} />

      <Modal.Body>
        <div className="two-columns-center">
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">
              Сумма<span style={{ color: '#e64f49' }}>*</span>
            </div>
            <div className="two-columns-center_value">
              <Input
                value={sum}
                onChange={e => onChangeSum(e)}
                onBlur={e => onBlurSum(e)}
                error={sumError}
                width={150}
                type="number"
              />
            </div>
          </div>
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">
              Сообщение<span style={{ color: '#e64f49' }}>*</span>
            </div>
            <div className="two-columns-center_value">
              <textarea
                value={comment}
                className={commentError ? 'custom-textarea error' : 'custom-textarea'}
                onChange={e => setComment(e.target.value)}
              />
            </div>
          </div>
          <div className="two-columns-center_row">
            <div className="two-columns-center_name"></div>
            <div className="two-columns-center_value">
              <Button
                icon={<Icons.IconShare fill="currentColor" />}
                kind={ButtonKinds.Orange}
                onClick={onConfirm}
              >
                Подтвердить действие
              </Button>
              <Button
                icon={<Icons.IconClose fill="currentColor" />}
                style={{ marginLeft: 10 }}
                onClick={hide}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
