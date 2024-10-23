import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FOLDERS } from '../../common/Lbl';
import { DOCUMENT_FOLDER } from '../../common/Url';
import { Folders } from './components/folders';
import { Dropdonw } from './components/dropdown';
import { selectFolders, selectFormLoading } from './store/selects';
import { HTMLContainer, HTMLHeader, HTMLBody, HTMLTitle } from './folder.style';
import { FormSubmitAction } from './helpers/folder.typings';
import {
  actionInit,
  actionClear,
  actionRequest,
  actionRemove,
  actionFormSubmit
} from './store/actions';

export interface IFolder {}

const Folder: React.FC<IFolder> = () => {
  const dispatch = useDispatch();

  const folders = useSelector(selectFolders);
  const formLoading = useSelector(selectFormLoading);

  React.useEffect(() => {
    dispatch(actionInit());
    dispatch(actionRequest());
    return () => {
      dispatch(actionClear());
    };
  }, [dispatch]);

  const handleOnSubmit = (values: FormSubmitAction) => {
    dispatch(actionFormSubmit(values));
  };

  const handleOnRemove = (id: string) => {
    dispatch(actionRemove({ id }));
  };

  return (
    <HTMLContainer>
      <HTMLHeader>
        <HTMLTitle>{FOLDERS}</HTMLTitle>
        <Dropdonw isLoading={formLoading} onSubmit={handleOnSubmit} />
      </HTMLHeader>
      <HTMLBody>
        <Folders
          link={DOCUMENT_FOLDER}
          items={folders}
          isLoading={formLoading}
          onSubmit={handleOnSubmit}
          onRemove={handleOnRemove}
        />
      </HTMLBody>
    </HTMLContainer>
  );
};

export { Folder };
