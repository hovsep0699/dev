import { isObject } from './ObjectUtil';

export type Error = {
  name?: string;
  code: string;
  paths: string[];
  error: string;
  message: string;
};

export type ValidateMessage = {
  [key: string]: {
    name?: string;
    children?: ValidateMessage;
  };
};

export function transformerErrors(data: any, validateMessages: ValidateMessage = {}): Error[] {
  const list = parseError(data, validateMessages);
  return list.filter(
    (value, index, array) => array.findIndex(arr => arr.message === value.message) === index
  );
}

function parseError(errors: any, messages: any = {}, paths: any = []): Error[] {
  const list: Error[] = [];

  if (isObject(errors)) {
    Object.entries(errors).forEach(([key, error]: any) => {
      const dataMessage = messages?.[key] || {};
      const fieldName = dataMessage?.name;

      if (Array.isArray(error.errors)) {
        error.errors.forEach((str: string) => {
          const message = fieldName ? `${fieldName}: ${str}` : `${key}: ${str}`;
          list.push({
            name: fieldName,
            code: key,
            error: str,
            paths: [...paths, key],
            message
          });
        });
      } else {
        list.push(...parseError(error, dataMessage?.children, [...paths, key]));
      }
    });

    return list.filter(Boolean);
  } else if (Array.isArray(errors)) {
    errors.forEach(error => {
      list.push(...parseError(error, messages, paths));
    });
  }

  return list;
}
