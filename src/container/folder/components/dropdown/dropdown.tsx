import React from 'react';
import { Icons, Dropdown, Loading } from '@distate/components';

import { NEW_FOLDER } from '../../../../common/Lbl';
import { FolderForm } from '../form';
import { FormSubmitAction } from '../../helpers/folder.typings';
import { HTMLContainer, HTMLBody, HTMLDropdown, HTMLButton } from './dropdown.style';

export interface IDropdonw {
  isLoading?: boolean;
  onSubmit?: (values: FormSubmitAction) => void;
  defaultValue?: FormSubmitAction;
}

export const Dropdonw: React.FC<IDropdonw> = ({ isLoading, onSubmit, defaultValue }) => {
  return (
    <HTMLContainer>
      <HTMLDropdown
        width="213px"
        trigger={<HTMLButton solid icon={<Icons.IconPlus fill={'#fff'} />} />}
      >
        {isLoading && <Loading isRelative={false} />}
        <Dropdown.Header>{NEW_FOLDER}</Dropdown.Header>
        <HTMLBody>
          <FolderForm defaultValue={defaultValue} onSubmit={onSubmit} />
        </HTMLBody>
      </HTMLDropdown>
    </HTMLContainer>
  );
};
