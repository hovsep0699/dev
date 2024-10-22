import React from 'react';
import { Button, Icons } from '@distate/components';

import { CANCEL } from '../../../../common/Lbl';

export interface IButtonCancelProps {
  onClick: () => void;
}

const ButtonCancel: React.FC<IButtonCancelProps> = ({ onClick }) => {
  return (
    <Button icon={<Icons.IconClose />} onClick={onClick}>
      {CANCEL}
    </Button>
  );
};

export { ButtonCancel };
