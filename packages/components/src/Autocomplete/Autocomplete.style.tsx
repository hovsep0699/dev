import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import { rgba } from 'polished';

import { Input } from '../Input';

export const HTMLContainer = styled.div<any>(({ $width }) => {
  return {
    width: $width
  };
});

export const HTMLInput = styled(Input)`
  > div {
    border: 0;
    box-shadow: none;

    &:focus,
    &:hover {
      box-shadow: none;
    }
  }
  input[disabled] {
    padding-left: 10px;
    background-color: #f3f3f3;
  }
`;

export const HTMLLabel = styled.div<{ $required?: boolean }>(({ $required, theme }) => {
  let styles = {};

  if ($required) {
    styles = {
      ...styles,
      '::after': {
        content: '" *"',
        color: theme.main.color.danger
      }
    };
  }

  return {
    ...styles,

    fontStyle: 'italic',
    fontSize: theme.main.font.size.small,
    lineHeight: parseInt(theme.main.sizes.lineHeight.default) / 2 + 'px',
    color: theme.main.font.color.dark
  };
});

export const HTMLSelect = styled(AsyncSelect)<{}>(({ theme }) => {
  return {
    width: '100%',
    position: 'relative'
  };
});

export const getBorderColor = ({ error, touched, value, hideErrors }: any): string => {
  if (error && touched) {
    return 'danger';
  } else if (!hideErrors && !error && touched && value !== '') {
    return 'success';
  } else {
    return 'borderColor';
  }
};

export const customStyles = (theme: any, props: any = {}) => ({
  container: (provided: any) => ({
    ...provided,
    position: 'relative',
    width: '100%',
    padding: 0,
    margin: 0
  }),
  control: (provided: any, { selectProps, isFocused, ...prop }: any) => {
    let styles: any = {};
    if (isFocused) {
      styles['borderColor'] = theme.main.color.primary;
      styles['boxShadow'] = `inset 0 2px 5px 0 ${rgba(theme.main.color.primary, 0.26)},
                             inset 0 2px 10px 0 ${rgba(theme.main.color.primary, 0.06)}`;
    }

    let borderWidth = 1;
    let borderColor = isFocused ? theme.main.color.primary : theme.main.color.borderColor;
    if (props.simple) {
      borderWidth = 0;
      borderColor = undefined;

      styles['boxShadow'] = undefined;
      styles['&:hover'] = { borderColor };
    }

    if (selectProps.error) {
      styles['borderColor'] = theme.main.color.danger;
    }

    return {
      ...provided,
      display: 'flex',
      position: 'relative',
      outline: 0,
      borderRadius: 2,
      boxSizing: 'border-box',
      color: theme.main.font.color.black,
      fontSize: theme.main.font.size.default,
      borderColor,
      borderWidth,
      borderStyle: 'solid',
      width: '100%',
      fontWeight: 400,
      lineHeight: `${parseInt(theme.main.sizes.lineHeight.default) - 2}px`,
      minHeight: theme.main.sizes.lineHeight.default,
      backgroundColor: theme.main.color.white,
      padding: 0,
      margin: 0,

      ...styles
    };
  },
  indicatorsContainer: (provided: any) => {
    if (props.simple) {
      return { display: 'none' };
    }

    return { ...provided };
  },
  valueContainer: (provided: any) => ({
    ...provided,
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 14
  }),
  input: (provided: any) => ({
    ...provided,
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0
  })
});
