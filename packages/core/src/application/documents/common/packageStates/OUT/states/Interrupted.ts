import { IState } from '../../types';
import AggregatedInterrupted from '../aggregatedStates/Interrupted';

const Interrupted: IState = {
  name: 'interrupted',
  label: 'Возникла ошибка',
  type: 'OUT',
  aggregatedState: AggregatedInterrupted
};

export default Interrupted;
