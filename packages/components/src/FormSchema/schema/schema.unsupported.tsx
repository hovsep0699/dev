import React from 'react';

import { Schema } from '../typings';

const SchemaUnsupported: React.FC<{ schema?: Schema }> = ({ schema }) => {
  const { type } = schema;
  return <div>Unsupported field schema "{type}"</div>;
};

export { SchemaUnsupported };
