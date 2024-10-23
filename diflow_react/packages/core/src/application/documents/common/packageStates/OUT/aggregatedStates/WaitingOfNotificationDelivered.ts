import { IAggregatedState } from '../../types';

const WaitingOfNotificationDelivered: IAggregatedState = {
  name: 'waiting_of_notification_delivered',
  label: 'Ожидание подтверждения о принятии извещения',
  type: 'OUT'
};

export default WaitingOfNotificationDelivered;
