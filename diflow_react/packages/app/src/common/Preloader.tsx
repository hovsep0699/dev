import React, { CSSProperties } from 'react';
import classNames from 'classnames';

type PreloaderProps = {
  className?: string;
  children?: React.ReactNode;
  progressCurrent?: number;
  progressTotal?: number;
  style?: CSSProperties;
};

const Preloader = ({
  style,
  className,
  children = 'Загрузка',
  progressCurrent = 0,
  progressTotal = 0
}: PreloaderProps) => {
  const calcProgress = (total: number, current: number) => {
    if (!total) return 0;
    return (100 / total) * current;
  };
  const progressLineStyle: CSSProperties = progressTotal
    ? {
        width: `${calcProgress(progressTotal, progressCurrent)}%`
      }
    : {};
  const loadingscreenClasses = classNames(className, {
    loadingscreen: true,
    active: !!progressTotal
  });
  return (
    <div className={loadingscreenClasses} style={style}>
      <div className="loadingscreen-progress">
        <div className="loadingscreen-progress-line" style={progressLineStyle}></div>
      </div>
      <div className="loadingscreen-wheel"></div>
      <div className="loadingscreen-text">{children}</div>
    </div>
  );
};

export default Preloader;
