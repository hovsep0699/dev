import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../../../common/custom-table';
import {
  Input,
  DatePicker,
  Select,
  Autocomplete,
  Button,
  ButtonKinds,
  Icons
} from '@distate/components';
import { documentFromFileGateway } from '@distate/core/dist/application/create-document/DocumentFromFileGateway';
import {
  getUnformalizedDictonaries,
  setUnformalizedError,
  getDocumentJson,
  editUnformalized
} from '../../store/actions';
import { selectDivisionEmployee, selectErrors, selectDocumentJson } from '../../store/selectors';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AutocompleteRecipient } from '../common/AutocompleteRecipient';

type SelectItemType = {
  value: string | number;
  label: string;
};

export const EditUnformalized = ({ match }: { match: any }) => {
  const dispatch = useDispatch();

  const documentId = match?.params?.id;

  useEffect((): any => {
    documentId && dispatch(getDocumentJson(documentId));
    dispatch(getUnformalizedDictonaries());
    return () => {
      dispatch(setUnformalizedError({}));
    };
  }, [dispatch, documentId]);

  const divisionEmployeeRows = useSelector(selectDivisionEmployee);
  const errors = useSelector(selectErrors);
  const documentJson = useSelector(selectDocumentJson);

  useEffect(() => {
    if (!documentJson) return;

    setNumber(documentJson?.formData.number);
    setDate(new Date(documentJson?.formData.date));
    setTitle(documentJson?.formData.title);
    /** подразделение отправителя */
    setFromDivision({
      value: documentJson?.package?.from?.division?.id,
      label: documentJson?.package?.from?.division?.title
    });
    /** получатель */
    setToDivision({
      value: documentJson?.package?.to?.division?.id,
      label: getExtendedTitle(
        documentJson?.package?.to.company?.name,
        documentJson?.package?.to.company?.inn,
        documentJson?.package?.to.division?.kpp,
        documentJson?.package?.to.company?.ogrn,
        documentJson?.package?.to.division?.head
      )
    });
    /** вид документа */
    setFlow(documentJson?.package?.flow?.title);
    /** тип документа */
    setType({
      value: documentJson?.type?.id,
      label: documentJson?.type?.title
    });
    /** редактор текста */
    setConvertedText(documentJson?.formData?.wysiwyg?.text);
  }, [documentJson]);

  /** номер */
  const [number, setNumber] = useState<string>();
  /** дата */
  const [date, setDate] = useState<any>();
  /** заголовок */
  const [title, setTitle] = useState<string>();
  /** подразделение отправителя */
  const [fromDivision, setFromDivision] = useState<SelectItemType>();
  /** получатель */
  const [toDivision, setToDivision] = useState<any>();
  /** вид документа */
  const [flow, setFlow] = useState<string>();
  /** тип документа */
  const [type, setType] = useState<SelectItemType>();
  /** новый тип документа */
  const [newType, setNewType] = useState<string>();

  const [convertedText, setConvertedText] = useState('');

  const fromDivisionOptions = divisionEmployeeRows?.map(item => ({
    value: item.id,
    label: item.title
  }));

  /** дополнительные параметры к названию компании */
  function getExtendedTitle(
    title?: string,
    inn?: string,
    kpp?: string,
    ogrn?: string,
    head?: boolean
  ) {
    const prepareTitle = title && title;
    const prepareInn = inn && `ИНН: ${inn}`;
    const prepareKpp = kpp && `КПП: ${kpp}`;
    const prepareOgrn = ogrn && `ОГРН: ${ogrn}`;
    const prepareHead = head ? '(Основной офис)' : undefined;
    return [prepareTitle, prepareInn, prepareKpp, prepareOgrn, prepareHead]
      .filter(hasValue => hasValue)
      .join(', ');
  }

  function typeDataToOptions(data: any[]) {
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
    callback(typeDataToOptions(hasResult ? rows : [{ title, id: undefined }]));
  };

  /** изменение типа документа */
  const onChangeDocumentType = (e: any) => {
    if (e.value) {
      setType(e);
      setNewType(undefined);
    } else {
      setType(e);
      setNewType(e.label);
    }
  };

  const rows = [
    {
      title: 'Неформализованный документ',
      value: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Input
            label="Номер"
            placeholder="Номер"
            required
            value={number}
            onChange={e => setNumber(e.target.value)}
            width={190}
            error={errors?.number}
            errors={errors?.number}
          />
          <div style={{ width: 160 }}>
            {date && (
              <DatePicker
                label="Дата"
                placeholder="Дата"
                required
                onChange={e => setDate(e)}
                value={date}
                error={errors?.date}
              />
            )}
          </div>
        </div>
      ),
      required: true
    },
    {
      title: 'Заголовок',
      value: (
        <Input
          placeholder="Введите заголовок"
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={errors?.title}
          errors={errors?.title}
        />
      ),
      required: true
    },
    {
      title: 'Подразделение отправителя',
      value: (
        <Select
          value={fromDivision}
          options={fromDivisionOptions}
          onChange={(e: SelectItemType) => setFromDivision(e)}
        />
      ),
      required: true
    },
    {
      title: 'Получатель',
      value: (
        <AutocompleteRecipient
          setItem={setToDivision}
          item={toDivision}
          error={errors?.to}
          errors={errors?.to}
          placeholder="Введите получателя"
          qParams={{ isActive: 1, type: 'division' }}
        />
      ),
      required: true
    },
    {
      title: 'Вид документа',
      value: flow
    },
    {
      title: 'Тип документа',
      value: (
        <Autocomplete
          value={type}
          loadOptions={documentTypeLoad}
          onChange={onChangeDocumentType}
          placeholder="Выберите тип"
          required
          error={errors?.type}
          errors={errors?.type}
        />
      ),
      required: true,
      info:
        'Выберите тип документа из выпадающего списка или оставьте свой ' +
        'вариант, если хотите создать новый тип документа.'
    }
  ];

  const onSave = () => {
    const formData = new FormData();
    const preparedDate = new Date(date!).getTime() / 1000;

    title && formData.append('title', title);
    number && formData.append('number', number);
    date && formData.append('date', preparedDate?.toString());
    toDivision && formData.append('to[division]', toDivision?.value?.toString());
    fromDivision && formData.append('from[division]', fromDivision?.value?.toString());

    formData.append('flow', documentJson?.formData?.flow.toString());

    if (newType) {
      formData.append('typeTitle', newType);
    } else {
      formData.append('type', type!?.value?.toString());
    }

    documentJson?.formData?.wysiwyg && formData.append('wysiwyg[text]', convertedText);
    documentJson?.formData?.wysiwyg && formData.append('wysiwyg[compiled]', convertedText);

    dispatch(editUnformalized({ documentId, formData }));
  };

  return (
    <div>
      <CustomTable rows={rows} />

      {documentJson?.formData?.wysiwyg && (
        <ReactQuill
          theme="snow"
          value={convertedText}
          onChange={setConvertedText}
          style={{ marginTop: '30px' }}
        />
      )}

      <div style={{ marginTop: '30px' }}>
        <Button
          kind={ButtonKinds.Orange}
          icon={<Icons.IconCheck fill="currentColor" />}
          onClick={onSave}
          style={{ marginRight: 10 }}
        >
          Сохранить
        </Button>
        <Button icon={<Icons.IconClose fill="currentColor" />} onClick={onSave}>
          Закрыть
        </Button>
      </div>
    </div>
  );
};
