import React from 'react';
import { Folder, Modal, Button, ButtonKinds, Icons } from '@distate/components';
import changeIconFill from '../../../utils/changeIconFill';
import { DELETE, CANCEL } from '../../Lbl';
import { connect } from 'react-redux';
import * as TYPES from '../types';
import deleteFolder from '../actions/deleteFolder';
import attachDocuments from '../actions/attachDocuments';
import FoldersForm from './FoldersForm';
import { useDispatch } from 'react-redux';
import * as TYPE from '../types';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { DOCUMENT_FOLDER } from '../../Url';
import getLastUrSegment from '../../../utils/getLastUrSegment';

const StyledIconCheck = changeIconFill(Icons.IconCheck);
const StyledIconClose = changeIconFill(Icons.IconClose);

const mapStateToProps = ({ folderState }: { folderState: TYPE.FolderState }) => ({
  folders: folderState.folders
});

const mapDispatchToProps = {
  deleteFolder,
  attachDocuments
};

interface FoldersList extends RouteComponentProps {
  folders: any;
  dark?: boolean;
  deleteFolder: (id: string) => any;
  attachDocuments: (id: string, title: string, packageIds: string[]) => any;
  showHidden?: boolean;
  packageIds?: string[];
}

const FoldersList = ({
  folders,
  dark,
  deleteFolder,
  attachDocuments,
  showHidden = false,
  packageIds,
  history
}: FoldersList) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [docId, setDocId] = React.useState<number | null>(null);
  const dispatch = useDispatch();

  const setLocalState = (id: number) => {
    setDocId(id);
    setModalOpen(true);
  };

  const handleDelete = (id: number | null) => {
    if (id) deleteFolder(id.toString());
    setModalOpen(false);
    setDocId(null);
  };

  const handleEdit = (id: number) => {
    dispatch({
      type: TYPES.SET_EDIT_FOLDER,
      payload: { id }
    });
  };

  const handleFolderClick = (id: number, title: string, packageIds: string[] | undefined) => {
    if (packageIds !== undefined) {
      attachDocuments(id.toString(), title, packageIds);
    } else {
      const { url } = getLastUrSegment(DOCUMENT_FOLDER);
      history.push(`${url}/${id}`);
    }
  };

  return (
    <>
      {folders.map((f: TYPES.Folder) => (
        <React.Fragment key={f.id}>
          {(f.isVisible || showHidden) && (
            <>
              {!f.editing ? (
                <Folder
                  dark={dark}
                  name={f.title}
                  handleDelete={() => setLocalState(f.id)}
                  handleEdit={() => handleEdit(f.id)}
                  handleFolderClick={() => handleFolderClick(f.id, f.title, packageIds)}
                />
              ) : (
                <FoldersForm editFolderData={{ id: f.id, title: f.title }} dark={dark} />
              )}
            </>
          )}
        </React.Fragment>
      ))}

      <Modal hide={() => setModalOpen(false)} isVisible={isModalOpen}>
        <Modal.Header title={'Вы действительно хотите удалить эту папку?'} />
        <Modal.Footer>
          <Button
            icon={<StyledIconCheck />}
            kind={ButtonKinds.Primary}
            onClick={() => handleDelete(docId)}
          >
            {DELETE}
          </Button>
          <Button icon={<StyledIconClose />} onClick={() => setModalOpen(false)}>
            {CANCEL}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FoldersList));
