import React from 'react';

import { LegalEntityTable } from './LegalEntityTable';
import { LegalEntityTools } from './LegalEntityTools';
import './style.css';

export const LegalEntityContractor = () => {
  return (
    <>
      <LegalEntityTools />
      <LegalEntityTable />
    </>
  );
};
