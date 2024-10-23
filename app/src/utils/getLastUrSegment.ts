export default (path: string) => {
  const folderUrlParts = path.split('/');
  const param = folderUrlParts.pop();
  const url = folderUrlParts.join('/');

  return { param, url };
};
