import { IState } from '../../types';
import AggregatedReceived from '../aggregatedStates/Received';

const Received: IState = {
  name: 'received',
  label: 'Получен',
  type: 'IN',
  aggregatedState: AggregatedReceived
};

export default Received;
