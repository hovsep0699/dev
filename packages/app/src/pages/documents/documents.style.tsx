import styled from 'styled-components';

import { Tag } from '@distate/components';

export const HTMLTags = styled.span(() => {
  return {
    margin: '8px 0',
    display: 'block',
    lineHeight: 'normal'
  };
});

export const HTMLTag = styled(Tag)(() => {
  return {
    display: 'inline-block',
    marginRight: 6
  };
});

export const HTMLIcons = styled.div(() => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    span: {
      color: '#4d4d4f',
      fontSize: 16
    },
    '> *': {
      marginLeft: 2,
      marginRight: 2
    }
  };
});
