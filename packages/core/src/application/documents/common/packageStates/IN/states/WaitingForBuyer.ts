import { IState } from '../../types';
import SignRequired from '../aggregatedStates/SignRequired';

const WaitingForBuyer: IState = {
  name: 'waiting_for_buyer',
  label: 'Ожидание подписания покупателем',
  type: 'IN',
  aggregatedState: SignRequired
};

export default WaitingForBuyer;
