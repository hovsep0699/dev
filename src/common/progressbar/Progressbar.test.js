import React from 'react';
import '../../config/setupTests';
import { shallow } from 'enzyme';
import Progressbar from './Progressbar';
import ProgressbarNode from './ProgressbarNode';

describe('Exceptions tests', () => {
  it('No children in Progressbar', () => {
    const noChildren = <Progressbar isSmall key="nochildren"></Progressbar>;
    expect(() => shallow(noChildren)).toThrowError('Progressbar must have one active node');
  });
  it('Wrong children type in Progressbar', () => {
    const wrongChildrenTypes = (
      <Progressbar isSmall key="wrongchildren">
        <Progressbar isActive />
      </Progressbar>
    );
    expect(() => shallow(wrongChildrenTypes)).toThrowError(
      'Progressbar can have only ProgressbarNode as children'
    );
  });
  it('No active ProgressbarNode', () => {
    const noActiveNode = (
      <Progressbar isSmall key="noactivenode">
        <ProgressbarNode title="Заполните email, реквизиты компании и адрес" />
        <ProgressbarNode title="Отправьте информационное сообщение" />
        <ProgressbarNode title="Подключение завершено" />
      </Progressbar>
    );
    expect(() => shallow(noActiveNode)).toThrowError('Progressbar must have one active node');
  });
  it('More than one active ProgressbarNode', () => {
    const twoActiveNodes = (
      <Progressbar isSmall key="twoactivenodes">
        <ProgressbarNode title="Заполните email, реквизиты компании и адрес" isActive />
        <ProgressbarNode title="Отправьте информационное сообщение" isActive />
        <ProgressbarNode title="Подключение завершено" />
      </Progressbar>
    );
    expect(() => shallow(twoActiveNodes)).toThrowError(
      'Progressbar should have only one active node'
    );
  });
});
