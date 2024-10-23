import styled from 'styled-components';
import { Button, Dropdown } from '@distate/components';

export const HTMLContainer = styled.div(() => {
  return {};
});

export const HTMLBody = styled.div(() => {
  return {
    paddingLeft: 16,
    paddingRight: 16
  };
});

export const HTMLButton = styled(Button)(() => {
  return {};
});

export const HTMLDropdown = styled(Dropdown)(() => {
  return {
    '> div': {
      left: -16
    }
  };
});
