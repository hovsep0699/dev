import React from 'react';
import { Button, ButtonKinds, Icons, Input } from '@distate/components';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import {
  changeContractorsGroupTitle,
  getAddedGroupLegalEntity,
  getAddedGroupNaturalEntity,
  getAddedGroupEmployee,
  newGroupCreate,
  getContractorsGroup,
  setContractorsPaginationGroup
} from '../../store/actions';
import { GroupCardModal } from './modal/GroupCardModal';
import { Pagination } from '../../../../common/pagination';
import { group } from '../../store/selectors';

export const GroupTable = () => {
  const dispatch = useDispatch();
  const {
    rows: groupList,
    recordsTotal: recordsTotalGroups,
    offset: offsetSelector = 0
  } = useSelector(group);
  /** ИД элемента, который редактируется в данный момент */
  const [editingTitleId, setEditingTitleId] = React.useState<number | undefined>();
  /** заголовок, который в данный момент правится */
  const [editingTitile, setEditingTitile] = React.useState<string>();
  /** состояние модалки */
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalId, setModalId] = React.useState<number>();
  const [modalTitle, setModalTitle] = React.useState<string>('');
  /** признак активности кнопки "Добавить группу" */
  const [isAddGroupActive, setIsAddGroupActive] = React.useState(false);
  const [newGroupName, setNewGroupName] = React.useState('');
  /** отступ для пагинации */
  const [offset, setOffset] = React.useState(offsetSelector);

  React.useEffect(() => {
    dispatch(setContractorsPaginationGroup({ offset }));
    dispatch(getContractorsGroup({ offset }));
  }, [dispatch, offset]);

  /** обработка клика кнопки "Изменить заголовок" */
  const onTitleEdit = (id: number) => {
    setEditingTitleId(id);
  };

  /** открытие модалки с карточкой группы */
  const onOpenGroupCard = (id: number, title: string) => {
    setModalId(id);
    setModalTitle(title);
    setIsModalOpen(true);
    dispatch(getAddedGroupLegalEntity({ id }));
    dispatch(getAddedGroupNaturalEntity({ id }));
    dispatch(getAddedGroupEmployee({ id }));
  };

  /** кнопка "Добавить группу" */
  const addNewGroup = () => {
    setIsAddGroupActive(true);
  };

  /** сохранить название новой группы */
  const saveNewGroup = () => {
    dispatch(newGroupCreate({ title: newGroupName, offset }));
    setIsAddGroupActive(false);
    setNewGroupName('');
  };

  /** удалить название новой группы */
  const removeNewGroup = () => {
    setIsAddGroupActive(false);
    setNewGroupName('');
  };

  /** поле для редактирования названия */
  const editField = (id: number, title: string) => {
    if (editingTitile === undefined) {
      setEditingTitile(title);
    }

    /** кнопка "Сохранить" */
    const onChangeTitle = (id: number, title: string) => {
      dispatch(changeContractorsGroupTitle({ id, title }));
      setEditingTitleId(undefined);
      setEditingTitile(undefined);
    };

    return (
      <div className="group-title-edit-wrapper">
        <Input value={editingTitile} onChange={e => setEditingTitile(e.target.value)} />
        <Button
          onClick={() => onChangeTitle(id, editingTitile as string)}
          icon={<Icons.IconCheck fill="currentColor" />}
        >
          Сохранить
        </Button>
      </div>
    );
  };

  /** поле для добавления группы */
  const addGroupField = () => (
    <div style={{ display: 'flex' }}>
      <Input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} width={200} />
      <Button onClick={saveNewGroup} icon={<Icons.IconCheck fill="currentColor" />}>
        Сохранить
      </Button>
      <Button
        icon={<Icons.IconTrash fill="currentColor" />}
        onClick={removeNewGroup}
        kind={ButtonKinds.Danger}
      >
        Удалить
      </Button>
    </div>
  );

  return (
    <>
      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td>Название</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {groupList.map(item => (
            <tr key={item.id}>
              <td>{editingTitleId === item.id ? editField(item.id, item.title) : item.title}</td>
              <td></td>
              <td>
                <div className="group-buttons">
                  <Button
                    onClick={() => onTitleEdit(item.id)}
                    icon={<Icons.IconPencilAlt2 fill="currentColor" />}
                    disabled={editingTitleId === item.id}
                  >
                    Изменить заголовок
                  </Button>
                  <Button
                    onClick={() => onOpenGroupCard(item.id, item.title)}
                    kind={ButtonKinds.Secondary}
                    disabled={editingTitleId === item.id}
                  >
                    Карточка группы
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              {isAddGroupActive ? (
                addGroupField()
              ) : (
                <Button icon={<Icons.IconPlus fill="currentColor" />} onClick={addNewGroup}>
                  Добавить группу
                </Button>
              )}
            </td>
            <td></td>
            <td>
              <div className="pagination-right">
                <Pagination listLength={recordsTotalGroups} setOffset={setOffset} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <GroupCardModal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        onHide={() => setIsModalOpen(false)}
        id={modalId as number}
        title={modalTitle}
      />
    </>
  );
};
