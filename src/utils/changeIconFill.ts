import styled from 'styled-components';

const changeIconFill = (icon: any) => {
  return styled(icon)`
    path {
      fill: currentColor;
    }
  `;
};

export default changeIconFill;
