import styled from 'styled-components';

export const HTMLContainer = styled.div<{}>(() => {
  return {
    position: 'relative',
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16
  };
});

export const HTMLHeader = styled.div(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #D7D7D7',
    paddingLeft: 16,
    paddingRight: 0,
    paddingBottom: 8
  };
});

export const HTMLBody = styled.div(() => {
  return {
    padding: '16px 0'
  };
});

export const HTMLTitle = styled.h5(() => {
  return {
    fontSize: 16,
    fontWeight: 500,
    color: 'white'
  };
});
