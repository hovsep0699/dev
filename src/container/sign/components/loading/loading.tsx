import React from 'react';

import { HTMLContainer, HTMLBody, HTMLMessage, HTMLButton } from './loading.style';

export interface ILoadingProps {
  title: string;
  currentCount: number;
  total: number;
  loading?: boolean;
  visible?: boolean;
  onClick?: () => void;
}

const Loading: React.FC<ILoadingProps> = ({
  title,
  currentCount,
  total,
  loading,
  visible,
  onClick
}) => {
  if (!visible) return null;

  let message = `Квитанций для подписи: ${total}`;
  if (loading) {
    message = `Идет процесс подписания: ${title}. Подписано ${currentCount} из ${total}`;
  }

  return (
    <HTMLContainer>
      <HTMLBody>
        <HTMLMessage>{message}</HTMLMessage>
        <HTMLButton onClick={onClick}>{currentCount ? 'Прервать' : 'Подписать'}</HTMLButton>
      </HTMLBody>
    </HTMLContainer>
  );
};

export { Loading };
