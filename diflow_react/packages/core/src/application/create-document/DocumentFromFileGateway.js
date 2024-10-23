import AJAX from '../../infrastructure/AJAX';

/**
 * Документ из файла
 */
class DocumentFromFileGateway {
  /** Загрузить файл документа */
  loadFile(file) {
    return AJAX.postFormData('/front/document/file/load', file);
  }

  /** Получить типы документов */
  getDocumentType(params) {
    return AJAX.doGet('/front/document/type/', params);
  }
  
  /** Создать документ из файла */
  createDocumentFromFile(id, params) {
    return AJAX.postJSON(`/front/document/file/${id}/create`, params);
  }

}

export const documentFromFileGateway = new DocumentFromFileGateway();
