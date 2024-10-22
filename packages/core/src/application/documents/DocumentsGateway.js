import AJAX from '../../infrastructure/AJAX';

class DocumentsGateway {
  /** создать новый неформализованный документ */
  createUnformalized(formData) {
    return AJAX.postFormData(`/front/document/unformalized/new`, formData);
  };

  /** Получить информацию о документе */
  getDocumentJson(id) {
    return AJAX.doGet(`/front/document/${id}/json`); 
  }

  /** редактировать нерформализованный документ */
  editUnformalized(id, formData) {
    return AJAX.postFormData(`/front/document/unformalized/${id}`, formData);
  }

}

export const documentsGateway = new DocumentsGateway();
