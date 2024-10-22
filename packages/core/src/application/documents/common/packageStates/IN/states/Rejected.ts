import { IState } from '../../types';
import AggregatedRejected from '../aggregatedStates/Rejected';

const Rejected: IState = {
  name: 'rejected',
  label: 'Отказано',
  type: 'IN',
  aggregatedState: AggregatedRejected
};

export default Rejected;
