import AJAX from '../../../infrastructure/AJAX';

class UPDGateway {
  create(data) {
    return AJAX.postJSON('/front/document/universal_invoice/new', data);
  }

  edit(docId, data) {
    return AJAX.postJSON(`/front/document/universal_invoice/${docId}`, data);
  }

  get(id) {
    return AJAX.doGet(`/front/document/${id}/json`);
  }
}

export default UPDGateway;
