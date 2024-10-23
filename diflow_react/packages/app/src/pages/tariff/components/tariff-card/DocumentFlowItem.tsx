import React, { useState, ChangeEvent } from 'react';
import { Input } from '@distate/components';
import type { EditedFlowItem } from './DocumentFlow';

type Props = {
  cost: number;
  flowId: number;
  tariffId: number;
  setEditedFlow: Function;
};

/** элемент списка документооборота в карточке тарифа */
export const DocumentFlowItem = (props: Props) => {
  const { cost, flowId, tariffId, setEditedFlow } = props;

  const [inputValue, setInputValue] = useState((cost / 100).toFixed(2));

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onBlur = (value: string) => {
    setEditedFlow((oldValue: EditedFlowItem[]) => {
      const findValue = oldValue?.find((item: EditedFlowItem) => (item.flowId === flowId))
      if (findValue) {
        findValue.cost = Number(value)
        return [...oldValue]
      }
      setInputValue(oldInput => Number(oldInput).toFixed(2))

      return [...oldValue, {tariffId, flowId, cost: Number(value) * 100}]
    })
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Input value={inputValue} width={80} onChange={onChange} onBlur={(e) => onBlur(e.target.value)} type='number' />
    </div>
  );
};
