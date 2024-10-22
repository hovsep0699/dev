import React from 'react';
import Preloader from '../Preloader';

const SignFullPageLoader = ({ currentCount, total, documentTitle }) => {
  return (
    <Preloader progressCurrent={currentCount} progressTotal={total}>
      Идет процесс подписания:
      <br />
      <span className="document-title">{documentTitle}</span>
      <br />
      Подписано {currentCount} из {total}
    </Preloader>
  );
};

export default SignFullPageLoader;
