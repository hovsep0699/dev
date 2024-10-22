import { IState } from '../../types';
import AggregatedDeclined from '../aggregatedStates/Declined';

const Declined: IState = {
  name: 'declined',
  label: 'Документооборот отклонён',
  type: 'OUT',
  aggregatedState: AggregatedDeclined
};

export default Declined;
