import DocumentsFolderService from '@distate/core/dist/application/documents/common/DocumentsFolderService';

class FolderApi {
  create({ title }: any) {
    return DocumentsFolderService.create(title);
  }

  update({ id, title }: any) {
    return DocumentsFolderService.update(id, title);
  }

  remove({ id }: any) {
    return DocumentsFolderService.delete(id);
  }

  attachDocuments({ folderId, packageIds }: any) {
    return DocumentsFolderService.attachDocuments(folderId, packageIds).then(() => true);
  }

  detachDocument({ folderId, packageId }: any) {
    return DocumentsFolderService.detachDocument(folderId, packageId).then(() => true);
  }

  getFolders() {
    return DocumentsFolderService.get().then(({ recordsTotal, rows }: any) => {
      return {
        total: recordsTotal,
        list: rows.map(({ id, title, is_shown_in_list }: any) => ({
          id: id.toString(),
          title,
          visible: is_shown_in_list
        }))
      };
    });
  }
}

const FolderApiServices = new FolderApi();
export { FolderApiServices };
