import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Loading from './Loading';
import { Box } from 'grommet';

export default {
  title: 'Loading',
  component: Loading,
  decorators: [withA11y, withKnobs]
};

export const Default = () => (
  <Box height="small" background="grey">
    <Loading isRelative={boolean('Is Relative', true)} height={text('Height', '100%')} />
  </Box>
);
