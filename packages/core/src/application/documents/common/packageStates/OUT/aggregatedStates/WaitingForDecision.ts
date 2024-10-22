import { IAggregatedState } from '../../types';

const WaitingForDecision: IAggregatedState = {
  name: 'waiting_for_decision',
  label: 'Ожидание подписания',
  type: 'OUT'
};

export default WaitingForDecision;
