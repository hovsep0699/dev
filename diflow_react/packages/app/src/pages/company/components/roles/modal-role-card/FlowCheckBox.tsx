import React, { useState, useEffect } from 'react';

import { Box } from 'grommet';
import { CheckBox } from '@distate/components';

type Props = {
  title: string;
  enabled: boolean;
  id: number;
  checked: number[];
  setChecked: Function;
};

/** Чекбокс для документооборота */
export const FlowCheckBox = (props: Props) => {
  const { title, enabled, id, checked, setChecked } = props;
  const [currentChecked, setCurrentChecked] = useState(enabled);
  useEffect(() => {
    setCurrentChecked(enabled);
  }, [enabled]);

  const onCheckBoxChange = (id: number) => {
    if (currentChecked) {
      const clearedArr = checked?.filter(item => item !== id);
      setChecked(clearedArr);
      setCurrentChecked(!currentChecked);
    } else {
      const extendedArr = [...checked, id];
      setChecked(extendedArr);
      setCurrentChecked(!currentChecked);
    }
  };

  return (
    <Box pad="xxsmall" key={title} style={{ marginBottom: 3 }}>
      <CheckBox label={title} checked={currentChecked} onChange={() => onCheckBoxChange(id)} />
    </Box>
  );
};
