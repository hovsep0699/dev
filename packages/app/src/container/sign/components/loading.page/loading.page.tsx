import React from 'react';

import Preloader from '../../../../common/Preloader';
import { HTMLMessage } from './loading.style';

export interface ILoadingPageProps {
  title: string;
  currentCount: number;
  total: number;
  loading?: boolean;
  visible?: boolean;
}

const LoadingPage: React.FC<ILoadingPageProps> = ({ title, currentCount, total, visible }) => {
  if (!visible) return null;
  return (
    <Preloader progressCurrent={currentCount} progressTotal={total}>
      <HTMLMessage>Идет процесс подписания:</HTMLMessage>
      <HTMLMessage>{title}</HTMLMessage>
      <HTMLMessage>
        Подписано {currentCount} из {total}
      </HTMLMessage>
    </Preloader>
  );
};

export { LoadingPage };
