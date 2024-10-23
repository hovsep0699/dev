import axios, { AxiosRequestConfig } from 'axios';
import DocumentsService from '@distate/core/dist/application/documents/common/DocumentsService';
import fileDownload from 'js-file-download';

import statusData from '../helpers/documents.status';
import { parseValue } from '../helpers/documnets.helpers';

type ResponseRow = {
  recordsTotal: number;
  rows: any;
};

type RequestSearch = {
  params?: {
    isArchival?: number | boolean | null;
    labels?: any[];
    contractor?: any;
    createdTo?: string;
    createdFrom?: string;
    documentType?: any;
    documentNumber?: string | number;
    packageStatus?: any;
    documentDateTo?: string;
    documentDateFrom?: string;
    [name: string]: any;
  };
  offset?: number;
  limit?: number;
  mode?: string;
};

const packageStatusData: any = statusData;

class DocumentsApi {
  config: AxiosRequestConfig = {
    method: 'get'
  };

  defaulFiltered: Record<string, any> = {
    inbox: { isArchival: 0, packageTypes: ['IN'] },
    outbox: { isArchival: 0, packageTypes: ['OUT'], documentStatuses: ['sent'] },
    archive: { isArchival: 1 },
    draft: {
      isArchival: 0,
      packageTypes: ['OUT'],
      documentStatuses: ['draft', 'signed']
    }
  };

  documentFlows: any = {
    ACT_423: ['act_423', 'roaming_act_423'],
    ACT: ['act', 'act_552', 'roaming_act_552', 'taxcomhub_act_552'],
    BILATERAL: ['bilateral', 'roaming_unformalized_bilateral', 'connector_unformalized_bilateral'],
    UNILATERAL: [
      'unilateral',
      'roaming_unformalized_unilateral',
      'connector_unformalized_unilateral'
    ],
    WAYBILL: ['waybill', 'waybill_551', 'roaming_waybill_551', 'taxcomhub_waybill_551'],
    INVOICE: ['invoice', 'invoice_utd_174', 'invoice_utd_14'],
    INVOICE_CORRECTION: [
      'invoice_correction',
      'invoice_correction_ucd_174',
      'invoice_correction_ucd_14'
    ],
    UTD: [
      'utd_174_invoice',
      'utd_14_invoice',
      'utd_174_invoice_and_waybill',
      'utd_14_invoice_and_waybill',
      'utd_waybill',
      'roaming_utd_174_invoice',
      'roaming_utd_14_invoice',
      'taxcomhub_utd_14_invoice',
      'roaming_utd_174_invoice_and_waybill',
      'roaming_utd_14_invoice_and_waybill',
      'taxcomhub_utd_14_invoice_and_waybill',
      'roaming_utd_waybill',
      'taxcomhub_utd_waybill',
      'connector_utd_invoice',
      'connector_utd_invoice_and_waybill',
      'connector_utd_waybill'
    ],
    UTD_INVOICE: [
      'utd_174_invoice',
      'utd_14_invoice',
      'roaming_utd_174_invoice',
      'roaming_utd_14_invoice',
      'taxcomhub_utd_14_invoice',
      'connector_utd_invoice'
    ],
    UTD_WAYBILL: [
      'utd_waybill',
      'roaming_utd_waybill',
      'taxcomhub_utd_waybill',
      'connector_utd_waybill'
    ],
    UTD_INVOICE_WAYBILL: [
      'utd_174_invoice_and_waybill',
      'utd_14_invoice_and_waybill',
      'roaming_utd_174_invoice_and_waybill',
      'roaming_utd_14_invoice_and_waybill',
      'taxcomhub_utd_14_invoice_and_waybill',
      'connector_utd_invoice_and_waybill'
    ],
    UCD: [
      'ucd_174_invoice',
      'ucd_14_invoice',
      'ucd_174_invoice_and_waybill',
      'ucd_14_invoice_and_waybill',
      'ucd_waybill',
      'roaming_ucd_174_invoice',
      'roaming_ucd_14_invoice',
      'taxcomhub_ucd_14_invoice',
      'roaming_ucd_174_invoice_and_waybill',
      'roaming_ucd_14_invoice_and_waybill',
      'taxcomhub_ucd_14_invoice_and_waybill',
      'roaming_ucd_waybill',
      'taxcomhub_ucd_waybill',
      'connector_ucd_invoice',
      'connector_ucd_invoice_and_waybill',
      'connector_ucd_waybill'
    ],
    UCD_INVOICE: [
      'ucd_174_invoice',
      'ucd_14_invoice',
      'roaming_ucd_174_invoice',
      'roaming_ucd_14_invoice',
      'taxcomhub_ucd_14_invoice',
      'connector_ucd_invoice'
    ],
    UCD_WAYBILL: [
      'ucd_waybill',
      'roaming_ucd_waybill',
      'connector_ucd_waybill',
      'taxcomhub_ucd_waybill'
    ],
    UCD_INVOICE_WAYBILL: [
      'ucd_174_invoice_and_waybill',
      'ucd_14_invoice_and_waybill',
      'roaming_ucd_174_invoice_and_waybill',
      'roaming_ucd_14_invoice_and_waybill',
      'taxcomhub_ucd_14_invoice_and_waybill',
      'connector_ucd_invoice_and_waybill'
    ]
  };

  reverseDate(date: string): string {
    console.log('date', date);
    if (/^[\d]{2}\.[\d]{2}\.[\d]{4}$/.test(date) === false) {
      return date;
    }
    console.log('date2', date);

    return date
      .split('.')
      .reverse()
      .join('-');
  }

