import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonSolid } from '../../components/button';
import { actionDetachPackage } from '../../store/actions';
import { selectDetachLoading } from '../../store/selects';

type Callback = { folderId: string; packageId: string };

export interface IButtonDetachProps {
  folders: any[];
  packageId: string;
  callbackSuccess?: (data: Callback) => void;
  callbackFailure?: (data: Callback) => void;
}

const ButtonDetach: React.FC<IButtonDetachProps> = ({
  packageId,
  folders,
  callbackSuccess,
  callbackFailure
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectDetachLoading);

  const handleOnRemove = (id: string, close?: () => void) => {
    const callback = {
      success: () => {
        if (callbackSuccess) callbackSuccess({ folderId: id, packageId });
      },
      failure: () => {
        if (callbackFailure) callbackFailure({ folderId: id, packageId });
      }
    };

    dispatch(actionDetachPackage({ folderId: id, packageId, callback }));
  };

  return <ButtonSolid loading={isLoading} folders={folders} onRemoveClick={handleOnRemove} />;
};

export { ButtonDetach };
