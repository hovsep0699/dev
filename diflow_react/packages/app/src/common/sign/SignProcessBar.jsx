import React from 'react';
import classNames from 'classnames';

const SignProcessBar = ({ currentCount, total, documentTitle, signHandler, abortHandler }) => {
  const handleOnClick = () => {
    if (currentCount) {
      abortHandler();
    } else {
      signHandler();
    }
  };
  const signbarClasses = classNames({
    signbar: true,
    active: total
  });
  const msg = `${documentTitle}. Подписано ${currentCount} из ${total}`;
  const signBarMsgInProcess = (
    <span className="signbar-msg signing" title={msg}>
      Идет процесс подписания: {msg}
    </span>
  );
  const signBarMsgStopped = (
    <p className="signbar-msg">
      Квитанций для подписи:
      <span className="signbar-count"> {total}</span>
    </p>
  );

  return (
    <div className={signbarClasses} style={{ zIndex: 41 }}>
      {currentCount ? signBarMsgInProcess : signBarMsgStopped}
      <button className="ds-button height-small" tabIndex={-1} onClick={handleOnClick}>
        {currentCount ? 'Прервать' : 'Подписать'}
      </button>
    </div>
  );
};

export default SignProcessBar;
