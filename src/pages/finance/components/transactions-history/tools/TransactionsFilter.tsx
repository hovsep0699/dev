import React, { useState } from 'react';
import {
  Button,
  ButtonKinds,
  Icons,
  Dropdown,
  Input,
  Select,
  Group,
  DatePicker
} from '@distate/components';
import { useDispatch } from 'react-redux';
import { dateFormat } from '@distate/components/dist/FormSchema';
import { getTransactionsHistory } from '../../../store/actions';
import { Textarea } from '../../../../../common/textarea/Textarea';
import { stringToPrice, priceToNumber } from '../../../../../utils/price';

type Props = {
  id: number;
};

/** фильтр истории транзакций */
export const TransactionsFilter = (props: Props) => {
  const { id } = props;

  const [summFrom, setSummFrom] = useState<string>();
  const [summTo, setSummTo] = useState<string>();
  const [createTo, setCreateTo] = useState<any>();
  const [createFrom, setCreateFrom] = useState<any>();
  const [comment, setComment] = useState('');
  const [transactionType, setTransactionType] = useState<HTMLSelectElement>();

  /** опции для селекта Типов транзакций */
  const statusOptions = [
    { label: 'Любой', value: undefined },
    { label: 'Списание', value: 'withdrawal' },
    { label: 'Пополнение', value: 'deposit' }
  ];

  const dispatch = useDispatch();

  /** очистка формы */
  const onClearForm = () => {
    setTransactionType(undefined);
    setSummFrom(undefined);
    setSummTo(undefined);
    setCreateFrom(undefined);
    setCreateTo(undefined);
    setComment('');
  };

  /** обработка нажания на кнопку Фильтровать */
  const onFilter = async () => {
    const filterParams: any = {
      id,
      type: transactionType?.value,
      'amount[from]': summFrom && priceToNumber(summFrom) * 100,
      'amount[to]': summTo && priceToNumber(summTo) * 100,
      'createdAt[from]': createFrom && dateFormat(createFrom, 'yyyy-MM-dd'),
      'createdAt[to]': createTo && dateFormat(createTo, 'yyyy-MM-dd')
    };
    if (comment) {
      filterParams.comment = comment;
    }
    dispatch(getTransactionsHistory(filterParams));
  };

  return (
    <div className="dropdown-menu group" style={{ marginBottom: 15 }}>
      <Dropdown
        width="300px"
        widthRestrict
        trigger={<Button icon={<Icons.IconSearch fill="currentColor" />}>Фильтрация</Button>}
      >
        <div className="document-dropdown-wrapper">
          <div className="dropdown-header">
            <span>Фильтрация списка транзакций</span>
          </div>
          <div>
            <Select
              value={transactionType}
              label="Тип транзакции"
              name="status"
              options={statusOptions}
              onChange={(e: HTMLSelectElement) => setTransactionType(e)}
              placeholder=""
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Input
                label="Сумма от"
                name="summFrom"
                onChange={e => setSummFrom(e.target.value.replace(/[a-zа-яё]/gi, ''))}
                value={summFrom || '0.00'}
                onBlur={e => setSummFrom(stringToPrice(e.target.value))}
                width={134}
              />
              <Input
                label="до"
                name="summTo"
                onChange={e => setSummTo(e.target.value.replace(/[a-zа-яё]/gi, ''))}
                value={summTo || '0.00'}
                onBlur={e => setSummTo(stringToPrice(e.target.value))}
                width={134}
              />
            </div>
            <Group>
              <DatePicker
                selectsStart
                name="from"
                label="Дата с"
                value={createFrom}
                startDate={createFrom}
                endDate={createTo}
                placeholderText="Формат: ДД.ММ.ГГГГ"
                onChange={e => setCreateFrom(e)}
              />
              <DatePicker
                selectsEnd
                name="to"
                label="по"
                value={createTo}
                startDate={createFrom}
                endDate={createTo}
                minDate={createFrom}
                placeholderText="Формат: ДД.ММ.ГГГГ"
                onChange={e => setCreateTo(e)}
              />
            </Group>
            <Textarea
              onChange={(e: any) => setComment(e.target.value)}
              label="Комментарий"
              value={comment}
            />
          </div>
          <div className="document-dropdown-buttons">
            <Button
              icon={<Icons.IconClose fill="currentColor" />}
              fullWidth
              onClick={onClearForm}
              style={{ marginBottom: 5 }}
            >
              Очистить
            </Button>
            <Button
              icon={<Icons.IconSearch fill="currentColor" />}
              kind={ButtonKinds.Secondary}
              fullWidth
              onClick={onFilter}
            >
              Фильтровать
            </Button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
