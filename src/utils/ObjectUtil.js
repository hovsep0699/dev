import deepmerge from 'deepmerge';
import rfdc from 'rfdc';

export const isObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export const removeEmpty = obj => {
  const newObj = {};

  Object.keys(obj).forEach(key => {
    if(key.startsWith('__')) {
      return;
    } else if (isObject(obj[key])) {
      const cleanedObj = removeEmpty(obj[key]); 

      if (Object.keys(cleanedObj).length) {
        newObj[key] = cleanedObj;
      }
    } else if(Array.isArray(obj[key])) {
      const arr = obj[key].map(item => {
        if(isObject(item)) return removeEmpty(item);
        return item;
      }).filter(item => {
        if( isObject(item) && Object.keys(item).length) return true 
        if(!isObject(item)) return true;
        return false ;
      });

      if(arr.length) {
        newObj[key] = arr
      }      
    } else if (obj[key] != null && obj[key] !== '') {
      newObj[key] = obj[key]; // copy value
    }
  });
  
  return newObj;
};

export const combineMerge = (target, source, options) => {
  const destination = target.slice();

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};

export const clone = rfdc();
