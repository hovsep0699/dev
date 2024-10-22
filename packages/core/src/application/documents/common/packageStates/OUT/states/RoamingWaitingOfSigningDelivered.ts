import { IState } from '../../types';
import AggregatedRoamingWaitingOfSigningDelivered from '../aggregatedStates/RoamingWaitingOfSigningDelivered';

const RoamingWaitingOfSigningDelivered: IState = {
  name: 'roaming_waiting_of_signing_delivered',
  label: 'Ожидание подтверждения о принятии подписи',
  type: 'OUT',
  aggregatedState: AggregatedRoamingWaitingOfSigningDelivered
};

export default RoamingWaitingOfSigningDelivered;
