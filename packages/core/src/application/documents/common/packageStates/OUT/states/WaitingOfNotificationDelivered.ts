import { IState } from '../../types';
import AggregatedWaitingOfNotificationDelivered from '../aggregatedStates/WaitingOfNotificationDelivered';

const WaitingOfNotificationDelivered: IState = {
  name: 'waiting_of_signing',
  label: 'Ожидание подтверждения о принятии извещения',
  type: 'OUT',
  aggregatedState: AggregatedWaitingOfNotificationDelivered
};

export default WaitingOfNotificationDelivered;
