import React from 'react';
import { Icons, Dropdown, Button, Loading, Placement } from '@distate/components';

import { Folder } from '../../helpers/folder.typings';
import { HTMLTags, HTMLTag } from './folder-solid.style';
import { FOLDERS } from '../../../../common/Lbl';

export interface IButtonSolidProps {
  onRemoveClick: (id: string, callback?: () => void) => void;
  loading: boolean;
  folders: Folder[];
}

const ButtonSolid: React.FC<IButtonSolidProps> = React.memo(
  ({ folders, onRemoveClick, loading }) => {
    const renderFoldres = (close: () => void) => {
      if (loading) {
        return <Loading isRelative={false} />;
      }

      if (!folders.length) {
        return <p>Этот документ не лежит ни в одной из папок</p>;
      }

      return folders.map(({ id, title }) => (
        <HTMLTag key={id} handleRemove={() => onRemoveClick(id, close)}>
          {title}
        </HTMLTag>
      ));
    };

    return (
      <Dropdown placement={Placement.LEFT_TOP} trigger={<Button solid icon={<Icons.IconTag />} />}>
        {(close: () => void) => (
          <HTMLTags>
            <Dropdown.Header>{FOLDERS}</Dropdown.Header>
            {renderFoldres(close)}
          </HTMLTags>
        )}
      </Dropdown>
    );
  }
);

export { ButtonSolid };
