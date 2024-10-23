import AJAX from '../../../infrastructure/AJAX';
import getFormData from '../../utils/getFormData';

class FolderGateway {
  private getFolderFormData(title: string) {
    const formData = new FormData();
    formData.append('title', title);
    return formData;
  }

  get() {
    return AJAX.doGet('/front/label');
  }

  create(title: string) {
    return AJAX.postFormData('/front/label', this.getFolderFormData(title));
  }

  update(id: string, title: string) {
    return AJAX.postFormData(`/front/label/${id}`, this.getFolderFormData(title));
  }

  delete(id: string) {
    return AJAX.doDelete(`/front/label/${id}`);
  }

  attachDocuments(id: string, packageIds: string[]) {
    return AJAX.postFormData(`/front/label/${id}/attach`, getFormData(packageIds, 'packageIds[]'));
  }

  detachDocument(id: string, packageId: string) {
    return AJAX.postFormData(`/front/label/${id}/detach`, getFormData([packageId], 'packageIds[]'));
  }
}

export default FolderGateway;
