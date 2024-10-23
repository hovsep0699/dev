import { IState } from '../../types';
import AggregatedWaitingOfSigning from '../aggregatedStates/WaitingOfSigning';

const WaitingOfSigning: IState = {
  name: 'waiting_of_signing',
  label: 'Ожидание подписания квитанции',
  type: 'OUT',
  aggregatedState: AggregatedWaitingOfSigning
};

export default WaitingOfSigning;
