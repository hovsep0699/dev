import styled from 'styled-components';
import Button from '../Button';

export const HTMLContainer = styled.div<{}>(() => {
  return {
    minWidth: 240,
    marginLeft: -3,
    marginRight: -3
  };
});

export const HTMLFooter = styled.div<any>(({ $center }) => {
  return {
    display: 'flex',
    justifyContent: $center && 'center',
    marginTop: 16,
    marginLeft: -6,
    marginRight: -6
  };
});

export const HTMLButtonClear = styled(Button)(() => {
  return {
    margin: '0 6px'
  };
});

export const HTMLButtonTrue = styled(Button)(() => {
  return {
    color: 'white',
    margin: '0 6px',
    backgroundColor: '#e85412'
  };
});
