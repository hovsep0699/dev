import styled from 'styled-components';
import { TagProps } from './Tag';
import { IconClose } from '../icons';

export const StyledIconClose = styled(IconClose)`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  fill: transparent;
`;

export type StyledTagProps = Pick<TagProps, 'kind'> & {
  removable: boolean;
};

export const StyledTag = styled.span<StyledTagProps>`
  display: inline-block;
  position: relative;
  margin: 0;
  line-height: normal;
  padding: ${({ theme }) => `${theme.main.factor}px ${theme.main.factor * 2}px`};
  border: 1px solid ${({ theme }) => theme.main.color.borderColor};
  border-radius: ${({ theme }) => theme.main.sizes.borderRadius};
  background: ${({ theme }) => theme.main.color.greyLight};
  text-align: center;
  white-space: nowrap;
  transition: padding ${({ theme }) => theme.main.animation.standart};
  color: ${({ theme, kind }) => kind === 'success' && theme.main.color.success};
  font-size: ${({ theme, removable }) =>
    !removable ? theme.main.font.size.small : theme.main.font.size.default};
  outline: 0;

  ${({ theme, removable }) =>
    removable &&
    `
      &:hover {
        background: #e64f49;
        color: #fff;
        border-color: #d5241d;
        padding-right: 24px;

        ${StyledIconClose} {
          fill: ${theme.main.color.white};
        }
      }
  `}
`;
