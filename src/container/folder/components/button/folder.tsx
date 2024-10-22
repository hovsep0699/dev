import React from 'react';
import { Button, Icons, ListString, Dropdown, Loading } from '@distate/components';

import { ADD_TO_FOLDER } from '../../../../common/Lbl';
import { Folder } from '../../helpers/folder.typings';
import { HTMLContext } from './folder.style';

export interface IButtonFolderProps {
  loading: boolean;
  onClick: (id: string) => void;
  folders: Folder[];
}

const ButtonFolder: React.FC<IButtonFolderProps> = ({ loading, onClick, folders }) => {
  const handleOnClick = (id: string) => {
    onClick(id);
  };

  return (
    <Dropdown width="272px" trigger={<Button icon={<Icons.IconTag />}>{ADD_TO_FOLDER}</Button>}>
      {loading && <Loading isRelative={false} />}
      <Dropdown.Header>{ADD_TO_FOLDER}</Dropdown.Header>
      <HTMLContext>
        <ListString items={folders} onClick={handleOnClick} />
      </HTMLContext>
    </Dropdown>
  );
};

export { ButtonFolder };
