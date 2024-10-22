import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Grommet } from 'grommet';
import theme from '../src/styles/theme';
import grommetTheme from '../src/styles/grommetTheme';

addParameters({
  backgrounds: [
    { name: 'White', value: '#fff', default: true },
    { name: 'Dark', value: '#333' }
  ]
});

addDecorator(story => (
  <Grommet theme={grommetTheme}>
    <ThemeProvider theme={theme}>{story()}</ThemeProvider>
  </Grommet>
));
