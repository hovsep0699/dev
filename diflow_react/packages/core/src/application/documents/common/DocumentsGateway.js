import AJAX from '../../../infrastructure/AJAX';
import getFormData from '../../utils/getFormData';

class DocumentsGateway {
  getAll(offset = 0, limit = 10) {
    return AJAX.doGet('/front/document_package/', {
      sortField: 'created_at',
      sortType: 'desc',
      limit,
      offset
    });
  }

  getInbox(offset = 0, limit = 10) {
    return AJAX.doGet('/front/document_package/', {
      sortField: 'created_at',
      sortType: 'desc',
      'packageTypes[0]': 'IN',
      isArchival: 0,
      limit,
      offset
    });
  }

  getOutbox(offset = 0, limit = 10) {
    return AJAX.doGet('/front/document_package/', {
      sortField: 'created_at',
      sortType: 'desc',
      'packageTypes[0]': 'OUT',
      'documentStatuses[0]': 'sent',
      isArchival: 0,
      limit,
      offset
    });
  }

  getArchive(offset = 0, limit = 10) {
    return AJAX.doGet('/front/document_package/', {
      sortField: 'created_at',
      sortType: 'desc',
      isArchival: 1,
      limit,
      offset
    });
  }

  getDraft(offset = 0, limit = 10) {
    return AJAX.doGet('/front/document_package/', {
      sortField: 'created_at',
      sortType: 'desc',
      'packageTypes[0]': 'OUT',
      'documentStatuses[0]': 'draft',
      'documentStatuses[1]': 'signed',
      isArchival: 0,
      limit,
      offset
    });
  }

  archive(ids) {
    return AJAX.postFormData('/front/document_package/archive', getFormData(ids));
  }

  delete(id) {
    return AJAX.doDelete(`/front/document_package/${id}`);
  }

  search(params, offset = 0, limit = 10) {
    return AJAX.doGet('/front/document_package/', {
      sortField: 'created_at',
      sortType: 'desc',
      limit,
      offset,
      ...params
    });
  }

  getLabeled(labelId, offset = 0, limit = 10) {
    return AJAX.doGet('/front/document_package/', {
      sortField: 'created_at',
      sortType: 'desc',
      'labels[0]': labelId,
      limit,
      offset
    });
  }

}

export default DocumentsGateway;
