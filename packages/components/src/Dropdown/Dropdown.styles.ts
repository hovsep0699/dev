import styled from 'styled-components';

const StyledDropdownWrapper = styled.div`
  position: relative;
  line-height: normal;
  letter-spacing: normal;
`;

const updatePositioningStyles = (placement: string, isOpen: boolean) => {
  switch (placement) {
    case 'TOP':
      return `
        top: ${isOpen ? '-10px' : '-20px'};
        margin-top: 0;
        left: 50%;
        right: auto;
        transform: translate(-50%, -100%);
        box-shadow: 0 -6px 10px rgba(0, 0, 0, 0.23), 0 -10px 30px rgba(0, 0, 0, 0.19);

        ${isOpen &&
          `
          &:before {
            left: 50%;
            right: auto;
            transform: translate(-50%, 100%);
            border-bottom-color: transparent;
            border-top-color: #fbfbfb;
            top: auto;
            bottom: 0;
          }
        `}
      `;

    case 'TOP_LEFT':
      return `
          top: ${isOpen ? '-10px' : '-20px'};
          margin-top: 0;
          left: 0;
          right: auto;
          transform: translate(0, -100%);
          box-shadow: 0 -6px 10px rgba(0, 0, 0, 0.23), 0 -10px 30px rgba(0, 0, 0, 0.19);

          ${isOpen &&
            `
            &:before {
              left: 0;
              right: auto;
              transform: translate(100%, 100%);
              border-bottom-color: transparent;
              border-top-color: #fbfbfb;
              top: auto;
              bottom: 0;
            }
          `}
        `;

    case 'TOP_RIGHT':
      return `
        top: ${isOpen ? '-10px' : '-20px'};
        margin-top: 0;
        left: auto;
        right: 0;
        transform: translate(0, -100%);
        box-shadow: 0 -6px 10px rgba(0, 0, 0, 0.23), 0 -10px 30px rgba(0, 0, 0, 0.19);

        ${isOpen &&
          `
          &:before {
            left: auto;
            right: 0;
            transform: translate(-100%, 100%);
            border-bottom-color: transparent;
            border-top-color: #fbfbfb;
            top: auto;
            bottom: 0;
          }
        `}
      `;

    case 'BOTTOM':
      return `
        margin-top: ${isOpen ? '10px' : '20px'};
        left: 50%;
        right: auto;
        transform: translate(-50%, 0);

        ${isOpen &&
          `
          &:before {
            left: 50%;
            right: auto;
            transform: translate(-50%, -100%);
            top: 0;
          }
        `}
      `;

    case 'BOTTOM_RIGHT':
      return `
        margin-top: ${isOpen ? '10px' : '20px'};
        left: auto;
        right: 0;
        transform: translate(0, 0);

        ${isOpen &&
          `
          &:before {
            left: auto;
            right: 0;
            transform: translate(-100%, -100%);
            top: 0;
          }
        `}
      `;

    case 'LEFT':
      return `
        left: ${isOpen ? '-12px' : '-22px'};
        right: auto;
        transform: translate(-100%, -50%);
        top: 50%;

        ${isOpen &&
          `
          &:before {
            left: auto;
            right: -12px;
            transform: translate(0, -50%);
            top: 50%;
            border-bottom-color: transparent;
            border-left-color: #fbfbfb;
          }
        `}
      `;

    case 'LEFT_TOP':
      return `
        left: ${isOpen ? '-12px' : '-22px'};
        right: auto;
        transform: translate(-100%, 0%);
        top: 0;

        ${isOpen &&
          `
          &:before {
            left: auto;
            right: -12px;
            transform: translate(0, 100%);
            top: 0;
            border-bottom-color: transparent;
            border-left-color: #fbfbfb;
          }
        `}
      `;

    case 'LEFT_BOTTOM':
      return `
        left: ${isOpen ? '-12px' : '-22px'};
        right: auto;
        transform: translate(-100%, -100%);
        top: 100%;

        ${isOpen &&
          `
          &:before {
            left: auto;
            right: -12px;
            transform: translate(0, -100%);
            top: auto;
            bottom: 0;
            border-bottom-color: transparent;
            border-left-color: #fbfbfb;
          }
        `}
      `;

    case 'RIGHT':
      return `
        right: ${isOpen ? '-12px' : '-22px'};
        left: auto;
        transform: translate(100%, -50%);
        top: 50%;

        ${isOpen &&
          `
          &:before {
            left: -12px;
            right: auto;
            transform: translate(0, -50%);
            top: 50%;
            border-bottom-color: transparent;
            border-right-color: #fbfbfb;
          }
        `}
      `;

    case 'RIGHT_TOP':
      return `
        right: ${isOpen ? '-12px' : '-22px'};
        left: auto;
        transform: translate(100%, 0%);
        top: 0;

        ${isOpen &&
          `
          &:before {
            left: -12px;
            right: auto;
            transform: translate(0, 100%);
            top: 0;
            border-bottom-color: transparent;
            border-right-color: #fbfbfb;
          }
        `}
      `;

    case 'RIGHT_BOTTOM':
      return `
        right: ${isOpen ? '-12px' : '-22px'};
        left: auto;
        transform: translate(100%, -100%);
        top: 100%;

        ${isOpen &&
          `
          &:before {
            left: -12px;
            right: auto;
            transform: translate(0, -100%);
            top: auto;
            bottom: 0;
            border-bottom-color: transparent;
            border-right-color: #fbfbfb;
          }
        `}
      `;

    default:
      return `
        margin-top: ${isOpen ? '10px' : '20px'};
        left: 0;
        right: auto;
        transform: translate(0, 0);

        ${isOpen &&
          `
          &:before {
            left: 0;
            right: auto;
            transform: translate(100%, -100%);
            top: 0;
          }
        `}
      `;
  }
};

export interface IStyledDropdown {
  isOpen: boolean;
  placement: string;
  widthRestrict: boolean;
  width?: string;
}

const StyledDropdown = styled.div<IStyledDropdown>`
  display: ${({ isOpen }) => isOpen && 'block'};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  padding: ${({ theme }) => theme.main.sizes.padding} 0;
  min-width: ${({ theme, widthRestrict }) =>
    widthRestrict ? '240px' : theme.main.sizes.fieldWidthHalf};
  background-color: ${({ theme }) => theme.main.color.greyLight};
  box-shadow: ${({ theme }) => theme.main.shadow.active};
  border-radius: ${({ theme }) => theme.main.sizes.borderRadius};
  text-align: left;
  z-index: 105;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  will-change: opacity, transform;
  transform: ${({ theme, isOpen }) => `translateY(${isOpen ? '0' : theme.main.sizes.padding})`};
  letter-spacing: normal;
  transition: ${({ theme, isOpen }) => isOpen && `all ${theme.main.animation.fast}`};
  width: ${({ width }) => width};

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: -${({ theme }) => parseInt(theme.main.sizes.padding) + 2}px;
    left: 0;
    right: 0;
    width: 0;
    height: 0;
    border: ${({ theme }) => parseInt(theme.main.sizes.padding) / 2}px solid transparent;
    border-bottom-color: ${({ theme }) => theme.main.color.greyLight};
  }

  ${({ placement, isOpen }) => updatePositioningStyles(placement, isOpen)}
`;

export { StyledDropdownWrapper, StyledDropdown };
