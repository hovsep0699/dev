import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Icons } from '@distate/components';

import { Folder } from '../../helpers/folder.typings';
import {
  HTMLItem,
  HTMLLink,
  HTMLButton,
  HTMLItemTitle,
  HTMLItemTools,
  HTMLItemToolsItem
} from './folders.style';

export interface IFoldersItem {
  link: string;
  item: Folder;
  onEdit?: (id: string) => void;
  onClick?: (id: string) => void;
  onRemove?: (id: string) => void;
  children?: React.ReactNode;
}

export const FoldersItem: React.FC<IFoldersItem> = React.memo(
  ({ link, item: { id, title }, onEdit, onClick, onRemove, children }) => {
    const path = link.replace(':id', id);
    const match = useRouteMatch({ path });

    const handleOnClick = () => {
      if (onClick) onClick(id);
    };

    const handleOnEdit = () => {
      if (onEdit) onEdit(id);
    };

    const handleOnRemove = () => {
      if (onRemove) onRemove(id);
    };

    return (
      <HTMLItem $active={!!match}>
        <HTMLLink to={path} exact>
          <HTMLItemTitle onClick={handleOnClick}>{title}</HTMLItemTitle>
        </HTMLLink>
        <HTMLItemTools>
          <HTMLItemToolsItem>
            <HTMLButton solid icon={<Icons.IconPencil />} onClick={handleOnEdit} />
          </HTMLItemToolsItem>
          <HTMLItemToolsItem>
            <HTMLButton solid icon={<Icons.IconClose />} onClick={handleOnRemove} />
          </HTMLItemToolsItem>
        </HTMLItemTools>
        {children}
      </HTMLItem>
    );
  }
);
