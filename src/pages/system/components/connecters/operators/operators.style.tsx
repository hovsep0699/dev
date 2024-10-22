import styled from 'styled-components';
import { CheckBox } from '@distate/components/dist/CheckBox';

export const HTMLList = styled.ul`
  margin: 22px 0 50px;
`;

export const HTMLCheckbox = styled(CheckBox)`
  position: absolute;
  top: 12px;
  left: 12px;
`;

export const HTMLListItem = styled.li<any>`
  margin: 22px 0;
  max-width: 680px;
  border: 1px solid #bebebe;
  border-color: ${({ $active }: any) => ($active ? 'green' : '#eeeeee')};
  border-radius: 6px;
  display: flex;
  align-items: center;
  min-height: 80px;
  padding-left: 40px;
  position: relative;
  transition: border-color 0.3s;

  &:hover {
    border-color: green;
  }
`;

export const HTMLListImage = styled.img`
  max-width: 100px;
  width: 100%;
  margin: 12px;
`;

export const HTMLListLabel = styled.span`
  margin: 12px;
  font-weight: bold;
`;
