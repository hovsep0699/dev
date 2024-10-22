import React from 'react';
import get from 'lodash.get';

import templates from '../template';
import { Context } from '../context';
import { SchemaDefinition } from './index';
import { FormSchemaObject, UISchemaGroup } from '../typings';

import { HTMLObject, HTMLObjectTitle } from '../styled/schema.styled';
import { dependenciesProperties, orderProperties, groupProperties } from '../utils';

const SchemaObject: React.FC<FormSchemaObject> = ({
  schema,
  className,
  schemaName,
  schemaPath,
  errorSchema,
  formData = {},
  uiSchema = {}
}) => {
  if (!schema.hasOwnProperty('properties')) {
    throw new Error(`Could not find Schema.properites.`);
  }

  const { rootUiSchema } = React.useContext(Context);
  const requiredFields: string[] = schema.required || [];

  const align = uiSchema['ui:align'];
  const group = uiSchema['ui:group'];
  const orders = rootUiSchema['ui:order'];
  const labels = uiSchema['ui:label'] || rootUiSchema['ui:label'] || {};
  const title = uiSchema['ui:title'];

  let orderedProperties: string[];
  let groupedProperties: { [name: string]: UISchemaGroup };

  try {
    const properties = dependenciesProperties(schema, formData);
    orderedProperties = orderProperties(properties, orders);
    orderedProperties = orderedProperties.filter(prop => schema.properties[prop]);

    const grouped = groupProperties(orderedProperties, group);
    orderedProperties = grouped.properties;
    groupedProperties = grouped.group;
  } catch (err) {
    return (
      <div>
        <p className="config-error" style={{ color: 'red' }}>
          Invalid {schemaName} object field configuration:
          <em>{err.message}</em>.
        </p>
      </div>
    );
  }

  // ---------------------------------------------
  // RENDER Template
  const renderTemplate = (name: string) => {
    let contents: string[] = [name];
    let templateName: string = 'base';

    let isGroup = false;
    if (groupedProperties.hasOwnProperty(name)) {
      templateName = groupedProperties[name].type;
      contents = [name, ...groupedProperties[name].fields];
      isGroup = true;
    }

    if (!templates.hasOwnProperty(templateName)) {
      throw new Error(`Could not find Template ${templateName}.`);
    }

    const templateLabel = labels[name];
    const Template = templates[templateName];
    const templateTitle = get(uiSchema, [name, 'ui:title']) || get(schema, 'title');
    const isRequired = requiredFields.indexOf(name) !== -1;

    const isNextObject = get(schema, ['properties', name, 'type']) === 'object';
    const objectUiScheam = get(uiSchema, name);

    return (
      <Template
        key={name}
        align={align}
        title={templateTitle}
        label={templateLabel}
        uiSchema={isNextObject ? objectUiScheam : {}}
        required={isRequired}
        groupProps={isGroup && groupedProperties[name]}
        content={contents.map(name => {
          if (!schema.properties.hasOwnProperty(name)) {
            throw new Error(`Could not find Schema.properites ${name}.`);
          }

          const currentSchema = schema.properties[name];
          const currentUiSchema = get(uiSchema, name, {});
          const isRequired = requiredFields.indexOf(name) !== -1;

          return (
            <SchemaDefinition
              key={name}
              name={name}
              required={!templateLabel && isRequired}
              errorSchema={errorSchema}
              schemaPath={schemaPath}
              schema={currentSchema}
              uiSchema={currentUiSchema}
              formData={formData}
            />
          );
        })}
      />
    );
  };

  return (
    <HTMLObject className={className}>
      {title && <HTMLObjectTitle>{title}</HTMLObjectTitle>}
      {orderedProperties.map(renderTemplate)}
    </HTMLObject>
  );
};

export { SchemaObject };
