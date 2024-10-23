import styled from 'styled-components';
import { Dropdown, Button } from '@distate/components';

export const HTMLContainer = styled.div(() => {
  return {
    display: 'inline-block',
    padding: '0 6px'
  };
});

export const HTMLBody = styled.div(() => {
  return {
    padding: '0 12px'
  };
});

export const HTMLButtons = styled.div<{}>(() => {
  return {
    display: 'flex',
    marginTop: 12,
    flexDirection: 'column'
  };
});

export const HTMLButton = styled(Button)(() => {
  return {
    marginTop: 3,
    marginBottom: 3
  };
});

export const HTMLDropdown = styled(Dropdown)(() => {
  return {
    '> div': {
      minWidth: '300px',
      maxWidth: '360px'
    }
  };
});
