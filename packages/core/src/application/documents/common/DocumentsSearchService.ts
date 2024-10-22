import Environment from '../../Environment';

type DateType = {
  from?: string;
  to?: string;
};

type SearchParamsType = {
  contractorId?: number;
  documentFlows?: string[];
  documentStatuses?: string[];
  packageTypes?: string[];
  createdAt?: DateType;
  legalDate?: DateType;
};
class DocumentsSearchService {
  private getQueryArray = (paramTitle?: string, params?: string[]) => {
    const result: any = {};
    if (paramTitle && params) {
      params.forEach((param, index) => {
        result[`${paramTitle}[${index}]`] = param;
      });
    }
    return {};
  };
  private getDateObject = (dateTitle?: string, date?: DateType) => {
    const result: any = {};
    if (dateTitle && date) {
      if (date.from) result[`${dateTitle}[from]`] = date.from;
      if (date.from) result[`${dateTitle}[to]`] = date.to;
    }
    return {};
  };
  private getSearchParamsObject = (params: SearchParamsType) => {
    const packageTypesObj = this.getQueryArray('packageTypes', params.packageTypes);
    const documentFlowsObj = this.getQueryArray('documentFlows', params.documentFlows);
    const documentStatusesObj = this.getQueryArray('documentStatuses', params.documentStatuses);
    const createdAtObj = this.getDateObject('createdAt', params.createdAt);
    const legalDateObj = this.getDateObject('legalDate', params.legalDate);
    const result: any = {
      ...packageTypesObj,
      ...documentFlowsObj,
      ...documentStatusesObj,
      ...createdAtObj,
      ...legalDateObj
    };
    if (params.contractorId) result['contractor'] = params.contractorId;
    return result;
  };

  searchInboxDocuments = async (
    contractorId?: number,
    documentFlows?: string[],
    documentStatuses?: string[],
    createdAt?: DateType,
    legalDate?: DateType,
    offset?: number,
    limit?: number
  ) => {
    const noSearchParams = [
      contractorId,
      documentFlows,
      documentStatuses,
      createdAt,
      legalDate
    ].every(param => typeof param === undefined);

    if (noSearchParams) return Promise.reject(new Error('Empty params'));

    const searchParams = this.getSearchParamsObject({
      packageTypes: ['IN'],
      contractorId,
      documentFlows,
      documentStatuses,
      createdAt,
      legalDate
    });
    return Environment.getDocumentsGateway().search(searchParams, offset, limit);
  };

  searchOutboxDocuments = async (
    contractorId?: number,
    documentFlows?: string[],
    documentStatuses?: string[],
    createdAt?: DateType,
    legalDate?: DateType,
    offset?: number,
    limit?: number
  ) => {
    const noSearchParams = [
      contractorId,
      documentFlows,
      documentStatuses,
      createdAt,
      legalDate
    ].every(param => typeof param === undefined);

    if (noSearchParams) return Promise.reject(new Error('Empty params'));

    const searchParams = this.getSearchParamsObject({
      packageTypes: ['OUT'],
      contractorId,
      documentFlows,
      documentStatuses,
      createdAt,
      legalDate
    });
    return Environment.getDocumentsGateway().search(searchParams, offset, limit);
  };
}

const instance = new DocumentsSearchService();
export default instance;
