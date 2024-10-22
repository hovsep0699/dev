import get from 'lodash.get';
import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InvoiceService from '@distate/core/dist/application/documents/invoice/InvoiceService';

import { Flash } from '../../../common/flash';
import { DOCUMENT_VIEW } from '../../../common/Url';
import { transformerUCDToDTO } from '../helpers/transformers';
import { transformerErrors } from '../../../utils/errors';
import { validateMessagesUCD } from '../helpers/transformers/ucd/validate.messages';
import { transformerDTOUCDError } from '../helpers/transformers/ucd/dto-to-ucd-error';

export const useUCDCreate = () => {
  const history = useHistory();
  const [createErrors, setCreateErrors] = useState<any>([]);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const timerError = useRef<any>();
  useEffect(() => () => timerError.current && clearTimeout(timerError.current), []);

  /**
   * Метод создания универсального коррекционного документа.
   * @param param object
   */
  const createUCD = async ({ UCD, formData, formTable, force }: Record<string, any>) => {
    try {
      setCreateErrors([]);
      setIsLoadingCreate(true);

      const requestUCD = transformerUCDToDTO(UCD, { formData, formTable, force: Boolean(force) });
      const fetchCreate = () => {
        return Boolean(UCD.formData)
          ? InvoiceService.editUKD(UCD.id, requestUCD)
          : InvoiceService.createUKD(requestUCD);
      };

      const res = await fetchCreate().then(({ data }) => data);
      if (res.id) {
        history.push(DOCUMENT_VIEW.replace(':id', res.id));
      } else {
        Flash.error('При создании документа возникла ошибка!');
      }
    } catch (rawError) {
      const documentErrors = get(rawError, 'jsError.response.data.messages.document');
      const documentErrorMsx = get(rawError, 'jsError.response.data.0');

      if (documentErrors) {
        const errors = transformerErrors(documentErrors, validateMessagesUCD);
        const lastError = [...errors].pop();
        Flash.error(lastError?.message || 'Возникла ошибка!');
        setCreateErrors(transformerDTOUCDError(documentErrors));
      } else if (documentErrorMsx) {
        Flash.error(documentErrorMsx);
      } else {
        Flash.error('При создании документа возникла ошибка!');
      }
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return { isLoadingCreate, createErrors, createUCD };
};
