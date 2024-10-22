import React from 'react';
import { Select} from '../Select'

type Props = {
  setLimit: Function;
  limit: number;
};
export const PaginationLimit = (props: Props) => {
  const { setLimit, limit } = props;

  const limitOptions = [
    {
      label: '10',
      value: 10
    },
    {
      label: '20',
      value: 20
    },
    {
      label: '50',
      value: 50
    }
  ];

  const onChange = (e: HTMLSelectElement) => {
    setLimit(e.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 30 }}>Показывать записей</span>
      <Select
        width={87}
        value={{ label: limit.toString(), value: limit }}
        name="status"
        options={limitOptions}
        onChange={onChange}
        placeholder=""
      />
    </div>
  );
};
