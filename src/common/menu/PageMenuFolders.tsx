import React from 'react';
import styled from 'styled-components';
import { Button, Icons } from '@distate/components';
import FoldersForm from '../folder/components/FoldersForm';
import FoldersDropdown from '../folder/components/FoldersDropdown';
import { FOLDERS, NEW_FOLDER } from '../Lbl';

const Wrapper = styled.div`
  padding-right: 16px;
  padding-left: 16px;
`;

const Title = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0 8px 16px;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 17px;
`;

const StyledFoldersDropdown = styled(FoldersDropdown)`
  > div {
    left: -16px;
  }
`;

type PageMenuFoldersProps = { children?: React.ReactNode };

const PageMenuFolders = ({ children }: PageMenuFoldersProps) => {
  if (React.Children.count(children) === 0) return null;

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{FOLDERS}</Title>
        <StyledFoldersDropdown
          formOpener={<Button solid icon={<Icons.IconPlus fill="#fff" />} />}
          title={NEW_FOLDER}
          width="213px"
        >
          <FoldersForm />
        </StyledFoldersDropdown>
      </TitleWrapper>
      {children}
    </Wrapper>
  );
};

export default PageMenuFolders;
