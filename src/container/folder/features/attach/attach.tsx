import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonFolder } from '../../components/button';
import { Folder } from '../../helpers/folder.typings';
import { selectFolders, selectAttachLoading } from '../../store/selects';
import { actionAddPackage } from '../../store/actions';

type Callback = { folder?: Folder; packageIds: string[] };

export interface IButtonAttachProps {
  packageIds: string[];
  callbackSuccess?: (data: Callback) => void;
  callbackFailure?: (data: Callback) => void;
}

const ButtonAttach: React.FC<IButtonAttachProps> = ({
  packageIds,
  callbackSuccess,
  callbackFailure
}) => {
  const dispatch = useDispatch();
  const folders: Folder[] = useSelector(selectFolders);
  const attachLoading = useSelector(selectAttachLoading);

  const handleOnClick = (folderId: string) => {
    const folder = folders.find(item => item.id === folderId);

    const callback = {
      success: () => {
        if (callbackSuccess) callbackSuccess({ folder, packageIds });
      },
      failure: () => {
        if (callbackFailure) callbackFailure({ folder, packageIds });
      }
    };

    dispatch(actionAddPackage({ folderId, packageIds, callback }));
  };

  return <ButtonFolder onClick={handleOnClick} folders={folders} loading={attachLoading} />;
};

export { ButtonAttach };
