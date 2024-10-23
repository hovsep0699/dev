import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Dropdown from './Dropdown';
import Button from '../Button';
import { Box } from 'grommet';
import { Placement } from '../types';

export default {
  title: 'Dropdown',
  decorators: [withKnobs]
};

export const Default = () => {
  const placementValue = select('Placement', Placement, Placement.BOTTOM_LEFT);

  return (
    <Box align="center" margin="xlarge">
      <Dropdown trigger={<Button>Trigger</Button>} placement={placementValue}>
        <Dropdown.Header>Документы</Dropdown.Header>
      </Dropdown>
    </Box>
  );
};
