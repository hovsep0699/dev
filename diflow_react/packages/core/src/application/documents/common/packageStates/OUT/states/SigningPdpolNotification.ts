import { IState } from '../../types';
import AggregatedSigningPdpolNotification from '../aggregatedStates/SigningPdpolNotification';

const SigningPdpolNotification: IState = {
  name: 'signing_pdpol_notification',
  label: 'Подписание квитанций',
  type: 'OUT',
  aggregatedState: AggregatedSigningPdpolNotification
};

export default SigningPdpolNotification;
