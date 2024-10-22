import styled from 'styled-components';
import { Tag } from '@distate/components';

export const HTMLTags = styled.div(() => {
  return {
    minWidth: 300,
    padding: '0 16px',
    button: {
      display: 'block'
    }
  };
});

export const HTMLTag = styled(Tag)(() => {
  return {
    ':nth-child(n + 1)': {
      marginTop: 8
    }
  };
});
