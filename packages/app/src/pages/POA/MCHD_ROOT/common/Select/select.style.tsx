import styled from 'styled-components';

export const HTMLContainer = styled.div<any>(({ $width }) => {
  return {
    width: $width || '100%'
  };
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

export const HTMLError = styled.span`
  color: red;
  background: white;
  padding: 2px;
  z-index: 100;
  font-size: 11px;
  line-height: 12px;
`;
