import React from 'react';

import { Input } from './Input';
import { IconAndroid, IconAlarmClock } from '../icons';

export default {
  title: 'Input'
};

export const Default = () => {
  return <Input label="Ваше ФИО" required placeholder="Пример: Иванов Иван Иванович" />;
};

export const IconBefore = () => {
  return (
    <Input
      label="Заголовок"
      placeholder="Пример: иконка в начале"
      iconBefore={<IconAlarmClock />}
    />
  );
};

export const IconAfter = () => {
  return (
    <Input label="Заголовок" placeholder="Пример: иконка в конце" iconAfter={<IconAndroid />} />
  );
};
