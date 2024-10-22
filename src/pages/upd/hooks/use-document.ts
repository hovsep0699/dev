import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import set from 'lodash.set';
import Core from '@distate/core/dist/application/Core';
import UPDService from '@distate/core/dist/application/documents/upd/UPDService';
import Environment from '@distate/core/dist/application/Environment';
import AutocompleteService from '@distate/core/dist/application/autocomplete/AutocompleteService';

import { CREATE_UPD, EDIT_UPD } from '../../../common/Lbl';
import { schema, uischema } from '../helpers/schema.universal-invoice';
import { parseDTODocumentToDocument } from '../helpers/parse.universal-document';
import { defaultData, ItemData } from '../../../common/TableUniversalInvoice';

const formSchema: Record<string, any> = schema;
const formUISchema: Record<string, any> = uischema;

const generateDefaultFormData = () => {
  const companyINN = Core.company?.inn?.value ? `, ИНН: ${Core.company?.inn?.value}` : '';
  const companyKPP = Core.company?.kpp?.value ? `, КПП: ${Core.company?.kpp?.value}` : '';
  const economicSubjectName = `${Core.company?.name}${companyINN}${companyKPP}`;

  return {
    force: false,
    economicSubjectName
  };
};

const loadDivisions = async (): Promise<any> => {
  const { rows }: any = await Environment.getCompanyGateway().getDivisions({});
  const divisions = rows.map(({ id, title }: any) => ({ id, title }));

  divisions.forEach((item: any) => {
    if (item.id === Core.company.mainDepartment.id) {
      divisions.splice(divisions.indexOf(item), 1);
      divisions.splice(0, 0, item);
    }
  });

  return { divisions, division: divisions[0] };
};

const loadAutcomplete = async (): Promise<Record<string, any>> => {
  const participants = await AutocompleteService.participant.request();
  const participant = participants.rows.reduce(
    (prev: any, { id, name }: any) => {
      prev.enum.push(id);
      prev.enumNames.push(name);
      return prev;
    },
    { type: 'string', enum: [], enumNames: [] }
  );

  return { participant };
};

const autcompleteUpdateSchema = (data: Record<string, any>) => {
  const { participant } = data;
  if (participant) {
    set(formSchema, 'definitions.company.properties.participant', participant);
  }
};

/**
 * Хук формирования форм схемы и первычных данных документа
 */
export const useDocument = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>(generateDefaultFormData());
  const [tableData, setTableData] = useState<ItemData>(defaultData);

  useEffect(() => {
    const request = async () => {
      setIsLoading(true);

      if (id) {
        const document = await UPDService.get(id).then(parseDTODocumentToDocument);
        setFormData(document);
      } else {
        await loadAutcomplete().then(autcompleteUpdateSchema);

        const { division } = await loadDivisions();
        set(formData, 'from.division', { value: division.id, label: division.title });

        setFormData({ ...formData });
      }

      setIsLoading(false);
    };

    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const title = id ? EDIT_UPD : CREATE_UPD;
  return {
    schema: formSchema,
    uischema: formUISchema,
    title,
    formData,
    isLoading,
    tableData,
    setFormData,
    setTableData
  };
};
