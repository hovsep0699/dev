import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../../../common/custom-table';
import { Input, Select, Autocomplete, Button, ButtonKinds, Icons } from '@distate/components';
import { documentFromFileGateway } from '@distate/core/dist/application/create-document/DocumentFromFileGateway';
import {
  getUnformalizedDictonaries,
  createUnformalized,
  setUnformalizedError
} from '../../store/actions';
import { selectDivisionEmployee, selectFlow, selectErrors } from '../../store/selectors';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DatePickerNew } from '../../../../common/date-picker-new';
import { AutocompleteRecipient } from '../common/AutocompleteRecipient';

type SelectItemType = {
  value: string | number;
  label: string;
};

export const CreateUnformalized = () => {
  const dispatch = useDispatch();

  useEffect((): any => {
    dispatch(getUnformalizedDictonaries());
    return () => {
      dispatch(setUnformalizedError({}));
    };
  }, [dispatch]);

  const divisionEmployeeRows = useSelector(selectDivisionEmployee);
  const flowRows = useSelector(selectFlow);
  const errors = useSelector(selectErrors);

  const uploadFileRef = useRef<any>(null);

  /** номер */
  const [number, setNumber] = useState<string>();
  /** дата */
  const [date, setDate] = useState();
  /** заголовок */
  const [title, setTitle] = useState<string>();
  /** подразделение отправителя */
  const [fromDivision, setFromDivision] = useState<SelectItemType>();
  /** получатель */
  const [toDivision, setToDivision] = useState<any>();
  /** вид документа */
  const [flow, setFlow] = useState<SelectItemType>();
  /** тип документа */
  const [type, setType] = useState<HTMLSelectElement>();
  /** новый тип документа */
  const [newType, setNewType] = useState<string>();
  /** файл */
  const [file, setFile] = useState<File>();
  /** флаг создания документа */
  const [isCreating, setIsCreating] = useState(false);

  const fromDivisionOptions = divisionEmployeeRows?.map(item => ({
    value: item.id,
    label: item.title
  }));

  const flowRowsOptions = flowRows?.map(item => ({
    value: item.id,
    label: item.title
  }));

  useEffect(() => {
    if (!title && file?.name) {
      const fileName = file?.name;
      const prepareTitle = fileName.substr(0, fileName.lastIndexOf('.')) || fileName;
      setTitle(prepareTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  /** подразделение отправителя по умолчанию */
  useEffect(() => {
    const headDivision = divisionEmployeeRows?.find(index => index.head);
    headDivision &&
      setFromDivision({
        value: headDivision.id.toString(),
        label: headDivision.title
      });
  }, [divisionEmployeeRows]);

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
            <DatePickerNew
              label="Дата"
              required
              onChange={e => setDate(e)}
              placeholder="Дата"
              value={date}
              error={errors?.date}
              errors={errors?.date}
            />
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
      value: (
        <Select
          value={flow}
          onChange={(e: SelectItemType) => setFlow(e)}
          options={flowRowsOptions}
          error={errors?.flow}
          errors={errors?.flow}
          placeholder="Выберите вид документа"
          touched={errors?.flow}
        />
      ),
      required: true
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
    },
    {
      id: 'buttons',
      value: (
        <div>
          <input
            type="file"
            ref={uploadFileRef}
            hidden
            onChange={(e: any) => setFile(e.target?.files[0])}
          />

          {file ? (
            <>
              <Button
                kind={ButtonKinds.LightGreen}
                icon={<Icons.IconDownload fill="currentColor" />}
                onClick={onDownloadFile}
              >
                Загрузить другой файл
              </Button>
              <Button
                kind={ButtonKinds.Danger}
                icon={<Icons.IconClose fill="currentColor" />}
                onClick={() => {
                  if (uploadFileRef?.current) {
                    uploadFileRef.current.value = '';
                  }
                  setFile(undefined);
                }}
              >
                Отменить
              </Button>
              <div style={{ width: 340 }}>
                Загрузка файла «{file?.name}» начнется после нажатия кнопки «Сохранить»
              </div>
            </>
          ) : (
            <>
              {!isCreating && (
                <Button
                  kind={ButtonKinds.Secondary}
                  icon={<Icons.IconUpload fill="currentColor" />}
                  style={{ marginRight: 5 }}
                  onClick={onDownloadFile}
                >
                  Загрузить файл
                </Button>
              )}
              {isCreating && (
                <Button
                  kind={ButtonKinds.Secondary}
                  icon={<Icons.IconNa fill="currentColor" />}
                  onClick={() => {
                    setIsCreating(false);
                    setConvertedText('');
                  }}
                  style={{ marginRight: 5, width: 164 }}
                >
                  Отмена
                </Button>
              )}
              <Button
                kind={ButtonKinds.Secondary}
                icon={<Icons.IconPencilAlt fill="currentColor" />}
                onClick={() => setIsCreating(true)}
                disabled={isCreating}
              >
                Создать документ
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  function onDownloadFile() {
    uploadFileRef.current?.click();
  }

  const [convertedText, setConvertedText] = useState('');

  const onSend = () => {
    const formData = new FormData();
    const preparedDate = new Date(date!).getTime() / 1000;

    title && formData.append('title', title);
    number && formData.append('number', number);
    date && formData.append('date', preparedDate?.toString());
    toDivision && formData.append('to[division]', toDivision?.value?.toString());
    fromDivision && formData.append('from[division]', fromDivision?.value?.toString());
    flow && formData.append('flow', flow?.value?.toString());

    if (newType) {
      formData.append('typeTitle', newType);
    } else {
      formData.append('type', type!?.value?.toString());
    }

    if (isCreating) {
      formData.append('wysiwyg[text]', convertedText);
      formData.append('wysiwyg[compiled]', convertedText);
    } else {
      formData.append('document', file!);
    }

    dispatch(createUnformalized(formData));
  };

  return (
    <div>
      <CustomTable rows={rows} />

      {isCreating && (
        <ReactQuill
          theme="snow"
          value={convertedText}
          onChange={setConvertedText}
          style={{ marginBottom: 20 }}
        />
      )}

      <Button
        kind={ButtonKinds.Orange}
        icon={<Icons.IconCheck fill="currentColor" />}
        onClick={onSend}
      >
        Сохранить
      </Button>
    </div>
  );
};
