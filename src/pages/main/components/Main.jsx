import React from 'react';
import Card from '../../../common/Card';
import OGRN from '@distate/core/dist/domain/legal_entity/vo/OGRN';
import OGRNIP from '@distate/core/dist/domain/individual_entrepreneur/vo/OGRNIP';
import INN_UL from '@distate/core/dist/domain/legal_entity/vo/INN';
import INN_IP from '@distate/core/dist/domain/individual_entrepreneur/vo/INN';
import KPP from '@distate/core/dist/domain/legal_entity/vo/KPP';

import Core from '@distate/core/dist/application/Core';

export const Main = () => {
  const isUL = Core.company?.type === 'UL';
  const isIP = Core.company?.type === 'IP';

  return (
    <Card>
      <h2 className="subject">Компания: {Core.company?.name}</h2>
      <br />
      <p>
        <span>
          {isUL && OGRN.name}
          {isIP && OGRNIP.name}:{' '}
        </span>
        <span>
          {isUL && Core.company?.ogrn?.value}
          {isIP && Core.company?.ogrnip?.value}
        </span>
      </p>
      <p>
        <span>
          {isUL && INN_UL.name}
          {isIP && INN_IP.name}:{' '}
        </span>
        <span>{Core.company?.inn?.value}</span>
      </p>
      {isUL && Core.company?.kpp && (
        <p>
          <span>{KPP.name}: </span>
          <span>{Core.company?.kpp?.value}</span>
        </p>
      )}
    </Card>
  );
};
