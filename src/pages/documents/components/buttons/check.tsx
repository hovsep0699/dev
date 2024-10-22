import React from 'react';
import { Button, ButtonKinds, Icons } from '@distate/components';

import { SEND } from '../../../../common/Lbl';

export interface IButtonCheckProps {
  onClick: () => void;
}

const ButtonCheck: React.FC<IButtonCheckProps> = ({ onClick, children }) => {
  return (
    <Button
      icon={<Icons.IconCheck fill="currentColor" />}
      kind={ButtonKinds.Primary}
      onClick={onClick}
    >
      {children || SEND}
    </Button>
  );
};

export { ButtonCheck };
