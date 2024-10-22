import { IState } from '../../types';
import AggregatedWaitingOfSigningDelivered from '../aggregatedStates/WaitingOfSigningDelivered';

const WaitingOfSigningDelivered: IState = {
  name: 'waiting_of_signing_delivered',
  label: 'Ожидание подтверждения о принятии подписи',
  type: 'OUT',
  aggregatedState: AggregatedWaitingOfSigningDelivered
};

export default WaitingOfSigningDelivered;
