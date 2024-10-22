import { IState } from '../../types';
import AggregatedComplete from '../aggregatedStates/Complete';

const Complete: IState = {
  name: 'complete',
  label: 'Документооборот завершён',
  type: 'OUT',
  aggregatedState: AggregatedComplete
};

export default Complete;
