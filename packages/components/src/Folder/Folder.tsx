import React from 'react';
import {
  StyledFolder,
  FolderName,
  ButtonsWrapper,
  StyledButton,
  FolderButtonWrapper
} from './Folder.styles';
import { IconPencil, IconClose } from '../icons';

export type FolderProps = {
  name: string;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleFolderClick?: () => void;
  dark?: boolean;
};

const Folder = ({ name, handleEdit, handleDelete, handleFolderClick, dark }: FolderProps) => {
  return (
    <StyledFolder dark={dark}>
      <FolderButtonWrapper>
        <StyledButton dark={dark} fullWidth solid onClick={handleFolderClick}>
          <FolderName>{name}</FolderName>
        </StyledButton>
      </FolderButtonWrapper>

      <ButtonsWrapper>
        <StyledButton solid icon={<IconPencil fill="currentColor" />} onClick={handleEdit} />
        <StyledButton solid icon={<IconClose fill="currentColor" />} onClick={handleDelete} />
      </ButtonsWrapper>
    </StyledFolder>
  );
};

export default Folder;
