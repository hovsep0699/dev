import React from 'react';
import { Button, ButtonKinds } from '@distate/components';
import { DestinationType } from '../../helpers/contractors.typings';
import { LOCAL, ROAMING, LOCAL_ROAMING, C1_HUB } from '../../../../common/Lbl';

interface Props {
  destinationType: DestinationType;
  setDestinationType: Function;
}

/** Кнопки выбора назначения поиска */
export const ChooseDestinationButtons = (props: Props) => {
  const { destinationType, setDestinationType } = props;

  return (
    <div className="find-contractors-buttons-second-line">
      <Button
        onClick={() => setDestinationType(DestinationType.Local)}
        kind={
          destinationType === DestinationType.Local ? ButtonKinds.Primary : ButtonKinds.Secondary
        }
      >
        {LOCAL}
      </Button>
      <Button
        onClick={() => setDestinationType(DestinationType.Roaming)}
        kind={
          destinationType === DestinationType.Roaming ? ButtonKinds.Primary : ButtonKinds.Secondary
        }
      >
        {ROAMING}
      </Button>
      <Button
        onClick={() => setDestinationType(DestinationType.LoaclRoaming)}
        kind={
          destinationType === DestinationType.LoaclRoaming
            ? ButtonKinds.Primary
            : ButtonKinds.Secondary
        }
      >
        {LOCAL_ROAMING}
      </Button>
      <Button
        onClick={() => setDestinationType(DestinationType.Hub1c)}
        kind={
          destinationType === DestinationType.Hub1c ? ButtonKinds.Primary : ButtonKinds.Secondary
        }
      >
        {C1_HUB}
      </Button>
    </div>
  );
};
