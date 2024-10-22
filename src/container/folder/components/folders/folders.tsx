import React from 'react';
import { Button, ButtonKinds, Icons, Modal } from '@distate/components';

import { DELETE, CANCEL } from '../../../../common/Lbl';
import { Folder, FormSubmitAction } from '../../helpers/folder.typings';
import { HTMLContainer } from './folders.style';
import { FoldersItem } from './folders.item';
import { FolderForm } from '../form';

type IFolder = {
  editor?: boolean;
} & Folder;

export interface IFolders {
  isVisible?: boolean;
  isLoading?: boolean;
  offVisible?: boolean;
  onClick?: (id: string) => void;
  onRemove?: (id: string) => void;
  onSubmit?: (values: FormSubmitAction) => void;
  link: string;
  items: IFolder[];
}

export const Folders: React.FC<IFolders> = React.memo(
  ({ link, items, offVisible, onRemove, onClick, onSubmit, isVisible }) => {
    const [removeId, setRemoveId] = React.useState('');

    const [list, setList] = React.useState(items);

    React.useEffect(() => {
      setList(
        items.map(item => ({
          ...item,
          editor: false,
          visible: offVisible ? true : item.visible
        }))
      );
    }, [items, offVisible]);

    const [openModal, setOpenModal] = React.useState(isVisible);

    const handleOnClicRemove = (id: string) => {
      setOpenModal(true);
      setRemoveId(id);
    };

    const handleOnClickEdit = (id: string) => {
      const newList = list.map(item => {
        if (item.id === id) {
          item.editor = true;
        } else {
          item.editor = false;
        }

        return item;
      });

      setList(newList);
    };

    const handleOnSubmit = (values: FormSubmitAction) => {
      const { id } = values;

      const newList = list.map(item => (item.id === id ? { ...values, id, editor: false } : item));
      setList(newList);

      if (onSubmit) onSubmit(values);
    };

    const handleOnRemove = () => {
      if (onRemove && removeId) onRemove(removeId);

      setOpenModal(false);
      setRemoveId('');
    };

    return (
      <HTMLContainer>
        {list.map(item => {
          const { editor } = item;

          if (editor) {
            return (
              <FolderForm
                dark
                key={item.id}
                onSubmit={handleOnSubmit}
                defaultValue={{
                  id: item.id,
                  title: item.title
                }}
              />
            );
          }

          return (
            <FoldersItem
              key={item.id}
              link={link}
              item={item}
              onEdit={handleOnClickEdit}
              onClick={onClick}
              onRemove={handleOnClicRemove}
            />
          );
        })}
        <Modal hide={() => setOpenModal(false)} isVisible={openModal}>
          <Modal.Header title={'Вы действительно хотите удалить эту папку?'} />
          <Modal.Footer>
            <Button kind={ButtonKinds.Primary} icon={<Icons.IconCheck />} onClick={handleOnRemove}>
              {DELETE}
            </Button>
            <Button icon={<Icons.IconClose />} onClick={() => setOpenModal(false)}>
              {CANCEL}
            </Button>
          </Modal.Footer>
        </Modal>
      </HTMLContainer>
    );
  }
);
