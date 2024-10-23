import styled from 'styled-components';

import Button from '@distate/components/dist/Button';
import { Input } from '@distate/components/dist/Input';
import { Autocomplete } from '@distate/components/dist/Autocomplete';

export const HTMLButton = styled(Button)`
  padding: 3px;
`;

export const HTMLInput = styled(Input)`
  > div {
    border: ${({ error }) => (error ? 1 : 0)};
    box-shadow: none;

    &:focus,
    &:hover {
      box-shadow: none;
    }
  }
`;

export const HTMLAutocomplete = styled(Autocomplete)`
  border: 0;
`;
