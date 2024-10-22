import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SecurityService from '@distate/core/dist/application/security/SecurityService';

import Layout from '../../common/Layout';
import { DOCUMENTS } from '../../common/Lbl';
import { DOCUMENT_INBOX } from '../../common/Url';
import CommonTable from '../../common/table/Table';
import { selectFolders } from '../../container/folder/store/selects';

import {
  actionDocumentDownloadRequest,
  actionDocumentDetachFolder,
  actionDocumentNext,
  actionDocumentChecked
} from './store/actions';
import {
  selectList,
  selectLimit,
  selectIsNextLoading,
  selectDownload,
  selectOffset,
  selectIsNext,
  selectSelected,
  selectMode,
  selectLoading
} from './store/selects';
import { DocumentType, DocumentDetachAction } from './helpers/documents.typings';
import { routes } from './helpers/documents.routes';
import { getColumnts, getRowClass } from './helpers/documents.columns';
import { Tools } from './features/tools';
import { Table } from './components/table';

type DocumentsPageProps = {
  fetchFolders: () => void;
} & RouteComponentProps;

export const DocumentsPage: React.FC<DocumentsPageProps> = ({ location: { pathname } }) => {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const rows = useSelector(selectList);
  const limit = useSelector(selectLimit);
  const offset = useSelector(selectOffset);
  const selected = useSelector(selectSelected);
  const isNext = useSelector(selectIsNext);
  const isDownload = useSelector(selectDownload);
  const isNextLoading = useSelector(selectIsNextLoading);
  const folders = useSelector(selectFolders);
  const isLoading = useSelector(selectLoading);

  const [sticky, setSticky] = React.useState(false);

  const visible = React.useMemo(() => {
    return SecurityService.hasDocumentRole();
  }, []);

  React.useEffect(() => {
    const calculateSticky = () => {
      const { top } = document.body.getBoundingClientRect();
      const scrollTop = top * -1;

      if (!sticky && scrollTop >= 10) {
        setSticky(true);
      } else if (sticky && scrollTop < 10) {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', calculateSticky);
    window.addEventListener('resize', calculateSticky);

    return () => {
      window.removeEventListener('scroll', calculateSticky);
      window.removeEventListener('resize', calculateSticky);
    };
  });

  // Handle
  // -----------------------------------------------------------

  const onCheck = ({ packageId, checked }: DocumentType) => {
    const actionType = checked ? 'remove' : 'append';
    dispatch(actionDocumentChecked({ type: actionType, values: [packageId] }));
  };

  const onCheckAll = () => {
    dispatch(actionDocumentChecked({ type: 'checkedAll' }));
  };

  const onNextLoading = () => {
    if (!isNext) return;
    dispatch(actionDocumentNext());
  };

  const onDetachFolder = (data: DocumentDetachAction) => {
    dispatch(actionDocumentDetachFolder(data));
  };

  const onClickDownload = (ids?: string[]) => {
    dispatch(actionDocumentDownloadRequest({ ids }));
  };

  const columns = React.useMemo(() => {
    const isAllSelected = !!(rows.length && rows.length === selected.length);

    return getColumnts({
      rows,
      folders,
      pathname,
      isAllSelected,
      isDownload,
      onCheck,
      onCheckAll,
      onDetachFolder,
      onClickDownload
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, folders, isDownload]);

  // Render
  // -----------------------------------------------------------
  const renderBody = () => {
    if (!visible) {
      return <p>Недостаточно прав для отображения документов.</p>;
    }

    return (
      <>
        <Tools fixed={sticky} />
        <Table
          rows={rows}
          limit={limit}
          offset={offset}
          onMore={onNextLoading}
          columns={columns}
          classNameRow={getRowClass}
          hasMore={isNext}
          isLoading={isLoading}
          isNextLoading={isNextLoading}
          emptyTitle={'Список документов пуст.'}
        />
        <CommonTable />
      </>
    );
  };

  if (mode === 'redirect') {
    return <Redirect to={DOCUMENT_INBOX} />;
  }

  return (
    <Layout config={routes} pageMenuHeader={DOCUMENTS}>
      {renderBody()}
    </Layout>
  );
};
