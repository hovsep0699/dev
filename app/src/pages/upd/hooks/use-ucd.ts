import set from 'lodash.set';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import InvoiceService from '@distate/core/dist/application/documents/invoice/InvoiceService';

import {DOCUMENT_VIEW} from '../../../common/Url';
import {CREATE_UCD, EDIT_UCD} from '../../../common/Lbl';
import { parseLocationSearch } from '../../../utils/parseLocationSearch';
import { schemaUCD, uiSchemaUCD } from '../helpers/schema.ucd';

import {
  transformerDTOUCDForm,
  transformerDTOUCDTable,
  getPurposeSchema
} from '../helpers/transformers';

const formSchema: Record<string, any> = schemaUCD;
const formUISchema: Record<string, any> = uiSchemaUCD;

export const useUCD = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const { id: documentID } = parseLocationSearch(search);

  const [isLoading, setIsLoading] = useState(false);
  const [rawUCD, setRawUCD] = useState();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formTable, setFormTable] = useState<Record<string, any>>({});
  const [formTableDefault, setFormTableDefault] = useState<Record<string, any>>({});

  const customSetFormData = (data: Record<string, any>) =>
    setFormData(state => ({ ...state, ...data }));

  /**
   * Универсальный корректировочный документ
   * для форм схемы.
   */
  useEffect(() => {
    const requestId = documentID || id;
    if (!requestId) return;

    const onClickFactActivity = () => window.open(DOCUMENT_VIEW.replace(':id', String(requestId)));
    const request = async () => {
      try {
        setIsLoading(true);
        const UCD = await InvoiceService.get(requestId);
        const purpose = getPurposeSchema(UCD);
        const formData = transformerDTOUCDForm(UCD);
        const formTable = transformerDTOUCDTable(UCD);

        // кастомизируем форм схему динамическими значениями
        set(formSchema, 'properties.purpose', purpose);
        set(formUISchema, 'factActivity.onClick', onClickFactActivity);

        setRawUCD(UCD);
        setFormData(formData);
        setFormTable(formTable);

        // клонируем объект для избежания перезаписи вложенных объектов
        const formTableJson = JSON.stringify(formTable);
        setFormTableDefault(JSON.parse(formTableJson));
      } finally {
        setIsLoading(false);
      }
    };

    request();
  }, [id, documentID]);
  const title = id ? EDIT_UCD : CREATE_UCD;
  return {
    rawUCD,
    id,
    title,
    isLoading,
    schema: formSchema,
    uischema: formUISchema,
    formData,
    formTable,
    formTableDefault,
    setFormTable,
    setFormData: customSetFormData,
    setIsLoading
  };
};
