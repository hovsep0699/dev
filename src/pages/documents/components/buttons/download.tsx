import React from 'react';
import { Button, Icons } from '@distate/components';

import { DOWNLOAD } from '../../../../common/Lbl';

export interface IButtonDownloadProps {
  solid?: boolean;
  loading: boolean;
  onClick: () => void;
}

const ButtonDownload: React.FC<IButtonDownloadProps> = ({ loading, onClick, solid }) => {
  const [stateLoading, setStateLoading] = React.useState(loading);

  React.useEffect(() => {
    if (!loading && stateLoading) {
      setStateLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleOnClick = () => {
    setStateLoading(true);
    onClick();
  };

  return (
    <Button
      solid={solid}
      onClick={handleOnClick}
      icon={<Icons.IconDownload fill="currentColor" />}
      busy={loading && stateLoading ? true : false}
    >
      {solid ? '' : DOWNLOAD}
    </Button>
  );
};

export { ButtonDownload };
