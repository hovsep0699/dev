import { IState } from '../../types';
import WaitingOfNotification from '../aggregatedStates/WaitingOfNotification';

const WaitingOfReceivingConfirmation: IState = {
  name: 'waiting_of_receiving_confirmation',
  label: 'Ожидание извещения о получении',
  type: 'OUT',
  aggregatedState: WaitingOfNotification
};

export default WaitingOfReceivingConfirmation;
