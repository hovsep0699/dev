import { Schema, UISchema, UISchemaGroup, UISchemaBlock } from './typings';
import widgets from './widgets';
import get from 'lodash.get';

export const COMPONENT_TYPE: { [name: string]: string } = {
  string: 'Input',
  array: 'Select',
  number: 'Input',
  boolean: 'CheckBox',
  date: 'DatePicker'
};

export function isRequired(name: string, schema: Schema): boolean {
  return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
}

export function parseSchema(schema: Record<string, any>): Record<string, any> {
  const { format } = schema;

  let defautlWidget = 'button';

  if (format && hasWidget(format)) {
    defautlWidget = format;
  }

  return { defautlWidget };
}

export function parseUISchema(uiSchema: Record<string, any>): Record<string, any> {
  if (!uiSchema || !isObject(uiSchema)) {
    return {};
  }
  return {};
}

export function isSchemaItemsArray(schema: any) {
  return (
    Array.isArray(schema.items) &&
    schema.items.lenght > 0 &&
    schema.items.every((item: any) => isObject(item))
  );
}

export function getFields(): { [name: string]: string } {
  return {
    Input: require('../Input').default,
    Select: require('../Select').default,
    CheckBox: require('../CheckBox').default,
    DatePicker: require('../DatePicker').default
  };
}

export function getType(type: any, format?: any) {
  if (type === 'string' && format === 'date') {
    return 'date';
  }

  return type;
}

export function isSelect(schema: any) {
  if (Array.isArray(schema.enum)) {
    return true;
  }

  return false;
} 

export function optionsMuliList(schema: Schema) {
  const list = schema.oneOf || schema.anyOf;

  if (Array.isArray(list)) {
    return list.map(({ title, name }, i) => ({
      label: title || `Option ${i + 1}`,
      value: String(i)
    }));
  }

  if (list !== null && typeof list === 'object') {
    let index = -1;
    return Object.entries(list).map(([key, { title }]: any) => {
      index++;

      return {
        label: title || `Option ${index + 1}`,
        value: key
      };
    });
  }

  return [];
}

export function optionsList(schema: UISchema) {
  if (schema.enum) {
    return schema.enum.map((value: any, i: number) => {
      const label = (schema.enumNames && schema.enumNames[i]) || String(value);
      return { label, value };
    });
  }

  return {};
}

export function hasWidget(format: string) {
  const name = format.replace(/-/g, '');
  if (name in widgets) {
    return true;
  }

  return false;
}

export function getValue(formData: Record<string, unknown>) {}

type Options = {
  widget?: keyof typeof widgets;
  [name: string]: any;
};

export function getOptions(uiSchema: UISchema): Options {
  if (!uiSchema || !isObject(uiSchema)) {
    return {};
  }

  let UISchema = {};

  if (uiSchema.hasOwnProperty('ui:widget')) {
    UISchema = { widget: uiSchema['ui:widget'] };
  }

  if (!uiSchema.hasOwnProperty('ui:options')) {
    return UISchema;
  }

  // @ts-ignore
  return { ...UISchema, ...uiSchema['ui:options'] };
}

export function getWidget(widget: string) {
  const name = widget.replace(/-/g, '');
  if (!hasWidget(name)) {
    throw new Error(`No widget for type "${widget}"`);
  }

  // @ts-ignore
  return widgets[name];
}

export function isObject(thing: any): thing is Record<string, any> {
  return typeof thing === 'object' && thing !== null && !Array.isArray(thing);
}

export function arrayToHash<A>(arr: A) {
  if (!Array.isArray(arr)) {
    throw new Error('not an array');
  }

  return arr.reduce<Record<string, boolean>>((prev, curr) => {
    prev[curr] = true;
    return prev;
  }, {});
}

export function groupProperties(
  properties: string[],
  groupSchema: UISchemaGroup[]
): { properties: string[]; group?: any } {
  if (!Array.isArray(groupSchema) || !Array.isArray(properties)) {
    return { properties, group: {} };
  }

  let groupFilter: string[] = [];
  const group = groupSchema.reduce<Record<string, any>>((prev, curr) => {
    const [name, ...fields] = curr.fields;
    prev[name] = { ...curr, fields };
    groupFilter = [...groupFilter, ...fields];

    return prev;
  }, {});

  const groupFilterHash = arrayToHash(groupFilter);
  const groupProperty = properties.filter(prop => !groupFilterHash[prop]);

  return { properties: groupProperty, group };
}

export function dependenciesProperties<P, D>(schema: P, formData: D): any[] {
  const properties = get(schema, 'properties', {});

  if (!Object.keys(properties).length) {
    return [];
  }

  return Object.entries(properties).reduce((prev, [key, propSchema]) => {
    if (propSchema && propSchema.hasOwnProperty('dependencies')) {
      const { dependencies } = propSchema as any;
      Object.keys(dependencies).forEach(propKey => {
        const formValue = get(formData, propKey);
        if (
          Array.isArray(dependencies[propKey]) &&
          dependencies[propKey].indexOf(formValue) !== -1
        ) {
          prev.push(key);
        } else if (
          typeof dependencies[propKey] === 'string' &&
          dependencies[propKey] === formValue
        ) {
          prev.push(key);
        } else if (
          typeof dependencies[propKey] === 'number' &&
          dependencies[propKey] === formValue
        ) {
          prev.push(key);
        }
      });
    } else {
      prev.push(key);
    }

    return prev;
  }, []);
}

