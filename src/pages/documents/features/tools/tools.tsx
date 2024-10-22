import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonAttach } from '../../../../container/folder/features/attach';

import {
  actionDocumentDownloadRequest,
  actionSignContainer,
  actionSign,
  actionDelete,
  actionArchive,
  actionDocumentAttachFolder,
  actionDocumentRequest
} from '../../store/actions';
import {
  selectTools,
  selectLoading,
  selectDownload,
  selectSelected,
  selectArchive,
  selectDelete,
  selectIsSign,
  selectIsSignContainer
} from '../../store/selects';
import { HTMLSkelet, HTMLContainer, HTMLItem } from './tools.style';
import {
  ButtonDelete,
  ButtonUpdate,
  ButtonArchive,
  ButtonDownload,
  ButtonSignContainer,
  ButtonSignDocument
} from '../../components/buttons';
import { NewFilter } from '../new-filter/NewFilter';

export interface IToolsProps {
  fixed?: boolean;
}

const Tools = React.forwardRef<any, IToolsProps>(({ fixed }, ref) => {
  const dispatch = useDispatch();

  const selected = useSelector(selectSelected);
  const isLoading = useSelector(selectLoading);
  const isSign = useSelector(selectIsSign);
  const isDelete = useSelector(selectDelete);
  const isArchive = useSelector(selectArchive);
  const isDownload = useSelector(selectDownload);
  const isSignContainer = useSelector(selectIsSignContainer);

  const {
    isBtnSign,
    isBtnDelete,
    isBtnUpdate,
    isBtnFolder,
    isBtnArchive,
    isBtnDownload,
    isBtnSignContainer
  } = useSelector(selectTools);

  // Hendle
  const handleOnUpdate = () => {
    dispatch(actionDocumentRequest({}));
  };

  const handleOnArchive = () => {
    dispatch(actionArchive());
  };

  const handleOnDelete = () => {
    dispatch(actionDelete());
  };

  const handleOnDownload = () => {
    dispatch(actionDocumentDownloadRequest({}));
  };

  const handleOnSign = () => {
    dispatch(actionSign());
  };

  const handleOnSignContainer = () => {
    dispatch(actionSignContainer());
  };

  const handleOnAttache = (data: any) => {
    dispatch(actionDocumentAttachFolder(data));
  };
  // ----------------------------------------------

  return (
    <HTMLSkelet>
      <HTMLContainer ref={ref} className={fixed ? 'fixed' : ''}>
        <NewFilter />
        {isBtnUpdate && (
          <HTMLItem>
            <ButtonUpdate loading={isLoading} onClick={handleOnUpdate} />
          </HTMLItem>
        )}
        {isBtnDownload && (
          <HTMLItem>
            <ButtonDownload loading={isDownload} onClick={handleOnDownload} />
          </HTMLItem>
        )}
        {isBtnArchive && (
          <HTMLItem>
            <ButtonArchive loading={isArchive} onClick={handleOnArchive} />
          </HTMLItem>
        )}
        {isBtnFolder && (
          <HTMLItem>
            <ButtonAttach packageIds={selected} callbackSuccess={handleOnAttache} />
          </HTMLItem>
        )}
        {isBtnSign && (
          <HTMLItem>
            <ButtonSignDocument loading={isSign} onClick={handleOnSign} />
          </HTMLItem>
        )}
        {isBtnSignContainer && (
          <HTMLItem>
            <ButtonSignContainer loading={isSignContainer} onClick={handleOnSignContainer} />
          </HTMLItem>
        )}
        {isBtnDelete && (
          <HTMLItem>
            <ButtonDelete loading={isDelete} onClick={handleOnDelete} />
          </HTMLItem>
        )}
      </HTMLContainer>
    </HTMLSkelet>
  );
});

export { Tools };
