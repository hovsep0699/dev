import React from 'react';
import './style.css';

/** ряд */
type Row = {
  id?: string | number;
  /** заголовок */
  title?: string;
  /** значение */
  value?: any;
  /** флаг - обязательно для заполнения */
  required?: boolean;
  /** дополнительная информация */
  info?: string;
};

type Props = {
  /** ряды */
  rows: Row[];
  /** выравнивание заголовков */
  alignTitle?: 'left' | 'center' | 'right';
  /** выравнивание значений */
  alignValue?: 'left' | 'center' | 'right';
};

enum AlignEnum {
  'left' = 'flex-start',
  'center' = 'center',
  'right' = 'flex-end'
}

/** Таблица */
export const CustomTable = (props: Props) => {
  const { rows, alignTitle = 'left' } = props;

  return (
    <div className="custom_table">
      {rows.map((item: Row) => {
        const { id, title, value, required, info } = item;
        const key = id || title;
        const rowTitleClass = required
          ? 'custom_table-td custom_table-row-title required'
          : 'custom_table-td custom_table-row-title';

        const rowTitleStyle = {
          justifyContent: AlignEnum[alignTitle]
        };

        return (
          <div key={key} className="custom_table-row">
            <div className={rowTitleClass} style={rowTitleStyle}>
              {title}
            </div>
            <div className="custom_table-td custom_table-row-value" title={info}>
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