export function orderProperties<P, O>(properties: P, orders: O) {
  if (!Array.isArray(orders) || orders.length === 0 || !Array.isArray(properties)) {
    return properties;
  }

  const propertyHash = arrayToHash(properties);
  const orderFiltered = orders.filter(prop => prop === '*' || propertyHash[prop]);
  const orderHash = arrayToHash(orderFiltered);

  const rest = properties.filter(prop => !orderHash[prop]);
  const restIndex = orderFiltered.indexOf('*');

  if (restIndex === -1 && rest.length) {
    throw new Error('uiSchema order list does not contain');
  }

  if (restIndex === -1) {
    return orderFiltered;
  }

  if (restIndex !== orderFiltered.lastIndexOf('*')) {
    throw new Error('uiSchema order list contains more than one wildcard item');
  }

  const complete = [...orderFiltered];
  complete.splice(restIndex, 1, ...rest);

  return complete;
}

export function retrieveSchema(schema: Schema, rootSchema: Schema = {}) {
  if (!isObject(schema)) {
    return {};
  }

  return resolveSchema(schema, rootSchema);
}

export function resolveSchema(schema: Schema, rootSchema: Schema = {}) {
  if (schema.hasOwnProperty('$ref')) {
    return resolveReference(schema, rootSchema);
  } else if (schema.hasOwnProperty('dependencies')) {
    const resolvedSchema = resolveDependencies(schema, rootSchema);
    return resolveDependencies(resolvedSchema, rootSchema);
  }

  return schema;
}

export function resolveReference(schema: Schema, rootSchema: Schema = {}): Schema {
  let schemaRef = {};
  const { $ref, ...baseSchema } = schema;

  if (typeof $ref === 'string' && $ref.startsWith('#')) {
    const path = $ref.substring(1).split('/');
    schemaRef = get(rootSchema, path, {});
    schemaRef = { ...baseSchema, ...schemaRef };
  } else {
    throw new Error(`Could not find a definition for ${$ref}.`);
  }

  if (schemaRef === undefined) {
    throw new Error(`Could not find a difinition for ${$ref}.`);
  }

  if (schemaRef.hasOwnProperty('$ref')) {
    return resolveReference(schemaRef);
  }

  return schemaRef;
}

export function resolveDependencies(schema: Schema, rootSchema: Schema = {}): Schema {
  return schema;
}

function isArguments(object: any) {
  return Object.prototype.toString.call(object) === '[object Arguments]';
}

export function deepEquals(a: any, b: any, ca: any[] = [], cb: any[] = []): boolean {
  // Partially extracted from node-deeper and adapted to exclude comparison
  // checks for functions.
  // https://github.com/othiym23/node-deeper
  if (a === b) {
    return true;
  } else if (typeof a === 'function' || typeof b === 'function') {
    return true;
  } else if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  } else if (a === null || b === null) {
    return false;
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  } else if (a instanceof RegExp && b instanceof RegExp) {
    return (
      a.source === b.source &&
      a.global === b.global &&
      a.multiline === b.multiline &&
      a.lastIndex === b.lastIndex &&
      a.ignoreCase === b.ignoreCase
    );
  } else if (isArguments(a) || isArguments(b)) {
    if (!(isArguments(a) && isArguments(b))) {
      return false;
    }
    let slice = Array.prototype.slice;
    return deepEquals(slice.call(a), slice.call(b), ca, cb);
  } else {
    if (a.constructor !== b.constructor) {
      return false;
    }

    let ka = Object.keys(a);
    let kb = Object.keys(b);

    if (ka.length === 0 && kb.length === 0) {
      return true;
    }
    if (ka.length !== kb.length) {
      return false;
    }

    let cal = ca.length;
    while (cal--) {
      if (ca[cal] === a) {
        return cb[cal] === b;
      }
    }
    ca.push(a);
    cb.push(b);

    ka.sort();
    kb.sort();
    for (var j = ka.length - 1; j >= 0; j--) {
      if (ka[j] !== kb[j]) {
        return false;
      }
    }

    let key;
    for (let k = ka.length - 1; k >= 0; k--) {
      key = ka[k];
      if (!deepEquals(a[key], b[key], ca, cb)) {
        return false;
      }
    }

    ca.pop();
    cb.pop();

    return true;
  }
}

const formatDateKeys: any = {
  d: 'day',
  M: 'month',
  y: 'year',
  m: 'minutes',
  s: 'seconds',
  h: 'hours'
};

export function dateFormat(date: Date, format: any = 'dd.MM.yyyy') {
  if (!(date instanceof Date)) {
    return date;
  }

  const formatNumber = (str: any) => `00${str}`.slice(-2);

  const dataDate: any = {
    day: formatNumber(date.getDate()),
    month: formatNumber(date.getMonth() + 1),
    year: date.getFullYear(),
    minutes: formatNumber(date.getMinutes()),
    seconds: formatNumber(date.getSeconds()),
    hours: formatNumber(date.getHours())
  };

  let strDate = '';
  let countIndex: any = {};
  for (const index in format) {
    const key = formatDateKeys[format[index]];
    if (key && key in dataDate) {
      const str = String(dataDate[key]);
      const i = countIndex[key] || 0;

      strDate += str[i];
      countIndex[key] = i + 1;
    } else {
      strDate += format[index];
    }
  }

  return strDate;
}

export function dateParse(str: any, format: any = 'dd.MM.yyyy'): Date {
  if (!str) {
    return;
  }

  if (str instanceof Date) {
    return str;
  }

  const date: any = { day: '', month: '', year: '', minutes: '', seconds: '', hours: '' };

  for (const index in format) {
    const key = formatDateKeys[format[index]];
    if (key && key in date && str[index] && /\d/.test(str[index])) {
      date[key] += str[index];
    }
  }

  return new Date(
    date.year,
    parseInt(date.month) - 1,
    date.day,
    date.hours,
    date.minutes,
    date.seconds
  );
}
