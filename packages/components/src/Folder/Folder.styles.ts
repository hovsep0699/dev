import styled from 'styled-components';
import Button from '../Button';
import { FolderProps } from './Folder';

type StyledFolderProps = Pick<FolderProps, 'dark'>;

export const FolderName = styled.span`
  display: block;
  flex: 1 1 auto;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 16px;
  color: #212122;
  text-align: left;
`;

export const StyledButton = styled(Button)<StyledFolderProps>`
  color: transparent;
  height: ${({ theme }) => theme.main.sizes.lineHeight.default};
  min-width: ${({ theme }) => theme.main.sizes.lineHeight.default};
  line-height: ${({ theme }) => theme.main.sizes.lineHeight.default};

  &:active {
    background-color: ${({ theme, dark }) => dark && theme.main.color.darkBold};
  }
`;

export const FolderButtonWrapper = styled.div`
  flex: 1 1 0%;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-self: flex-end;
`;

export const StyledFolder = styled.div<StyledFolderProps>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${FolderName} {
    color: ${({ dark }) => dark && '#fdfdfd'};
  }

  &:hover {
    background-color: ${({ dark }) => (dark ? '#373738' : '#12a6e8')};

    ${FolderName}, ${StyledButton} {
      color: #fdfdfd;
    }
  }
`;
