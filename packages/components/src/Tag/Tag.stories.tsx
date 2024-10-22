import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text } from '@storybook/addon-knobs';
import Tag, { TagKinds } from './Tag';
import { Box } from 'grommet';

export default {
  title: 'Tag',
  component: Tag,
  decorators: [withA11y, withKnobs]
};

export const Default = () => (
  <Box align="center" margin="xlarge">
    <Tag kind={(text('Success', 'success') as unknown) as TagKinds}>New</Tag>
  </Box>
);
