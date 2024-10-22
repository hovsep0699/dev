import React, { ReactElement } from 'react';
import { Icons } from '@distate/components';
import changeIconFill from '../../utils/changeIconFill';
import './style.css';

type Props = {
  /** отображаемый текст */
  text: string;
  /** длина, после которой обрезается текст */
  width?: string;
};

/** Компонент обрезает текст добавляя многоточия */
export const TruncateText = (props: Props): ReactElement => {
  const { text, width = '90%' } = props;

  const StyledIconInfoAlt = changeIconFill(Icons.IconInfoAlt);

  return (
    <div className="truncate-wrapper">
      <p className="truncate-text" style={{ width: width }}>
        {text}
      </p>
      <span title={text} className="truncate-icon-wrapper">
        <StyledIconInfoAlt className="truncate-icon" />
      </span>
    </div>
  );
};
