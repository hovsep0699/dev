import React from 'react';
import classNames from 'classnames';

const Card = props => {
  const classes = classNames(
    {
      'ds-block': true
    },
    props.className
  );
  return <div className={classes}>{props.children}</div>;
};

export default Card;
