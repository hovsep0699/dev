import { IState } from '../../types';
import aggregatedWaitingOfSigning from '../aggregatedStates/WaitingOfSigning';

const WaitingOfSigning: IState = {
  name: 'waiting_of_signing',
  label: 'Ожидание подписания квитанции',
  type: 'IN',
  aggregatedState: aggregatedWaitingOfSigning
};

export default WaitingOfSigning;
