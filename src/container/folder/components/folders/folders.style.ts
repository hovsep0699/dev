import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Button } from '@distate/components';

export const HTMLContainer = styled.div<{}>(() => {
  return {
    height: 'calc(100vh - 330px)',
    overflowY: 'auto'
  };
});

export const HTMLItem = styled.div<{ $active: boolean; theme: any }>(({ $active, theme }) => {
  const styles: any = {};
  if ($active) {
    styles['backgroundColor'] = theme.main.color.darkBold;
  }

  return {
    position: 'relative',
    overflow: 'hidden',

    ':hover': {
      backgroundColor: theme.main.color.darkMedium
    },

    [`:hover ${HTMLItemTools}`]: {
      display: 'inline-flex'
    },

    ...styles
  };
});

export const HTMLLink = styled(NavLink)(({ theme }) => {
  return {
    width: '100%',
    minHeight: theme.main.sizes.lineHeight.default,
    lineHeight: theme.main.sizes.lineHeight.default - 18,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    padding: '10px 0 10px 16px',
    color: 'white'
  };
});

export const HTMLItemTitle = styled.span<any>(() => {
  return {
    flex: '1 1 auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };
});

export const HTMLItemTools = styled.div<any>(({ theme }) => {
  return {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0
  };
});

export const HTMLItemToolsItem = styled.div<any>(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    float: 'right',
    height: '100%',
    minWidth: theme.main.sizes.lineHeight.default,
    backgroundColor: theme.main.color.darkMedium
  };
});

export const HTMLButton = styled(Button)(({ theme }) => ({
  color: 'transparent',
  height: theme.main.sizes.lineHeight.default,
  minWidth: theme.main.sizes.lineHeight.default,
  lineHeight: theme.main.sizes.lineHeight.default,

  path: {
    fill: 'white'
  }
}));
