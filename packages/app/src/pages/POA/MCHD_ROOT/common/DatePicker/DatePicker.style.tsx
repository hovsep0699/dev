import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';

export const HTMLContainer = styled.div(() => {
  return {};
});

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

export const HTMLContent = styled.div(() => {
  return {
    '> div': {
      display: 'block !important'
    }
  };
});

export const HTMLDatePicker = styled(ReactDatePicker)(() => {
  return {
    display: 'block'
  };
});

export const HTMLInput = styled.input(() => {
  return {};
});
