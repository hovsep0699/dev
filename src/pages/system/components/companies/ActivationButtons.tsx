import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icons, ButtonKinds } from '@distate/components';
import { companyActivation, companyDelete } from '../../store/actions';

type Props = {
  id: number;
};

export const ActivationButtons = (props: Props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const onActivation = () => {
    dispatch(companyActivation(id));
  };

  const onDelete = () => {
    dispatch(companyDelete(id));
  };

  return (
    <div>
      <Button
        icon={<Icons.IconCheck fill="currentColor" />}
        kind={ButtonKinds.LightGreen}
        onClick={onActivation}
      >
        Активировать
      </Button>
      <Button
        icon={<Icons.IconClose fill="currentColor" />}
        kind={ButtonKinds.Danger}
        onClick={onDelete}
      >
        Удалить
      </Button>
    </div>
  );
};