  search = ({ params = {}, offset, limit, mode }: RequestSearch) => {
    const {
      labels,
      isArchival,
      createdTo,
      createdFrom,
      documentType,
      packageStatus,
      documentDateTo,
      documentDateFrom,
      contractor,
      documentNumber,
      externalType,
      network,
      externalOperator
    } = params;

    const defaultFilter = mode && mode in this.defaulFiltered ? this.defaulFiltered[mode] : {};
    const filter = { ...defaultFilter };

    if (isArchival && typeof isArchival === 'number') {
      filter['isArchival'] = isArchival;
    }

    if (labels) {
      filter['labels'] = labels;
    }

    /** тип контрагента */
    if (externalType) {
      filter['externalType'] = externalType.value;
    }

    if (network) {
      filter['network'] = network.value;
    }

    /** оператор */
    if (externalOperator) {
      filter['externalOperator'] = externalOperator;
    }

    /** контрагент, происходит определение ЮЛ или ФЛ и получение id */
    if (contractor) {
      let contractorKey = 'company_contractor';
      if (contractor?.value?.type === 'person' || contractor?.type === 'person') {
        contractorKey = 'person_contractor';
      }

      filter[contractorKey] = parseValue(contractor?.value?.id || contractor?.id);
    }

    if (documentNumber) {
      filter['documentNumber'] = documentNumber;
    }

    if (createdFrom) {
      filter['createdAt[from]'] = this.reverseDate(createdFrom);
    }

    if (createdTo) {
      filter['createdAt[to]'] = this.reverseDate(createdTo);
    }

    if (documentDateFrom) {
      filter['legalDate[from]'] = this.reverseDate(documentDateFrom);
    }

    if (documentDateTo) {
      filter['legalDate[to]'] = this.reverseDate(documentDateTo);
    }

    if (documentType) {
      filter['documentFlows'] = this.documentFlows.hasOwnProperty(documentType.value)
        ? this.documentFlows[documentType.value]
        : [documentType.value];
    }

    if (
      mode &&
      packageStatus &&
      packageStatusData[mode] &&
      packageStatusData[mode][packageStatus.value]
    ) {
      let key = statusData.code;
      const status = packageStatusData[mode][packageStatus.value];
      if (Array.isArray(status)) {
        filter[key] = status;
      } else {
        key = status.code;
        filter[key] = status.status;
      }
    } else if (['archive', 'folder'].includes(mode || '') && packageStatus) {
      let key = statusData.code;
      const statusHash = { ...packageStatusData.inbox, ...packageStatusData.outbox };
      const status = statusHash[packageStatus];
      if (Array.isArray(status)) {
        filter[key] = status;
      } else {
        key = status.code;
        filter[key] = status.status;
      }
    }

    return DocumentsService.search(filter, offset, limit).then(
      ({ recordsTotal, rows }: ResponseRow): ResponseRow => {
        return {
          recordsTotal,
          rows: rows.map((item: any) => {
            const docNum = item.document_number ? ` № ${item.document_number}` : '';
            const docDate = item.legal_date ? ` от ${item.legal_date.split(' ')[0]}` : '';
            const docName = DocumentsService.getTitle(
              item.package_flow_system_name,
              item.document_type_title
            );

            const docTitle = [docName, docNum, docDate].filter(Boolean).join(' ');
            const fromPersonName = [
              item.from_person_name,
              item.from_person_patronymic,
              item.from_person_surname
            ]
              .filter(Boolean)
              .join(' ');

            const toPersonName = [
              item.to_person_name,
              item.to_person_patronymic,
              item.to_person_surname
            ]
              .filter(Boolean)
              .join(' ');

            return {
              id: item.document_id,
              packageId: item.package_id,
              packageType: item.package_type,
              packageState: item.package_state_system_name,
              fromCompanyName: item.from_company_name,
              toCompanyName: item.to_company_name,
              fromPersonName,
              toPersonName,
              documentTitle: docTitle,
              documentTypeSystemName: item.document_type_system_name,
              flowType: item.package_flow_system_name,
              flowGroup: item.package_flow_group,
              status: item.document_status_system_name,
              date: item.created_at,
              isSavedCorrectly: item.is_correct,
              isRead: item.is_read,
              containerID: item.container_id,
              containerSize: item.container_size,
              labels: item.labels,
              checked: false,
              uvutochExist: !!item.uvutoch_exist,
              fromCompanyExternalOperator: item.from_company_external_operator,
              fromCompanyExternalType: item.from_company_external_type,
              fromCompanyNetwork: item.from_company_network,
              toCompanyExternalOperator: item.to_company_external_operator,
              toCompanyExternalType: item.to_company_external_type,
              toCompanyNetwork: item.to_company_network
            };
          })
        };
      }
    );
  };

  delete(ids: string[]) {
    const promises: any[] = [];

    ids.forEach(id => {
      promises.push(DocumentsService.delete(id));
    });

    return Promise.all(promises);
  }

  archive(ids: string[]) {
    return DocumentsService.archive(ids);
  }

  signDocument = (documents: any[]) => {
    return DocumentsService.signAndSendDocuments(documents);
  };

  signContainer = (documents: any[]) => {
    return DocumentsService.signAndSendContainer(documents);
  };

  download = async (ids: string[]) => {
    const params = ids.map(id => `ids[]=${id}`).join('&');
    const url = ['/front/document_package/download', params].join('?');

    const res = await axios.get(url, { responseType: 'blob' });
    const data = res?.data;
    if (!data) {
      throw new Error('Возникла ошибка при попыптке скачать.');
    }

    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = `0${date.getMonth()}`.slice(-2);

    const name = ['Выгрузка', year, month, day].join('-') + '.zip';

    fileDownload(new Blob([data]), name);

    return res;
  };
}

const DocumentsApiServices = new DocumentsApi();
export { DocumentsApiServices };
