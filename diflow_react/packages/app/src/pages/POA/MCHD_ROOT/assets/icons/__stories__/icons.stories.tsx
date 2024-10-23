import React from 'react';
import styled from 'styled-components';

import * as seeds from '../index';

const HTMLGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const HTMLGridItem = styled.div`
  padding: 20px;
  min-width: 32px;
  min-height: 42px;
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #dedede;
  text-align: left;
  overflow: hidden;
  margin: 4px;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #1ea7fd;
  }
`;

const HTMLGridName = styled.div`
  font-size: 12px;
  padding-top: 12px;
  text-align: left;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default {
  title: 'Icons'
};

const input = document.createElement('input');
input.style.position = 'absolute';
input.style.left = '-9999px';
document.body.appendChild(input);

export const List = () => {
  return (
    <HTMLGrid>
      {Object.entries(seeds).map(([key, Component]) => {
        const onCopy = () => {
          input.value = key;
          input.select();
          document.execCommand('copy');
          alert(`Заголовок "${key}" скопирован в буфер!`);
        };

        return (
          <HTMLGridItem key={key} onClick={onCopy}>
            <Component />
            <HTMLGridName title={key}>{key}</HTMLGridName>
          </HTMLGridItem>
        );
      })}
    </HTMLGrid>
  );
};
