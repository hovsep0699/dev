import AJAX from '../../infrastructure/AJAX';
import DocumentsUrlMapper from '../documents/common/DocumentsUrlMapper';

class SignGateway {
  getReceiptsForSigning() {
    return AJAX.doGet('/front/document/for_signing');
  }

  getDocumentContent(docId) {
    return AJAX.doGet(`/front/document/${docId}/content`);
  }

  sendSign(docId, formData) {
    return AJAX.postFormData(`/front/document/${docId}/sign`, formData);
  }

  sendDocument(docId, flowType, flowGroup) {
    const url = DocumentsUrlMapper.getSendUrl(docId, flowType, flowGroup);
    return AJAX.doPost(url);
  }

  sendContainer(formData) {
    return AJAX.postFormData('/front/container/send', formData);
  }

  sendSecondSign(docId, formData) {
    return AJAX.postFormData(`/front/document/${docId}/sign/second`, formData);
  }
}

export default SignGateway;
