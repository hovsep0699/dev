import React from 'react';
import { Dropdown, Loading } from '@distate/components';
import { useSelector } from 'react-redux';
import * as TYPE from '../types';

type FoldersDropdownProps = {
  formOpener: JSX.Element;
  title: string;
  foldersList?: React.ReactNode;
  width: string;
  className?: string;
  children: React.ReactNode;
};

function FoldersDropdown({
  formOpener,
  title,
  foldersList,
  width,
  className,
  children
}: FoldersDropdownProps) {
  const attachLoading = useSelector(
    ({ folderState }: { folderState: TYPE.FolderState }) => folderState.attachLoading
  );

  return (
    <Dropdown width={width} trigger={formOpener} className={className}>
      {attachLoading && <Loading isRelative={false} />}
      <Dropdown.Header>{title}</Dropdown.Header>
      {foldersList && (
        <>
          {foldersList}
          <hr />
        </>
      )}
      {children}
    </Dropdown>
  );
}

export default FoldersDropdown;
