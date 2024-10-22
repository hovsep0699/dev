import React from 'react';
import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import widgets from './widgets';

export interface IContext<T> {
  formName?: string;
  rootSchema?: Schema;
  rootUiSchema?: UISchema;
  rootErrors?: any;
  setErrors?: (errors: any) => void;
  formData?: T;
  onChange?: any;
  onFocus?: EventOnFocus;
  onBlur?: EventOnBlue;
}

export interface FormSchemaProps<T> {
  isCenterFooter?: boolean;
  children?: any;
  className?: string;
  name?: string;
  schema: Schema;
  uiSchema?: UISchema;
  formData?: T;
  errorSchema?: any;
  renderTable?: React.ReactNode;
  onBlur?: EventOnBlue;
  onFocus?: EventOnFocus;
  onError?: (e: any) => any;
  onChange?: EventOnChange<T>;
  onSubmit?: EventOnSubmit<T>;
  onClear?: () => void;
}

export interface FormSchemaDefinition {
  name?: string;
  schema: Schema;
  uiSchema?: UISchema;
  errorSchema?: Record<string, any>;
  [prop: string]: any;
}

export interface FormSchemaObject {
  name?: string;
  className?: string;
  schema?: Schema;
  formData?: Record<string, any>;
  onChange?: (data: Record<string, any>) => void;
  [key: string]: any;
}

export interface FormSchemaString {
  schema: Schema;
}

export type JSONSchemaDefinition = Schema;

// @ts-ignore
export interface Schema extends JSONSchema7 {
  name?: string;
  type?: JSONSchema7TypeName;
  default?: string | number | Date;
  enumNames?: string[];
  items?: JSONSchemaDefinition | JSONSchemaDefinition[];
  properties?: {
    [key: string]: JSONSchemaDefinition;
  };
  anyOf?: JSONSchemaDefinition[] | Record<string, JSONSchemaDefinition>;
  oneOf?: JSONSchemaDefinition[] | Record<string, JSONSchemaDefinition>;
  definitions?: Record<string, Schema>;
}

export type UISchema = UISchemaRules;

export type UISchemaBlock = { title?: string; fields: string[] };

export type UISchemaGroup = {
  type?: 'group' | 'section';
  title?: string;
  border?: boolean;
  order?: string[];
  align?: 'center';
  fields: string[];
};

export type UISchemaRules = {
  'ui:label'?: Record<string, string>;
  'ui:order'?: string[];
  'ui:field'?: Field | string;
  'ui:widget'?: keyof typeof widgets;
  'ui:options'?: {
    widget?: string;
    [key: string]: boolean | number | string | object | any[] | null;
  };
  'ui:group'?: UISchemaGroup[];
  'ui:blocks'?: UISchemaBlock[];
  'ui:description'?: string;
  [name: string]: any;
};

export type Field = React.ComponentClass<FieldProps>;

export interface FieldProps<T = any> {
  formData: T;
}

export type Widget = React.ComponentClass<WidgetProps>;

export interface WidgetProps<T = any> {
  formData: T;
}

export type IChangeEvent<T = any> = {
  formData?: T;
  status?: string;
};

export type ISubmitEvent<T> = IChangeEvent<T>;

export type EventOnBlue = (id: string, value: boolean | number | string | null) => void;
export type EventOnFocus = (id: string, value: boolean | number | string | null) => void;
export type EventOnChange<T> = (e: IChangeEvent<T>) => any;
export type EventOnSubmit<T> = (e: ISubmitEvent<T>) => any;
