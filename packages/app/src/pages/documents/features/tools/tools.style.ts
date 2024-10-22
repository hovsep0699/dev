import styled from 'styled-components';

export const HTMLSkelet = styled.div<{}>(() => {
  return {
    position: 'relative',
    minHeight: 60
  };
});

export const HTMLContainer = styled.div<{ $fixed?: boolean }>(({ $fixed }) => {
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
    marginLeft: -3,
    marginRight: -3,
    marginBottom: 16,
    transition: 'margin-top 0s',

    '&.fixed': {
      position: 'fixed',
      marginTop: 60,
      top: 0,
      left: -2,
      right: -2,
      padding: '16px 16px 16px 360px',
      zIndex: 1,
      minHeight: 40,
      transition: 'margin-top .3s',
      backgroundColor: 'white',
      boxShadow: '-5px 0px 6px #a6a6a6'
    }
  };
});

export const HTMLItem = styled.div<{}>(() => {
  return {
    paddingLeft: 3,
    paddingRight: 3
  };
});
