import styled, { keyframes } from 'styled-components';
import { Button } from '@distate/components';

const animateLoading = keyframes`
  0% {
    transform: translateY(88px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const HTMLContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 42px;
  padding-left: 330px;
  z-index: 41;
  background-color: ${({ theme }) =>
    theme[theme.themeName]?.notification?.background || 'rgba(232, 84, 18, 0.7)'};
  animation: 0.6s ${animateLoading} ease-out;
`;

export const HTMLBody = styled.div<{}>(() => {
  return {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16
  };
});

export const HTMLMessage = styled.div<{}>(() => {
  return {
    display: 'inline-block',
    color: 'white',
    fontSize: 16,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    margin: '0 8px'
  };
});

export const HTMLButton = styled(Button)(() => {
  return {
    height: 32,
    lineHeight: '32px',
    margin: '0 8px'
  };
});
