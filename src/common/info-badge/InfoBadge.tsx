import React, { ReactElement } from 'react';
import { Icons } from '@distate/components';
import changeIconFill from '../../utils/changeIconFill';
import './style.css';

type Props = {
  /** строка, для которой будет отображаться значкок i */
  str: string;
  /** всплывающее сообщение */
  title: string;
};

/** добавляет значок - в тайтле значка текст  */
export const InfoBadge = (props: Props): ReactElement => {
  const { str, title } = props;

  const StyledIconInfoAlt = changeIconFill(Icons.IconInfoAlt);

  return (
    <div className="info-block-wrapper">
      <p className="info-block-text">{str}</p>
      <span title={title} className="info-block-icon-wrapper">
        <StyledIconInfoAlt className="info-block-icon" />
      </span>
    </div>
  );
};
