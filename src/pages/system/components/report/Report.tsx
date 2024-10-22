import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '@distate/components/dist/FormSchema';
import { Button, ButtonKinds, Select, Group, DatePicker } from '@distate/components';
import { externalOperators } from '../../../contractors/store/selectors';
import { roamingDocumentsReport } from '../../store/selects';
import { getExternalOperators } from '../../../contractors/store/actions';
import { getRoamingDocumentsReport } from '../../store/actions';

enum Direction {
  IN = 'IN',
  OUT = 'OUT'
}

/** Система - Отчет */
export const Report = () => {
  const directionSelectOptions = [
    { value: Direction.IN, label: 'входящие' },
    { value: Direction.OUT, label: 'исходящие' }
  ];

  const report = useSelector(roamingDocumentsReport);
  const operators = useSelector(externalOperators)?.rows;
  const [operator, setOperator] = useState<HTMLSelectElement>();
  const [fromDate, setFromDate] = useState<any>(null);
  const [tillDate, setTillDate] = useState<any>(null);
  const [direction, setDirection] = useState<any>(directionSelectOptions[0]);

  const [operatorError, setOperatorError] = useState(false);
  const [fromDateError, setFromDateError] = useState(false);
  const [tillDateError, setTillDateError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExternalOperators());
  }, [dispatch]);

  /** вернет true если все валидно */
  const validate = (): boolean => {
    setOperatorError(!operator);
    setFromDateError(!fromDate);
    setTillDateError(!tillDate);
    return !!operator && !!fromDate && !!tillDate;
  };

  /** нажатие кнопки 'Сформировать' */
  const onForm = () => {
    validate() &&
      dispatch(
        getRoamingDocumentsReport({
          externalOperatorCode: operator?.value,
          fromDate: dateFormat(fromDate),
          tillDate: dateFormat(tillDate),
          direction: direction.value
        })
      );
  };

  return (
    <>
      <h3 className="header">Роуминговые документы</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 300, marginRight: 20 }}>
          <Select
            placeholder="Оператор"
            name="operator"
            options={operators?.map(item => ({ value: item.code, label: item.name }))}
            onChange={(e: HTMLSelectElement) => setOperator(e)}
            value={operator}
            error={operatorError}
            touched={!operator}
          />
        </div>
        <div style={{ minWidth: 140, marginRight: 20 }}>
          <Select
            placeholder="Направление"
            name="direction"
            options={directionSelectOptions}
            onChange={(e: HTMLSelectElement) => setDirection(e)}
            value={direction}
          />
        </div>
        <div style={{ marginRight: 10, minWidth: 300 }}>
          <Group>
            <DatePicker
              selectsStart
              name="from"
              placeholder="c"
              value={fromDate}
              startDate={fromDate}
              endDate={tillDate}
              placeholderText="Формат: ДД.ММ.ГГГГ"
              onChange={e => setFromDate(e)}
              error={fromDateError}
            />
            <DatePicker
              selectsEnd
              name="to"
              placeholder="по"
              value={tillDate}
              startDate={fromDate}
              endDate={tillDate}
              minDate={fromDate}
              placeholderText="Формат: ДД.ММ.ГГГГ"
              onChange={e => setTillDate(e)}
              error={tillDateError}
            />
          </Group>
        </div>
        <div style={{ width: 130 }}>
          <Button kind={ButtonKinds.Secondary} onClick={onForm}>
            Сформировать
          </Button>
        </div>
      </div>

      <table className="table" style={{ marginTop: 20 }}>
        <thead className="common-table-head">
          <tr>
            <td>Наименование</td>
            <td>количество</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Акт</td>
            <td>{report?.act}</td>
          </tr>
          <tr>
            <td>УКД КСЧФ</td>
            <td>{report?.ucdInvoice}</td>
          </tr>
          <tr>
            <td>УКД КСЧФДИС</td>
            <td>{report?.ucdInvoiceAndWaybill}</td>
          </tr>
          <tr>
            <td>УКД ДИС</td>
            <td>{report?.ucdWaybill}</td>
          </tr>
          <tr>
            <td>Неформализованный двухсторонний</td>
            <td>{report?.unformalizedBilateral}</td>
          </tr>
          <tr>
            <td>Неформализованный односторонний</td>
            <td>{report?.unformalizedInilateral}</td>
          </tr>
          <tr>
            <td>УПД СЧФ</td>
            <td>{report?.utdInvoice}</td>
          </tr>
          <tr>
            <td>УПДСЧФДОП</td>
            <td>{report?.utdInvoiceAndWaybill}</td>
          </tr>
          <tr>
            <td>УПД ДОП</td>
            <td>{report?.utdWaybill}</td>
          </tr>
          <tr>
            <td>Накладная</td>
            <td>{report?.waybill}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
