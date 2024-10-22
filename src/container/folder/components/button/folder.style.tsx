import styled from 'styled-components';

export const HTMLContext = styled.div<{}>(() => {
  return {
    paddingTop: 8,
    maxHeight: 320,
    overflowY: 'auto'
  };
});
