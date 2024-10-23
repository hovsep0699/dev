import { IState } from '../../types';
import AggregatedWaitingOfSecondSignatureDelivered from '../aggregatedStates/WaitingOfSecondSignatureDelivered';

const WaitingOfSecondSignatureDelivered: IState = {
  name: 'waiting_of_second_signature_delivered',
  label: 'Ожидается доставка второй подписи',
  type: 'IN',
  aggregatedState: AggregatedWaitingOfSecondSignatureDelivered
};

export default WaitingOfSecondSignatureDelivered;
