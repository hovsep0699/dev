import React from 'react';

import { HTMLContainer, HTMLElement } from './list.string.style';

export type IListElement = {
  before?: React.ReactNode | string;
  id: string | number;
  title: string;
  after?: React.ReactNode | string;
};

export interface IListStringProps {
  onClick: (id: string) => void;
  items: IListElement[];
}

const ListString: React.FC<IListStringProps> = ({ items, onClick }) => {
  return (
    <HTMLContainer>
      {items.map(({ id, title }) => (
        <HTMLElement key={id} onClick={() => onClick(`${id}`)}>
          {title}
        </HTMLElement>
      ))}
    </HTMLContainer>
  );
};

export { ListString };
