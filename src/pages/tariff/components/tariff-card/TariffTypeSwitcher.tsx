import React from 'react';
import { useSelector } from 'react-redux';

import { Button, ButtonKinds } from '@distate/components';
import { tariffTypesSelector } from '../../store/selects';

type Props = {
  onChange: Function;
  tariffTypeId?: number;
};

export const TariffTypeSwitcher = (props: Props) => {
  const { onChange, tariffTypeId } = props;

  const tariffTypes = useSelector(tariffTypesSelector);

  return (
    <>
      {tariffTypes?.map((item: any) => {
        const { id, title } = item;

        return (
          <Button
            key={id}
            kind={tariffTypeId === id ? ButtonKinds.Dark : ButtonKinds.Default}
            onClick={() => onChange(item)}
          >
            {title}
          </Button>
        );
      })}
    </>
  );
};
