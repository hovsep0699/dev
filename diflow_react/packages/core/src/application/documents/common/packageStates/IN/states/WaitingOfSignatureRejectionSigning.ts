import { IState } from '../../types';
import ReceiptSignRequired from '../aggregatedStates/ReceiptSignRequired';

const WaitingOfSignatureRejectionSigning: IState = {
  name: 'waiting_of_signature_rejection_signing',
  label: 'Ожидание подписания отказа подписи',
  type: 'IN',
  aggregatedState: ReceiptSignRequired
};

export default WaitingOfSignatureRejectionSigning;
