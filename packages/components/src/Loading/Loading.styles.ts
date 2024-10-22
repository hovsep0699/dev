import styled from 'styled-components';
import { rgba } from 'polished';
import { spin } from '../styles/keyframes';

export interface IStyledOverlay {
  isRelative: boolean;
}

export const Overlay = styled.div<IStyledOverlay>`
  display: block;
  position: ${({ isRelative }) => (isRelative ? 'relative' : 'absolute')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => rgba(theme.main.color.white, 0.75)};
  z-index: 100;
`;

export const Loader = styled.div`
  display: block;
  position: absolute;
  width: ${({ theme }) => parseInt(theme.main.sizes.padding) * 2}px;
  height: ${({ theme }) => parseInt(theme.main.sizes.padding) * 2}px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: ${({ theme }) => theme.main.sizes.padding};
  box-sizing: content-box;
`;

export const Container = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  animation: ${spin} 1.5s linear infinite;
`;

export const Spinner = styled.div`
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 0;
  width: 100%;
  height: 100%;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -50%;
    top: 0;
    border-radius: 100%;
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.main.color.primary};
    width: 100%;
    height: 100%;
  }
`;
