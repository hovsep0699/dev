import React from 'react';

import { Group } from '@distate/components/dist/Group';
import { DatePicker } from './DatePicker';

export default {
  title: 'DatePicker'
};

export const Default = () => {
  return (
    <DatePicker
      required
      name="from"
      label="Дата"
      value={new Date()}
      placeholderText="Формат: ДД.ММ.ГГГГ"
      onChange={() => {}}
    />
  );
};

export const Groups = () => {
  const [start, setState] = React.useState<any>(null);
  const [end, setEnd] = React.useState<any>(new Date());

  const onChangeStartHandle = (date: any) => setState(date);
  const onChangeEndHandle = (date: any) => setEnd(date);

  return (
    <Group>
      <DatePicker
        selectsStart
        name="from"
        label="Создано с"
        value={start}
        startDate={start}
        endDate={end}
        placeholderText="Формат: ДД.ММ.ГГГГ"
        onChange={onChangeStartHandle}
      />
      <DatePicker
        selectsEnd
        name="to"
        label="по"
        value={end}
        startDate={start}
        endDate={end}
        minDate={start}
        placeholderText="Формат: ДД.ММ.ГГГГ"
        onChange={onChangeEndHandle}
      />
    </Group>
  );
};
