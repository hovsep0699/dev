import { IState } from '../../types';
import WaitingOfSigning from '../aggregatedStates/WaitingOfSigning';

const WaitingForBuyer: IState = {
  name: 'waiting_for_buyer',
  label: 'Ожидание подписания покупателем',
  type: 'OUT',
  aggregatedState: WaitingOfSigning
};

export default WaitingForBuyer;
