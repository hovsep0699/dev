import React from 'react';
import cn from 'classnames';

import { HTMLTableCell, HTMLTableRow, HTMLTableBody } from './table.style';
import { TableContext } from './context';

export type IBody = {};

export const Body: React.FC<IBody> = () => {
  const { isLoading, rows, columns, emptyTitle = 'Список пуст.', classNameRow } = React.useContext(
    TableContext
  );

  const renderEmpty = () => {
    if (rows.length) return null;

    return (
      <HTMLTableRow>
        <HTMLTableCell colSpan={columns.length}>{isLoading ? null : emptyTitle}</HTMLTableCell>
      </HTMLTableRow>
    );
  };

  return (
    <HTMLTableBody className="table-body">
      {renderEmpty()}
      {rows.map((item: any, index: any) => {
        const key = 'id' in item ? String(item.id) : String(index);
        const className = classNameRow && classNameRow(item, index, rows);

        return (
          <HTMLTableRow key={key} className={cn('table-row', className)}>
            {columns.map(({ property, format, align }) => {
              const value = item.hasOwnProperty(property) ? item[property] : undefined;

              if (!format) {
                return (
                  <HTMLTableCell key={property} alignBlock={align} className="table-cell">
                    {value}
                  </HTMLTableCell>
                );
              }

              return (
                <HTMLTableCell key={property} alignBlock={align} className="table-cell">
                  {format(value, item, index)}
                </HTMLTableCell>
              );
            })}
          </HTMLTableRow>
        );
      })}
    </HTMLTableBody>
  );
};
