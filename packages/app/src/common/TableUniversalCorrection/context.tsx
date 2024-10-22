import { createContext } from 'react';

import { defaultData } from './table-universal-correction';

interface ContextProps {
  values: any;
  [key: string]: any;
}

export const TableContext = createContext<ContextProps>({ values: defaultData });
