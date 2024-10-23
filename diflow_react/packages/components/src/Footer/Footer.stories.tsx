import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Footer from './Footer';
import { Box } from 'grommet';

export default {
  title: 'Footer',
  component: Footer,
  decorators: [withA11y, withKnobs]
};

export const Default = () => (
  <Box align="center" margin="xlarge" style={{ position: 'relative' }}>
    <Footer hasIncreasedIndent={boolean('Has increased indent', false)} />
  </Box>
);

export const Centered = () => (
  <Box align="center" margin="xlarge" style={{ position: 'relative' }}>
    <Footer centered />
  </Box>
);
