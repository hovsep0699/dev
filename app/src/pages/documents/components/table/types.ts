import React from 'react';

export type ITable<C = any, R = any> = {
  isLoading?: boolean;
  isNextLoading?: boolean;
  hasMore?: boolean;
  onMore?: () => void;
  columns: IColumn<C>[];
  offset?: number;
  limit?: number;
  rows: Array<R>;
  classNameRow?: any;
  emptyTitle?: string;
};

export type IColumn<R = any> = {
  width?: string;
  property: string;
  format?: (value: any, item: R, index: number) => React.ReactNode | string | number;
  header?: any;
  footer?: any;
  align?: 'center' | 'end';
};

export type IContext<T = any, D = any> = {
  isLoading?: boolean;
  isNextLoading?: boolean;
  hasMore?: boolean;
  rows: Array<T>;
  onMore: () => void;
  offset?: number;
  limit?: number;
  columns: IColumn<D>[];
  emptyTitle?: string;
  classNameRow?: (item: T, index: number, rows: Array<T>) => string | undefined;
};
