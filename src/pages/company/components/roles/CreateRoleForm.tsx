import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonKinds, Icons, Input } from '@distate/components';
import { createStaffRole } from '../../store/actions';

type Props = {
  setIsOpenCreateForm: Function;
}
/** форма создания роли */
export const CreateRoleForm = (props: Props) => {
  const { setIsOpenCreateForm } = props;
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const onSave = () => {
    dispatch(createStaffRole({ title }));
    setIsOpenCreateForm(false);
  }

  const onReset = () => {
    setIsOpenCreateForm(false);
  }

  return (
    <td>
      <div style={{display: 'flex'}}>
        <Input
          width={500}
          value={title}
          onChange={(e) => {setTitle(e.target.value)}} />
        <Button
          icon={<Icons.IconCheck fill="currentColor" />}
          onClick={onSave}
        >
          Сохранить
        </Button>
        <Button
          icon={<Icons.IconTrash fill="currentColor" />}
          kind={ButtonKinds.Danger}
          onClick={onReset}
        >
          Удалить
        </Button>
      </div>
    </td>
  )
}
