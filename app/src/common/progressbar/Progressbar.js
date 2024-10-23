import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ProgressbarNode from './ProgressbarNode';

function renderNodes(children, nodeWidth) {
  return React.Children.map(children, child => {
    if (child.type !== ProgressbarNode) {
      throw new Error('Progressbar can have only ProgressbarNode as children');
    }
    return React.cloneElement(child, { style: { width: nodeWidth } });
  });
}

function checkForHavingOnlyOneActiveNode(children) {
  let activeChildrenNum = 0;
  React.Children.forEach(children, child => {
    if (child.props && child.props.isActive) ++activeChildrenNum;
  });

  if (activeChildrenNum === 0) {
    throw new Error('Progressbar must have one active node');
  } else if (activeChildrenNum > 1) {
    throw new Error('Progressbar should have only one active node');
  }
}

export const Progressbar = props => {
  checkForHavingOnlyOneActiveNode(props.children);
  const nodeWidthPercent =
    React.Children.count(props.children) > 1 ? `${100 / props.children.length}%` : '100%';
  const classes = classNames({
    progressbar: true,
    small: props.isSmall
  });
  return (
    <div className="progressbar-wrapper col-12">
      <div className={classes}>{renderNodes(props.children, nodeWidthPercent)}</div>
    </div>
  );
};
Progressbar.defaultProps = {
  isSmall: false
};
Progressbar.propTypes = {
  isSmall: PropTypes.bool
};

export default Progressbar;
