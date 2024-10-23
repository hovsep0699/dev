import { IState } from '../../types';
import ReceiptSignRequired from '../aggregatedStates/ReceiptSignRequired';

const WaitingOfClarificationSigning: IState = {
  name: 'waiting_of_clarification_signing',
  label: 'Ожидание подписания уведомления об уточнении',
  type: 'IN',
  aggregatedState: ReceiptSignRequired
};

export default WaitingOfClarificationSigning;
