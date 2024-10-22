import React from 'react';
import { Loading } from '@distate/components';

import { ITable } from './types';
import { Body } from './body';
import { isElementVisible } from './utils';
import { TableContextProvider } from './context';
import {
  HTMLTableHeader,
  HTMLTableFooter,
  HTMLContainer,
  HTMLTableRow,
  HTMLTableCell,
  HTMLTable,
  HTMLFooter,
  HTMLFooterItem,
  HTMLFooterButton
} from './table.style';

let timeout: any = null;

export const Table: React.FC<ITable> = ({
  isLoading = false,
  isNextLoading = false,
  hasMore = false,
  rows,
  limit,
  offset,
  columns,
  emptyTitle,
  classNameRow,
  onMore = () => {}
}) => {
  const node = React.useRef<HTMLTableCellElement>(null);

  React.useLayoutEffect(() => {
    const { current } = node;
    if (!current) return;

    const callback = () => {
      const visible = isElementVisible(node.current);
      if (visible && hasMore && !isNextLoading) {
        onMore();
      }
      timeout = null;
    };

    const onVisibilityChange = () => {
      if (timeout === null) {
        timeout = setTimeout(callback, 100);
      }
    };

    onVisibilityChange();

    window.addEventListener('resize', onVisibilityChange);
    window.addEventListener('scroll', onVisibilityChange);

    return () => {
      timeout = null;
      window.removeEventListener('resize', onVisibilityChange);
      window.removeEventListener('scroll', onVisibilityChange);
    };
  }, [hasMore, isNextLoading, onMore]);

  return (
    <TableContextProvider
      value={{
        rows,
        limit,
        isLoading,
        isNextLoading,
        hasMore: !!hasMore,
        offset,
        onMore,
        columns,
        emptyTitle,
        classNameRow
      }}
    >
      <HTMLContainer>
        <HTMLTable>
          <colgroup>
            {columns.map(({ property, width }) => (
              <col key={property} width={width} />
            ))}
          </colgroup>
          <HTMLTableHeader>
            <HTMLTableRow>
              {columns.map(({ property, header, align }) => {
                return (
                  <HTMLTableCell key={property} alignBlock={align}>
                    {header}
                  </HTMLTableCell>
                );
              })}
            </HTMLTableRow>
          </HTMLTableHeader>
          <Body />
          <HTMLTableFooter>
            <HTMLTableRow>
              <HTMLTableCell ref={node} colSpan={columns.length}>
                <HTMLFooter>
                  <HTMLFooterItem>Всего записей: {rows.length}</HTMLFooterItem>
                  <HTMLFooterItem style={{ width: '100%' }}>
                    {isNextLoading && <Loading isRelative={true} height="18px" />}
                  </HTMLFooterItem>
                  <HTMLFooterItem>
                    {hasMore && <HTMLFooterButton onClick={onMore}>Загрузить еще</HTMLFooterButton>}
                  </HTMLFooterItem>
                </HTMLFooter>
              </HTMLTableCell>
            </HTMLTableRow>
          </HTMLTableFooter>
        </HTMLTable>
      </HTMLContainer>
    </TableContextProvider>
  );
};
