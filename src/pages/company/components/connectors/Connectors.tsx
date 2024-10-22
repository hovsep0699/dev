import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@distate/components';
import { isNull } from 'util';
import { logos } from '../../../../helpers/path';
import { disabledConnectors } from '../../helpers/company.helper';
import { COMPANY_CONNECTORS } from '../../../../common/Url';
import { ConnectorStatusName } from '../../helpers/company.typings';
import { getConnectors } from '../../store/actions';
import { selectConnectors } from '../../store/selectors';
import './style.css';

/** Коннектор */
export const Connectors = () => {
  const connectors = useSelector(selectConnectors) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConnectors());
  }, [dispatch]);

  return (
    <div>
      {connectors.map(item => {
        const { id, operator, status } = item;
        const { code, name } = operator;
        const src = logos[code];

        return (
          <div className="connector-item-wrapper" key={id}>
            <div className="connector-icon-wrapper">
              <img src={src} alt={name} />
            </div>
            <div className="connector-content">
              <div className="connector-title">
                <Link to={COMPANY_CONNECTORS + '/' + code}>{name}</Link>
              </div>
              <div className="connector-description">{ConnectorStatusName[status]}</div>
            </div>
            <div className="connector-left-block">
              {isNull(status) && (
                <Link to={COMPANY_CONNECTORS + '/' + code}>
                  <Button className="connector-green-button">Подключить</Button>
                </Link>
              )}
            </div>
          </div>
        );
      })}

      {disabledConnectors.map((item: any) => {
        const { id, operator } = item;
        const { code, name } = operator;
        const src = logos[code as never];

        return (
          <div className="connector-item-wrapper disabled-connector-item-wrapper" key={id}>
            <div className="connector-icon-wrapper">
              <img src={src} alt={name} />
            </div>
            <div className="connector-content">
              <div className="connector-title">
                <span className="connector-title-span">{name}</span>
              </div>
              <div className="connector-description">Коннектор в разработке</div>
            </div>
            <div className="connector-left-block">
              <Button className="connector-grey-button">В разработке</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
