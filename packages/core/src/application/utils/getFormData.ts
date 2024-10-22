export default (values: string[], type: string = 'ids[]') => {
  const formData = new FormData();
  values.forEach(value => {
    formData.append(type, value);
  });
  return formData;
};
