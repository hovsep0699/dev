import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icons, Input } from '@distate/components';
import { changeStaffRoleTitle } from '../../store/actions';

type Props = {
  id: number;
  title: string;
  setEditingTitleId: Function;
};
/** форма редактирования заголовка роли */
export const EditRoleTitleForm = (props: Props) => {
  const { title, id, setEditingTitleId } = props;
  const [newTitle, setNewTitle] = useState<string>();

  const dispatch = useDispatch();

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const onSave = () => {
    dispatch(changeStaffRoleTitle({ id, title: newTitle }));
    setEditingTitleId(undefined);
  };

  return (
    <td colSpan={2}>
      <div style={{ display: 'flex' }}>
        <Input
          width={500}
          value={newTitle}
          onChange={e => {
            setNewTitle(e.target.value);
          }}
        />
        <Button icon={<Icons.IconCheck fill="currentColor" />} onClick={onSave}>
          Сохранить
        </Button>
      </div>
    </td>
  );
};
