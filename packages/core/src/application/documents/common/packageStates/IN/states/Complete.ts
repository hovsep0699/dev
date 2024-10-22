import { IState } from '../../types';
import AggregatedComplete from '../aggregatedStates/Complete';

const Complete: IState = {
  name: 'complete',
  label: 'Документооборот завершён',
  type: 'IN',
  aggregatedState: AggregatedComplete
};

export default Complete;
