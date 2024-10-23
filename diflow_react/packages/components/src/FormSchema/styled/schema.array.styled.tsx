import styled from 'styled-components';
import Button from '../../Button';

export const HTMLArray = styled.ol`
  margin: 0;
  padding: 0;
  counter-reset: inst;
`;

export const HTMLArrayItem = styled.li<any>`
  display: flex;
  position: relative;
  align-items: flex-end;
  justify-content: space-around;
  counter-increment: inst;
  flex-direction: ${({ directory }) => (directory === 'column' ? 'column' : 'flex-start')};
  width: ${({ width }) => (width ? width : 'auto')};

  margin-left: -3px;
  padding-top: 2px;
  padding-bottom: 3px;

  ::before {
    right: 100%;
    bottom: 0;
    content: counter(inst);
    position: absolute;
    min-width: 12px;

    font-size: 12px;
    line-height: 40px;
    color: #4d4d4f;
  }
`;

export const HTMLArrayItemCall = styled.div<any>`
  width: 100%;
  padding: 0 3px;
`;

export const HTMLButton = styled(Button)`
  min-width: 120px;
  margin-left: 3px;
  margin-bottom: 1px;
`;
