import React from 'react';
import { Button, Icons } from '@distate/components';

import { UPDATE } from '../../../../common/Lbl';

export interface IButtonUpdateProps {
  loading: boolean;
  onClick: () => void;
}

const ButtonUpdate: React.FC<IButtonUpdateProps> = ({ loading, onClick }) => {
  return (
    <Button onClick={onClick} icon={<Icons.IconReload fill="currentColor" />} busy={loading}>
      {UPDATE}
    </Button>
  );
};

export { ButtonUpdate };
