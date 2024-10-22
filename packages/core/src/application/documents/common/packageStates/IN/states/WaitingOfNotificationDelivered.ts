import { IState } from '../../types';
import AggregatedWaitingOfNotificationDelivered from '../aggregatedStates/WaitingOfNotificationDelivered';

const WaitingOfNotificationDelivered: IState = {
  name: 'waiting_of_notification_delivered',
  label: 'Ожидание подтверждения о принятии извещения',
  type: 'IN',
  aggregatedState: AggregatedWaitingOfNotificationDelivered
};

export default WaitingOfNotificationDelivered;
