import { IState } from '../../types';
import WaitingOfNotification from '../aggregatedStates/WaitingOfNotification';

const WaitingOfReceivingNotification: IState = {
  name: 'waiting_of_receiving_notification',
  label: 'Ожидание извещения о получении',
  type: 'OUT',
  aggregatedState: WaitingOfNotification
};

export default WaitingOfReceivingNotification;
