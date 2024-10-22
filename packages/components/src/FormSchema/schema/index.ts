import { FC } from 'react';

import { SchemaMulty } from './schema.multi';
import { SchemaNull } from './schema.null';
import { SchemaArray } from './schema.array';
import { SchemaBoolean } from './schema.boolean';
import { SchemaString } from './schema.string';
import { SchemaObject } from './schema.object';
import { SchemaUnsupported } from './schema.unsupported';

export { SchemaDefinition } from './schema';

export const SchemaComponents: Record<string, FC> = {
  unsupported: SchemaUnsupported,
  boolean: SchemaBoolean,
  object: SchemaObject,
  string: SchemaString,
  array: SchemaArray,
  multy: SchemaMulty,
  null: SchemaNull
};

export default SchemaComponents;
