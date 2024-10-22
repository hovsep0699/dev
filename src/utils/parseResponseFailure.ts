export const parseResponseFailure = (response: any): any => {
  if (!response || !response.messages) return response;

  const parse = (obj: any, parentKey?: string) => {
    const keys = Object.keys(obj);
    let result: string[] = [];

    keys.forEach(key => {
      const item = obj[key];

      if (item && item.hasOwnProperty('errors') && Array.isArray(item.errors)) {
        const newKey = [parentKey, key].filter(Boolean).join('.');
        item.errors.forEach((error: string) => result.push(`${newKey}: ${error}`));
      } else {
        result = [...result, ...parse(item, key)];
      }
    });

    return result;
  };

  if (Array.isArray(response.messages)) {
    return response.messages;
  }

  return parse(response.messages);
};
