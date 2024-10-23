import React, { useMemo, useState } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';

import {
  HTMLArray,
  HTMLButton,
  HTMLArrayItem,
  HTMLArrayItemCall
} from '../styled/schema.array.styled';
import { Context } from '../context';
import { getSchemaComponent } from './schema';
import { resolveSchema } from '../utils';

export interface ISchemaArrayProps {}

export const SchemaArray: React.FC<any> = props => {
  const { formData = [], schemaPath, schema, uiSchema, schemaName, errorSchema } = props;
  const [count, setCount] = useState(formData.length || 1);

  const { onChange, formData: rootFormData, rootSchema } = React.useContext(Context);
  const { directory = 'row', width } = uiSchema;

  const arraySchema = resolveSchema(schema.items, rootSchema);
  if (!arraySchema) {
    throw new Error(`Could not find Schema.items in ${schemaName}`);
  }

  const renderRows = useMemo<any[]>(() => {
    const schema = arraySchema.properties;
    const properties = Object.keys(schema);

    const renderProperties = (index: number) => {
      return properties.map(name => {
        const key = [...schemaPath, index, name].join('.');

        const currentSchema = schema[name];
        const currentSchemaPath = [...schemaPath, index, name];
        const currentUiSchema = get(uiSchema, name, {});
        const currentFormData = get(formData, [index, name]);
        const currentError = get(errorSchema, [index, name]);
        const SchemaComponent = getSchemaComponent(currentSchema);

        return (
          <HTMLArrayItemCall key={key} directory={directory}>
            <SchemaComponent
              schemaName={name}
              schema={currentSchema}
              uiSchema={currentUiSchema}
              formData={currentFormData}
              schemaPath={currentSchemaPath}
              errorSchema={currentError}
            />
          </HTMLArrayItemCall>
        );
      });
    };

    const onClickAppend = () => setCount(count + 1);

    function onClickRemove(index: number) {
      if (formData[index]) {
        delete formData[index];
        const data = [...formData.filter(Boolean)];

        set(rootFormData, [...schemaPath], data);
        onChange({ ...rootFormData });
      }

      setCount(count - 1);
    }

    return Array(count)
      .fill(null)
      .map((v, i) => (
        <HTMLArrayItem key={i} directory={directory} width={width}>
          {renderProperties(i)}
          {i === 0 && <HTMLButton onClick={onClickAppend}>Добавить</HTMLButton>}
          {i !== 0 && <HTMLButton onClick={onClickRemove.bind(null, i)}>Удалить</HTMLButton>}
        </HTMLArrayItem>
      ));
  }, [
    arraySchema.properties,
    rootFormData,
    directory,
    schemaPath,
    uiSchema,
    formData,
    onChange,
    width,
    count
  ]);

  return <HTMLArray>{renderRows}</HTMLArray>;
};
