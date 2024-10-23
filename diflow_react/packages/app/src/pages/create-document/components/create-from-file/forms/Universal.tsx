import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonKinds, Input, Select, Autocomplete } from '@distate/components';
import Core from '@distate/core/dist/application/Core';
import { dateFormat } from '@distate/components/dist/FormSchema';
import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';
import { documentFromFileGateway } from '@distate/core/dist/application/create-document/DocumentFromFileGateway';
import { createDocumentFromFile } from '../../../store/actions';
import { DatePickerNew } from '../../../../../common/date-picker-new';
import './style.css'
import { AutocompleteRecipient } from '../../common/AutocompleteRecipient';


type Props = {
  id: string;
  title?: string;
  enableTitle: string;
};

/** Неформализованный документ */
export const Universal = (props: Props) => {
  const { id, title: formTitle, enableTitle } = props;
  const dispatch = useDispatch();

  const companyGateway = new CompanyGateway();

  const [number, setNumber] = useState<string>();
  const [date, setDate] = useState();
  const [title, setTitle] = useState<string>(enableTitle);
  /** получатель */
  const [recipient, setRecipient] = useState<any>();
  /** подразделение отправителя */
  const [sender, setSender] = useState<HTMLSelectElement>();
  /** опции селекта подразделений отправителя */
  const [senderOptions, setSenderOptions] = useState<any>();
  /** вид документа */
  const [flowType, setFlowType] = useState<HTMLSelectElement>();
  /** тип документа */
  const [documentType, setDocumentType] = useState<any>();
  /** id типа - передается если существует */
  const [customTypeId, setCustomTypeId] = useState<string>();
  /** title типа - передается если новый тип */
  const [customTypeTitle, setCustomTypeTitle] = useState<string>();

  const [numberError, setNumberError] = useState<boolean>();
  const [dateError, setDateError] = useState<boolean>();
  const [titleError, setTitleError] = useState<boolean>();
  const [senderError, setSenderError] = useState<boolean>();
  const [recipientError, setRecipientError] = useState<boolean>();
  const [flowTypeError, setFlowTypeError] = useState<boolean>();
  const [documentTypeError, setDocumentTypeError] = useState<boolean>();

  useEffect(() => {
    const getSender = async () => {
      const userId = Core.user?.employee?.id;
      const { rows = [] } = await companyGateway.getEmployeeDivision(userId, {
        isActive: 1
      });
      setSenderOptions(contractorDataToOptions(rows));
    };
    getSender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prepareTitle = enableTitle.substr(0, enableTitle.lastIndexOf('.')) || enableTitle;
    setTitle(prepareTitle);
  }, [enableTitle]);

  const flowTypeOptions = [
    { value: 'unformalized_unilateral', label: 'Односторонний неформализованный документ' },
    { value: 'unformalized_bilateral', label: 'Двусторонний неформализованный документ' }
  ];

  /** преобразование ответа сервера в массив для опций селекта контрагента */
  function contractorDataToOptions(data: any[]) {
    return data.map(item => {
      return {
        value: item.id,
        label: item.title
      };
    });
  }

  /** загрузка подходящих типов документа */
  const documentTypeLoad = async (title: string, callback: any) => {
    const res = await documentFromFileGateway.getDocumentType({ title });
    const { rows = [] } = res;

    const hasResult = rows.length > 0;
    /** если пустой результат - выводим введенное значение */
    callback(contractorDataToOptions(hasResult ? rows : [{ title, id: undefined }]));
  };

  /** изменение типа документа */
  const onChangeDocumentType = (e: any) => {
    setDocumentType(e);
    if (e.value) {
      setCustomTypeId(e.value);
      setCustomTypeTitle(undefined);
    } else {
      setCustomTypeTitle(e.label);
      setCustomTypeId(undefined);
    }
  };

  /** проверка валидации */
  const validation = () => {
    let isValid = true;

    if (!number) {
      setNumberError(true);
      isValid = false;
    } else {
      setNumberError(false);
    }

    if (!date) {
      setDateError(true);
      isValid = false;
    } else {
      setDateError(false);
    }

    if (!title) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (!sender) {
      setSenderError(true);
      isValid = false;
    } else {
      setSenderError(false);
    }

    if (!recipient) {
      setRecipientError(true);
      isValid = false;
    } else {
      setRecipientError(false);
    }

    if (!flowType) {
      setFlowTypeError(true);
      isValid = false;
    } else {
      setFlowTypeError(false);
    }

    if (!documentType) {
      setDocumentTypeError(true);
      isValid = false;
    } else {
      setDocumentTypeError(false);
    }

    return isValid;
  };

  /** создать документ */
  const onCreateDocument = () => {
    if (!validation()) {
      return false;
    }

    const formatedDate = date && dateFormat(date!, 'dd.MM.yyyy');
    const params = {
      from: { division: sender?.value },
      to: { division: recipient?.value },
      flowType: flowType?.value,
      unformalizedData: {
        date: formatedDate,
        title,
        number,
        customTypeId,
        customTypeTitle
      }
    };
    dispatch(createDocumentFromFile({ id, params }));
  };

  return (
    <div>
      <h2 className="header">{formTitle}</h2>
      <div className="two-columns-center">
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Номер</div>
          <div className="two-columns-center_value">
            <Input
              value={number}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
              width={400}
              error={numberError}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Дата</div>
          <div className="two-columns-center_value">
            <div style={{ width: 400 }}>
              <DatePickerNew
                onChange={e => setDate(e)}
                value={date}
                error={dateError}
              />
            </div>
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Заголовок</div>
          <div className="two-columns-center_value">
            {' '}
            <Input
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              width={400}
              error={titleError}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Подразделение отправителя</div>
          <div className="two-columns-center_value">
            <Select
              value={sender}
              options={senderOptions}
              onChange={(e: HTMLSelectElement) => setSender(e)}
              placeholder=""
              width={400}
              error={senderError}
              touched={senderError}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Получатель</div>
          <div className="two-columns-center_value" style={{ width: 400 }}>
            <AutocompleteRecipient
              setItem={setRecipient}
              item={recipient}
              error={recipientError}
              placeholder=""
              qParams={{ isActive: 1, type: 'division' }}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Вид документа</div>
          <div className="two-columns-center_value">
            <Select
              value={flowType}
              options={flowTypeOptions}
              onChange={(e: HTMLSelectElement) => setFlowType(e)}
              placeholder=""
              width={400}
              error={flowTypeError}
              touched={flowTypeError}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Тип документа</div>
          <div className="two-columns-center_value">
            <Autocomplete
              value={documentType}
              loadOptions={documentTypeLoad}
              onChange={onChangeDocumentType}
              placeholder=""
              width={400}
              error={documentTypeError}
            />
          </div>
        </div>
      </div>
      <Button kind={ButtonKinds.Orange} onClick={onCreateDocument}>
        Создать документ
      </Button>
    </div>
  );
};
