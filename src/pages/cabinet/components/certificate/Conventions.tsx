import React from 'react';
import './style.css';

export const Conventions = () => {
  return (
    <div className="conventions-wrapper">
      <div className="conventions-item">
        <div className="conventions-item-color" style={{ background: '#efefef' }}></div>
        <div> — Сертификат с ненаступившим либо истекшим сроком действия</div>
      </div>
      <div className="conventions-item">
        <div className="conventions-item-color" style={{ background: '#fbe5e4' }}></div>
        <div> — Сертификат, не установленный локально на данном компьютере</div>
      </div>
    </div>
  );
};
