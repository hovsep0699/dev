import styled from 'styled-components';
import { hideVisually } from 'polished';
import { IconCheck } from '../../assets/icons';
import { ICheckBox } from './CheckBox';
import { rgba } from 'polished';

export const Label = styled.label`
  display: inline-block;
  cursor: pointer;
  line-height: 30px;
`;

export const Icon = styled(IconCheck)`
  fill: ${({ theme }) => theme.main.font.color.black};
  width: 19px;
  height: 19px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  ${hideVisually()}
`;

export type StyledCheckboxType = {
  $isLabel: boolean;
} & Pick<ICheckBox, 'checked'>;

export const StyledCheckbox = styled.div<StyledCheckboxType>`
  display: inline-block;
  vertical-align: middle;
  width: ${({ theme }) => parseInt(theme.main.sizes.lineHeight.default) / 2}px;
  height: ${({ theme }) => parseInt(theme.main.sizes.lineHeight.default) / 2}px;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  transition: all 150ms;
  margin-right: ${({ $isLabel }) => ($isLabel ? '14px' : '0')};
  position: relative;
  flex: none;
  background-color: ${({ theme }) => theme.main.color.white};

  &:hover {
    box-shadow: ${({ theme }) => theme.main.shadow.lowInset};
  }

  ${HiddenCheckbox}:active + & {
    border: 1px solid ${({ theme }) => theme.main.color.primary};
    box-shadow: ${({ theme }) => `inset 0 2px 5px 0 ${rgba(theme.main.color.primary, 0.26)},
    inset 0 2px 10px 0 ${rgba(theme.main.color.primary, 0.06)}`};
  }

  ${Icon} {
    transform: ${({ checked }) => (checked ? 'translateY(-3px)' : 'translateY(-6px)')};
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    transition: transform ${({ theme }) => theme.main.animation.fast};
  }
`;

export type LabelContentType = Pick<ICheckBox, 'dark'>;

export const LabelContent = styled.span<LabelContentType>`
  vertical-align: middle;
  color: ${({ theme, dark }) => (!dark ? theme.main.font.color.dark : theme.main.font.color.light)};
`;
