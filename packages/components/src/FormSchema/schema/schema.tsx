import React, { useMemo } from 'react';
import get from 'lodash.get';

import { FormSchemaDefinition, Schema } from '../typings';
import { SchemaComponents } from './index';
import { retrieveSchema } from '../utils';
import { Context } from '../context';

export function getSchemaComponent(schema: Schema): any {
  let componentName: string = 'unsupported';
  if (SchemaComponents.hasOwnProperty(schema.type)) {
    componentName = schema.type;
  }

  if (schema.anyOf || schema.oneOf || schema.allOf) {
    return SchemaComponents.multy;
  }

  if (!SchemaComponents.hasOwnProperty(componentName)) {
    throw new Error(`Could not find SchemaComponent ${componentName}.`);
  }

  return SchemaComponents[componentName];
}

const SchemaDefinition: React.FC<FormSchemaDefinition> = React.memo(props => {
  const {
    name,
    schema,
    formData,
    required,
    errorSchema,
    schemaPath = [],
    uiSchema: currentUiSchema,
    className
  } = props;
  const { rootSchema } = React.useContext(Context);

  const currentSchema = retrieveSchema(schema, rootSchema);
  const SchemaComponent = getSchemaComponent(currentSchema);
  const currentSchemaPath = useMemo(() => [...schemaPath, name].filter(Boolean), [
    schemaPath,
    name
  ]);

  let currentErrors;
  let currentFormData;
  if (!name) {
    currentErrors = errorSchema;
    currentFormData = formData;
  } else {
    currentErrors = get(errorSchema, name);
    currentFormData = get(formData, name);
  }

  return (
    <SchemaComponent
      schemaName={name}
      className={className}
      schema={currentSchema}
      required={Boolean(required)}
      errorSchema={currentErrors}
      uiSchema={currentUiSchema}
      formData={currentFormData}
      schemaPath={currentSchemaPath}
    />
  );
});

export { SchemaDefinition };
