import { IState } from '../../types';
import ReceiptSignRequired from '../aggregatedStates/ReceiptSignRequired';

const WaitingOfSigningNotification: IState = {
  name: 'waiting_of_signing_notification',
  label: 'Подписание извещений',
  type: 'IN',
  aggregatedState: ReceiptSignRequired
};

export default WaitingOfSigningNotification;
