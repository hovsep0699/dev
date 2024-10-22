import { IState } from '../../types';
import ReceiptSignRequired from '../aggregatedStates/ReceiptSignRequired';

const WaitingOfClarificationDelivered: IState = {
  name: 'waiting_of_clarification_delivered',
  label: 'Ожидание подтверждения о принятии уведомления об уточнении',
  type: 'OUT',
  aggregatedState: ReceiptSignRequired
};

export default WaitingOfClarificationDelivered;
