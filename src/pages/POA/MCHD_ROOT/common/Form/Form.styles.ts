import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { IconAlert, IconCalendar } from '../../assets/icons';
import { TextInputProps } from './elements/TextInput';

export const StyledFormField = styled.div`
  margin-bottom: ${({ theme }) => parseInt(theme.main.sizes.padding) / 2}px;
`;

export const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.main.sizes.lineHeight.default};
`;

export type StyledInputProps = Pick<TextInputProps, 'error' | 'touched' | 'value' | 'hideErrors'>;

// TODO type return values
export const getBorderColor = ({ error, touched, value, hideErrors }: StyledInputProps): string => {
  if (error && touched) {
    return 'danger';
  } else if (!hideErrors && !error && touched && value !== '') {
    return 'success';
  } else {
    return 'borderColor';
  }
};

export const StyledInput = styled.input<StyledInputProps>`
  display: block;
  background-color: ${({ theme }) => theme.main.color.white};
  border: 1px solid
    ${({ theme, error, touched, value, hideErrors }) =>
      theme.main.color[getBorderColor({ error, touched, value, hideErrors })]};
  border-radius: 2px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.main.font.color.black};
  font-size: ${({ theme }) => theme.main.font.size.default};
  font-weight: 400;
  line-height: ${({ theme }) => parseInt(theme.main.sizes.lineHeight.default) - 2}px;
  margin: 0;
  min-height: ${({ theme }) => theme.main.sizes.lineHeight.default};
  padding: 0 ${({ theme }) => theme.main.sizes.padding};
  padding-right: ${({ theme, error }) => error && `${parseInt(theme.main.sizes.padding) * 2}px`};
  position: relative;
  transition: box-shadow ${({ theme }) => theme.main.animation.standart};
  outline: 0;
  width: 100%;

  &:hover {
    box-shadow: ${({ theme }) => theme.main.shadow.standart};
  }

  &:focus {
    border-color: ${({ theme }) => theme.main.color.primary};
    box-shadow: ${({ theme }) => `inset 0 2px 5px 0 ${rgba(theme.main.color.primary, 0.26)},
    inset 0 2px 10px 0 ${rgba(theme.main.color.primary, 0.06)}`};
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const iconsMixin = css`
  position: absolute;
  right: 8px;
  top: 50%;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  fill: #70706a;
`;

export const StyledIconAlert = styled(IconAlert)`
  ${iconsMixin}
`;

export const StyledIconCalendar = styled(IconCalendar)`
  ${iconsMixin}
`;

export const StyledFormLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.main.font.color.dark};
  font-size: ${({ theme }) => theme.main.font.size.small};
  font-style: italic;
  line-height: ${({ theme }) => parseInt(theme.main.sizes.lineHeight.default) / 2}px;
`;

export const StyledFieldError = styled<any>(StyledFormLabel)`
  color: ${({ theme }) => theme.main.color.danger};
`;
