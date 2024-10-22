import styled from 'styled-components';

import Button from '@distate/components/dist/Button';
import { Input } from '@distate/components/dist/Input';
import { Select } from '@distate/components/dist/Select';
import { TextArea } from '@distate/components/dist/TextArea';
import { Autocomplete } from '@distate/components/dist/Autocomplete';

export const HTMLButton = styled(Button)`
  padding: 3px;
`;

export const HTMLButtonTrue = styled(Button)`
  color: white;
  margin: 0 6px;
  background-color: #e85412;
`;

export const HTMLTextArea = styled(TextArea)`
  border: 0;
  padding: 10px 16px;
  width: 100%;
  min-width: 220px;
  max-width: 220px;
  box-shadow: none;
  min-height: 75px;

  font-size: 14px;
  line-height: 17px;

  &:focus,
  &:hover {
    border: 0 !important;
    box-shadow: none !important;
  }
`;

export const HTMLSelect = styled(Select)`
  > div {
    border: 0 !important;
    box-shadow: none !important;

    &:focus,
    &:hover {
      box-shadow: none !important;
    }
  }
`;

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
    background-color: #f3f3f3;
  }
`;

export const HTMLAutocomplete = styled(Autocomplete)`
  border: 0;
`;
