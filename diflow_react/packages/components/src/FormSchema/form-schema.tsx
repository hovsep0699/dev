import React from 'react';
import isEqual from 'react-fast-compare';
import { IconCheck, IconNa } from '@distate/components/dist/icons';

import { HTMLContainer, HTMLFooter, HTMLButtonTrue, HTMLButtonClear } from './form-schema.style';
import { SchemaDefinition } from './schema';
import { Provider } from './context';
import { FormSchemaProps } from './typings';

/**
 * Understanding JSON Schema
 * http://json-schema.org/understanding-json-schema/index.html
 */

const FormSchema: React.FC<FormSchemaProps<any>> = React.memo(
  ({
    name = 'root',
    uiSchema = {},
    formData = {},
    renderTable = null,
    schema,
    children,
    className,
    errorSchema,
    isCenterFooter,
    onClear,
    onSubmit,
    onChange
  }) => {
    const [values, setValues] = React.useState(formData);
    const [errors, setErrors] = React.useState(errorSchema);

    const handleOnBlur = () => {};

    const handleOnFocus = () => {};

    const handleOnChange = (newFormData: any) => {
      setValues(newFormData);
      onChange?.(newFormData);
    };

    const handleOnClear = () => {
      setValues({});
      if (onClear) onClear();
    };

    const handleOnSubmit = () => {
      if (onSubmit) onSubmit(values);
    };

    const renderChildren = () => {
      if (typeof children === 'function') {
        return children({
          onClear: handleOnClear,
          onSumbit: handleOnSubmit
        });
      }
      return <HTMLFooter $center={isCenterFooter}>{children}</HTMLFooter>;
    };

    const schemaError = errorSchema !== undefined ? errorSchema : errors;
    return (
      <Provider
        value={{
          formName: name,
          formData: values,
          rootUiSchema: uiSchema,
          rootSchema: schema,
          rootErrors: schemaError,
          setErrors,
          onBlur: handleOnBlur,
          onFocus: handleOnFocus,
          onChange: handleOnChange
        }}
      >
        <HTMLContainer>
          <SchemaDefinition
            className={className}
            schema={schema}
            errorSchema={schemaError}
            uiSchema={uiSchema}
            formData={values}
          />
          {renderTable}
          {typeof children !== 'undefined' ? (
            renderChildren()
          ) : (
            <HTMLFooter $center={isCenterFooter}>
              <HTMLButtonTrue onClick={handleOnSubmit}>
                <IconCheck style={{ fill: 'currentcolor' }} />
                Сохранить
              </HTMLButtonTrue>
              <HTMLButtonClear onClick={handleOnClear}>
                <IconNa />
                Очистить
              </HTMLButtonClear>
            </HTMLFooter>
          )}
        </HTMLContainer>
      </Provider>
    );
  },
  isEqual
);

export { FormSchema };
