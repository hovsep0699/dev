import React from 'react';
import styled from 'styled-components';

const HTMLDiv = styled.div`
  font-size: 14px;
  padding: 2px 0;
  color: #212122;
`;

const InfoWidget: React.FC<any> = React.memo(({ formValue = null }) => {
  return <HTMLDiv>{formValue}</HTMLDiv>;
});

export { InfoWidget };
