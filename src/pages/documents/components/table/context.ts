import React from 'react';

import { IContext } from './types';

const defaultContext: IContext = {
  rows: [],
  columns: [],
  onMore: () => {}
};

export const TableContext = React.createContext(defaultContext);

export const TableContextProvider = TableContext.Provider;
