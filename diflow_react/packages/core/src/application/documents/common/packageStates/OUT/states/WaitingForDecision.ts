import { IState } from '../../types';
import aggregatedWaitingForDecision from '../aggregatedStates/WaitingForDecision';

const WaitingForDecision: IState = {
  name: 'waiting_for_decision',
  label: 'Ожидание подписания',
  type: 'OUT',
  aggregatedState: aggregatedWaitingForDecision
};

export default WaitingForDecision;
