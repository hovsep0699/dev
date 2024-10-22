import React from 'react';
import styled from 'styled-components';

import { schema, uischema, formData } from './schema';
import { FormSchema } from '../form-schema';

const HTMLForm = styled(FormSchema)`
  max-width: 900px;
`;

export default {
  title: 'Form Schema'
};

export const UPD = () => {
  return (
    <HTMLForm schema={schema} uiSchema={uischema} formData={formData} onChange={console.log} />
  );
};
