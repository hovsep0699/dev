import styled from 'styled-components';
import { rgba } from 'polished';
import { ModalProps } from './Modal';
import { StyledButton } from '../Button';
import { IconClose } from '../icons';

type OverlayProps = Pick<ModalProps, 'isVisible'>;

export const Overlay = styled.div<OverlayProps>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  width: 100vw;
  height: 100%;
  z-index: 1000;
  margin: 0;
  padding: 0;
  background: ${({ theme }) => rgba(theme.main.color.white, 0.75)};
  overflow-y: scroll;
  will-change: opacity;
  pointer-events: all;
`;

type ContentProps = Pick<ModalProps, 'isVisible'> & {
  width: string;
};

export const Content = styled.div<ContentProps>`
  width: ${({ theme, width }) =>
    width
      ? width
      : `${parseInt(theme.main.sizes.fieldWidth) * 2 + parseInt(theme.main.sizes.padding) * 4}px`};
  max-width: 100%;
  top: 0;
  left: 0;
  right: 0;
  margin: 5% auto;
  padding: ${({ theme }) => parseInt(theme.main.sizes.padding) * 2}px;
  background-color: ${({ theme }) => theme.main.color.white};
  z-index: 300;
  border-radius: ${({ theme }) => theme.main.sizes.borderRadius};
  box-shadow: ${({ theme }) => theme.main.shadow.layer};
  will-change: opacity, transform;
  transition: ${({ theme }) => theme.main.animation.fast};

  position: relative;
  visibility: visible;
  opacity: 1;
  transform: translateY(0%);
`;

export const StyledModalFooter = styled.div<{}>`
  text-align: center;
  margin-left: ${({ theme }) => -(parseInt(theme.main.sizes.padding) * 2)}px;
  margin-right: ${({ theme }) => -(parseInt(theme.main.sizes.padding) * 2)}px;
  margin-bottom: ${({ theme }) => -(parseInt(theme.main.sizes.padding) * 2)}px;
  padding: ${({ theme }) => theme.main.sizes.padding};
  background: ${({ theme }) => theme.main.color.greyNormal};

  ${StyledButton} + ${StyledButton} {
    margin-left: ${({ theme }) => parseInt(theme.main.sizes.padding) / 2}px;
  }
`;

export const StyledModalBody = styled.div`
  padding-top: ${({ theme }) => theme.main.sizes.padding};
  padding-bottom: ${({ theme }) => theme.main.sizes.padding};
`;

export const StyledIconClose = styled(IconClose)`
  width: ${({ theme }) => theme.main.factor * 3}px;
  height: ${({ theme }) => theme.main.factor * 3}px;
  fill: ${({ theme }) => theme.main.color.danger};
`;

export const StyledModalHeader = styled.h2`
  font-family: ${({ theme }) => theme.main.font.family.default};
  display: block;
  margin: 0 0 ${({ theme }) => theme.main.sizes.padding};
  padding: 0 ${({ theme }) => theme.main.sizes.padding};
  font-size: ${({ theme }) => theme.main.font.size.h2};
  line-height: ${({ theme }) => theme.main.sizes.lineHeight.default};
  text-align: center;
  color: ${({ theme }) => theme.main.font.color.dark};
  font-weight: 300;
`;

export const CloseBtn = styled.button<{}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({ theme }) => parseInt(theme.main.sizes.padding) + 8}px;
  right: ${({ theme }) => parseInt(theme.main.sizes.padding) + 8}px;
  height: ${({ theme }) => theme.main.factor * 6}px;
  width: ${({ theme }) => theme.main.factor * 6}px;
  cursor: pointer;
  border-radius: 50%;
  border: 0;
  padding: 0;
  background-color: transparent;
  outline: 0;

  &:hover {
    background: ${({ theme }) => theme.main.color.danger};

    ${StyledIconClose} {
      fill: ${({ theme }) => theme.main.color.white};
    }
  }
`;
