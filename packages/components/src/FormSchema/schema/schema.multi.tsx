import React, { FC, useContext, ReactNode, useState, useEffect } from 'react';
import { IconCheck, IconNa } from '@distate/components/dist/icons';
import set from 'lodash.set';
import get from 'lodash.get';

import Modal from '../../Modal';
import Button from '../../Button';
import { widgets } from '../widgets';
import { Context } from '../context';
import { SchemaDefinition } from './index';
import { isObject, retrieveSchema, optionsMuliList, hasWidget } from '../utils';
import { HTMLFooter, HTMLButtonTrue, HTMLButtonClear } from '../form-schema.style';
import {
  HTMLMulti,
  HTMLMultiBody,
  HTMLMultiLabel,
  HTMLMultiPopup,
  HTMLMultiHeader,
  HTMLMultiPopupTitle
} from '../styled/schema.multi.styled';

const SCHEMA_TYPE = '__type__';
const FIELD_SELECT_NAME = '__active__';

export const SchemaMulty: FC<any> = ({
  schemaPath,
  schema,
  uiSchema,
  schemaName,
  formData = {}
}) => {
  const [isOpen, setOpen] = useState(false);
  const [popupLabel, setPopupLabel] = useState<string>();
  const { formData: rootFormData, rootSchema, onChange } = useContext(Context);

  // UI
  const uiPopup = get(uiSchema, 'ui:popup');
  const widget = get(uiSchema, 'ui:widget', 'select') as keyof typeof widgets;

  if (!hasWidget(widget)) {
    throw new Error(`Could not find widgte ${widget}.`);
  }

  let child: ReactNode | ReactNode[] = [];
  let multiSchema: Record<string, any> = {};

  const multiShemas = schema.anyOf || schema.oneOf || schema.allOf || [];
  const enumOptions = optionsMuliList(schema);
  const isArraySchema = Array.isArray(multiShemas);

  if (enumOptions.length === 0) {
    throw new Error(`Could not find options in schema "${schemaName}"`);
  }

  const active = isArraySchema
    ? get(rootFormData, [...schemaPath, FIELD_SELECT_NAME], enumOptions[0].value)
    : Object.keys(formData).reduce((prev, key) => {
        if (formData && formData[key]) {
          return key;
        }

        return prev;
      }, enumOptions[0].value);

  const Widget = widgets[widget];
  const isOne = schema.hasOwnProperty('oneOf');
  const allOf = schema.hasOwnProperty('allOf');

  useEffect(() => {
    const { field } = uiPopup;
    const path = [...schemaPath];

    if (!field) return;
    if (!isArraySchema) path.push(active);

    path.push(field);

    const data = get(rootFormData, path);
    if (isObject(data) && data.hasOwnProperty('label')) {
      setPopupLabel(data.label);
    }
  }, [uiPopup, rootFormData, schemaPath, isArraySchema, active]);

  // Очищаем объект со значенниями
  const getClearFormData = () => {
    const currentSchemaPath = [...schemaPath];
    currentSchemaPath.pop();

    const currentFormData = currentSchemaPath.length
      ? get(rootFormData, currentSchemaPath, {})
      : rootFormData;

    if (currentFormData[schemaName]) {
      currentFormData[schemaName] = Object.entries(currentFormData[schemaName]).reduce<
        Record<string, any>
      >((prev, [key, value]) => {
        if (key === FIELD_SELECT_NAME) {
          prev[key] = value;
        }
        return prev;
      }, {});
    }

    return { ...rootFormData };
  };

  const handleOnClear = () => {
    setPopupLabel(undefined);
    onChange(getClearFormData());
  };

  const handleOnSubmit = () => {
    setOpen(false);
  };

  const onClickOpenPopup = () => setOpen(true);
  const onClickClosePopup = () => setOpen(false);

  const onChangeWidget = (widgetName: string, value: string) => {
    const formData = getClearFormData();

    if (isArraySchema) {
      set(formData, [...schemaPath, FIELD_SELECT_NAME], value);
    } else {
      set(formData, [...schemaPath, value], true);
    }

    onChange(formData);
  };

  if (isOne) {
    multiSchema = retrieveSchema(multiShemas[active], rootSchema) || {};
    const path = isArraySchema ? schemaPath : [...schemaPath, active];

    child = (
      <SchemaDefinition
        schema={multiSchema}
        schemaPath={path}
        uiSchema={uiSchema[active] || uiSchema}
        formData={formData}
      />
    );
  } else if (allOf) {
    child = multiShemas.map((schema: any, index: number) => (
      <SchemaDefinition
        key={index}
        schema={schema}
        schemaPath={schemaPath}
        uiSchema={uiSchema}
        formData={formData}
      />
    ));
  }

  const content = (
    <HTMLMulti>
      <HTMLMultiHeader>
        <Widget
          name={schemaName}
          label={schema.title}
          formValue={active}
          options={{ enumOptions }}
          onChange={onChangeWidget}
          uiSchema={uiSchema}
        />
      </HTMLMultiHeader>
      {child && <HTMLMultiBody>{child}</HTMLMultiBody>}
    </HTMLMulti>
  );

  if (isObject(uiPopup)) {
    const { title, width } = uiPopup;

    return (
      <HTMLMultiPopup>
        {popupLabel && <HTMLMultiLabel>{popupLabel}</HTMLMultiLabel>}
        <Button onClick={onClickOpenPopup}>Изменить</Button>
        <Modal isVisible={isOpen} hide={onClickClosePopup} width={width}>
          {title && <HTMLMultiPopupTitle>{title}</HTMLMultiPopupTitle>}
          {content}
          <HTMLFooter>
            <HTMLButtonTrue onClick={handleOnSubmit}>
              <IconCheck style={{ fill: 'currentcolor' }} />
              Сохранить
            </HTMLButtonTrue>
            <HTMLButtonClear onClick={handleOnClear}>
              <IconNa />
              Очистить
            </HTMLButtonClear>
          </HTMLFooter>
        </Modal>
      </HTMLMultiPopup>
    );
  }

  return content;
};
