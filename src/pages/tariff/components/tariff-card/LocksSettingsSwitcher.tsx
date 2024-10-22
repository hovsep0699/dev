import React from 'react';
import { Button, ButtonKinds } from '@distate/components';

type Props = {
  tariffTypeId: number;
  onChange: Function;
};

type LocksSettingsItem = {
  id: number;
  title: string;
};

const locksSetting: LocksSettingsItem[] = [
  {
    id: 1,
    title: 'блокировать'
  },
  {
    id: 2,
    title: 'переводить на другой тариф'
  }
];

/** Переключатель действия при достижения порога отключения */
export const LocksSettingsSwitcher = (props: Props) => {
  const { onChange, tariffTypeId } = props;

  return (
    <>
      {locksSetting?.map((item: LocksSettingsItem) => {
        const { id, title } = item;

        return (
          <Button
            key={id}
            kind={tariffTypeId === id ? ButtonKinds.Dark : ButtonKinds.Default}
            onClick={() => onChange(id)}
          >
            {title}
          </Button>
        );
      })}
    </>
  );
};
