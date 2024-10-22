import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignService from '@distate/core/dist/application/sign/SignService';
import DocumentsService from '@distate/core/dist/application/documents/common/DocumentsService';

import { actionStartProcess, actionSignCurrent, actionInit, actionClear } from './store/actions';
import {
  selectStart,
  selectList,
  selectHasAutosigning,
  selectTotal,
  selectCurrent
} from './store/selects';
import { Loading, LoadingPage } from './components';

export interface ISignInit {}

export const SingInit: React.FC<ISignInit> = () => {
  const dispatch = useDispatch();

  const signList = useSelector(selectList) || [];
  const signTotal = useSelector(selectTotal);
  const signStart = useSelector(selectStart);
  const signCurrent = useSelector(selectCurrent);
  const signSelectHasAutosigning = useSelector(selectHasAutosigning);

  const [docTitle, setDocTitle] = React.useState('');

  const visible = !!signList.length;

  React.useEffect(() => {
    const handleSignProcessIteration = ({
      counter,
      documentToSign: { flow_group, type_title = '' }
    }: any) => {
      const flowTypeTitle = DocumentsService.getTitle(flow_group);
      const docTypeTitle = type_title ? ` - ${type_title}` : type_title;

      setDocTitle(`${flowTypeTitle}${docTypeTitle}`);
      dispatch(actionSignCurrent({ signCurrent: counter }));
    };

    dispatch(actionInit());
    SignService.events.subscribe('startSignProcessIteration', handleSignProcessIteration);

    return () => {
      dispatch(actionClear());
      SignService.events.unsubscribe('startSignProcessIteration', handleSignProcessIteration);
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (signSelectHasAutosigning === true && signList.length) {
      dispatch(actionStartProcess());
    }
  }, [dispatch, signList, signSelectHasAutosigning]);

  const handleOnClick = () => {
    if (!signStart) {
      dispatch(actionStartProcess());
      return;
    }

    // @ts-ignore
    SignService.events.notify('abortSigning');
  };

  if (typeof signSelectHasAutosigning === undefined || signSelectHasAutosigning === null) {
    return null;
  }

  return (
    <>
      <LoadingPage
        title={docTitle}
        total={signTotal}
        currentCount={signCurrent}
        loading={signStart}
        visible={signSelectHasAutosigning && visible}
      />
      <Loading
        title={docTitle}
        total={signTotal}
        currentCount={signCurrent}
        loading={signStart}
        visible={!signSelectHasAutosigning && visible}
        onClick={handleOnClick}
      />
    </>
  );
};
