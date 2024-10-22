import React from 'react';

import Preloader from '../Preloader';
import { HTMLMessage } from './loading.style';

export interface ILoadingProps {
  textHeader?: string;
  textFooter?: string;
  title: string;
  currentCount?: number;
  total?: number;
  visible?: boolean;
}

const Loading: React.FC<ILoadingProps> = ({
  textHeader,
  textFooter,
  title,
  currentCount,
  visible
}) => {
  return (
    <Preloader progressCurrent={currentCount} progressTotal={visible ? 1 : 0}>
      {textHeader && <HTMLMessage>{textHeader}</HTMLMessage>}
      <HTMLMessage>{title}</HTMLMessage>
      {textFooter && <HTMLMessage>{textFooter}</HTMLMessage>}
    </Preloader>
  );
};

export { Loading };
