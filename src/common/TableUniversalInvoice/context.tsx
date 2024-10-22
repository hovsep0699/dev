import { createContext } from 'react';

import { ItemData } from './types';
import { defaultData } from './table-universal-invoice';

interface ContextProps {
  values: ItemData;
  [key: string]: any;
}

export const TableContext = createContext<ContextProps>({ values: defaultData });
