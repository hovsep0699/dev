import styled from 'styled-components';

export const HTMLRequerid = styled.span`
  color: red;
  position: absolute;
  padding-left: 2px;
  top: 15px;
  left: -12px;
`;

export const HTMLLabel = styled.div`
  position: relative;
  width: 100%;
  min-width: 330px;
  max-width: 330px;
  max-height: 60px;
  padding-right: 5px;
  display: inline-flex;
  align-items: flex-end;
`;

export const HTMLLabelName = styled.span<{ $required?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  max-height: 40px;

  &::after {
    content: ${({ $required }) => ($required ? '"*"' : '')};
    color: red;
    padding-left: 2px;
    line-height: 40px;
    max-height: 40px;
  }
`;

export const HTMLContent = styled.div<{ $width?: number; $align?: string }>`
  width: ${({ $width }) => ($width ? $width : '100%')};
  ${({ $align }) => ($align === 'center' ? 'display: flex; justify-content: center;' : '')}
`;

export const HTMLTitle = styled.div<any>`
  width: 100%;
  font-weight: 300;
  text-align: ${({ $align }) => $align};
  color: #212122;
  font-size: 20px;
  flex: 0 0 100%;
  line-height: 20px;
  padding: 8px 0;
  font-family: 'Roboto', 'Arial', 'Helvetica Neue';
  margin: 0;
`;
