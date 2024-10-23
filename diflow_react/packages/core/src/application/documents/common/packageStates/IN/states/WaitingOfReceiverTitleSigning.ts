import { IState } from '../../types';
import ReceiptSignRequired from '../aggregatedStates/ReceiptSignRequired';

const WaitingOfReceiverTitleSigning: IState = {
  name: 'waiting_of_receiver_title_signing',
  label: 'Ожидание подписания титула',
  type: 'IN',
  aggregatedState: ReceiptSignRequired
};

export default WaitingOfReceiverTitleSigning;
