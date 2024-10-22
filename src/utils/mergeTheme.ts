const isMain =
  process.env.REACT_APP_FEATURE !== 'contracts' && process.env.REACT_APP_FEATURE !== 'diac';

const merge: any = (theme: any) => {
  return {
    ...theme,
    themeName: isMain ? 'main' : 'dark'
  };
};

export default merge;
