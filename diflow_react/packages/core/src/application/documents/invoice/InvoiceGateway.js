import AJAX from '../../../infrastructure/AJAX';

class InvoiceGateway {
  get(id) {
    return AJAX.doGet(`/front/document/${id}/json`);
  }

  create(data) {
    return AJAX.postJSON('/front/document/invoice_utd/new', data);
  }

  createUKD(data) {
    return AJAX.postJSON('/front/document/universal_correction_document/new', data);
  }

  editUKD(id, data) {
    return AJAX.postJSON(`/front/document/universal_correction_document/${id}`, data)
  }

  edit(docId, data) {
    return AJAX.postJSON(`/front/document/invoice_utd/${docId}`, data);
  }
}

export default InvoiceGateway;
