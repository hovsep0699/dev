import React, { useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, select, text, radios, boolean, number } from '@storybook/addon-knobs';
import Button, { ButtonKinds, ButtonSizes } from './Button';
import {
  IconTrash,
  IconBell,
  IconDownload,
  IconReload,
  IconArchive,
  IconTag,
  IconShare
} from '../icons';
import { Box } from 'grommet';
import Badge from '../Badge';
import { debounce } from 'throttle-debounce';

export default {
  title: 'Button',
  component: Button,
  decorators: [withA11y, withKnobs]
};

export const Default = () => (
  <Box align="center" margin="xlarge">
    <Button
      onClick={action('clicked')}
      kind={radios('Kind', ButtonKinds, ButtonKinds.Default)}
      size={select('Size', ButtonSizes, ButtonSizes.Default)}
      disabled={boolean('Disabled', false)}
    >
      {text('Text', 'Button')}
    </Button>
  </Box>
);

export const WithBadge = () => (
  <Box align="center" margin="xlarge">
    <Badge digit={number('Badge', 99)}>
      <Button
        onClick={action('clicked')}
        kind={radios('Kind', ButtonKinds, ButtonKinds.Default)}
        size={select('Size', ButtonSizes, ButtonSizes.Default)}
        disabled={boolean('Disabled', false)}
      >
        {text('Text', 'Button')}
      </Button>
    </Badge>
  </Box>
);

const icons: { [key: string]: JSX.Element } = {
  Bell: <IconBell fill="currentColor" />,
  Download: <IconDownload fill="currentColor" />,
  Reload: <IconReload fill="currentColor" />,
  Archive: <IconArchive fill="currentColor" />,
  Tag: <IconTag fill="currentColor" />,
  Share: <IconShare fill="currentColor" />,
  Trash: <IconTrash fill="currentColor" />
};

export const WithIcon = () => {
  const kind = radios('Kind', ButtonKinds, ButtonKinds.Default);
  const size = select('Size', ButtonSizes, ButtonSizes.Default);
  const iconName = select('Icon', Object.keys(icons), 'Bell');

  return (
    <Box align="center" margin="xlarge">
      <Button
        onClick={action('clicked')}
        kind={kind}
        size={size}
        icon={icons[iconName]}
        disabled={boolean('Disabled', false)}
      >
        {text('Text', 'Button with Icon')}
      </Button>
    </Box>
  );
};

export const Busy = () => {
  const [isBusy, setBusy] = React.useState(false);

  const kind = radios('Kind', ButtonKinds, ButtonKinds.Default);
  const size = select('Size', ButtonSizes, ButtonSizes.Default);
  const actionDuration = number('Action duration in ms', 200);

  const makeFakeRequest = (ms: number) =>
    new Promise(resolve => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        resolve();
      }, ms);
    });

  const delayedQuery = useCallback(
    debounce(200, async (actionDuration: number) => {
      await makeFakeRequest(actionDuration);
      setBusy(() => false);
    }),
    []
  );

  const makeBusy = (actionDuration: number) => {
    if (isBusy) return;
    setBusy(() => true);
    delayedQuery(actionDuration);
  };

  return (
    <Box align="center" margin="xlarge">
      <Button
        onClick={() => makeBusy(actionDuration)}
        kind={kind}
        size={size}
        icon={<IconReload fill="currentColor" />}
        disabled={boolean('Disabled', false)}
        busy={isBusy}
      >
        Click to make this button busy for {actionDuration} ms
      </Button>
    </Box>
  );
};
