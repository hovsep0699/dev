import React from 'react';
import CheckBox from '../CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox
};

export const Default = () => {
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event: any) => {
    setChecked(event.target.checked);
  };

  return (
    <CheckBox checked={checked} onChange={handleCheckboxChange}>
      Check Me
    </CheckBox>
  );
};
