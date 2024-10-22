import React from 'react';
import { IContext } from './typings';

const DefaultContext = {};

export const Context = React.createContext<Partial<IContext<any>>>(DefaultContext);

export const Provider = Context.Provider;
