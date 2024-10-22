import styled from 'styled-components';

export const HTMLContainer = styled.div<{}>(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    minWidth: theme.main.sizes.lineHeight.default
  };
});

export const HTMLElement = styled.span<any>(({ theme }) => {
  return {
    width: '100%',
    flex: '1 1 auto',
    display: 'block',
    padding: '10px 16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 14,
    lineHeight: '14px',
    boxSizing: 'border-box',
    color: '#212122',
    minHeight: theme.main.sizes.lineHeight.default,
    transition: 'color .2s, background .2s',

    ':hover': {
      backgroundColor: '#12a6e8',
      color: '#fdfdfd'
    }
  };
});
