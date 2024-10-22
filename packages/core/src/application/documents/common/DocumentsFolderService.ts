import Environment from '../../Environment';

class DocumentsFolderService {
  get() {
    return Environment.getFolderGateway().get();
  }

  create(title: string) {
    return Environment.getFolderGateway().create(title);
  }

  update(id: string, title: string) {
    return Environment.getFolderGateway().update(id, title);
  }

  delete(id: string) {
    return Environment.getFolderGateway().delete(id);
  }

  attachDocuments(id: string, packageIds: string[]) {
    return Environment.getFolderGateway().attachDocuments(id, packageIds);
  }

  detachDocument(id: string, packageId: string) {
    return Environment.getFolderGateway().detachDocument(id, packageId);
  }
}

const instance = new DocumentsFolderService();
export default instance;
