import { IState } from '../../types';
import aggregatedCreated from '../aggregatedStates/Created';

const Created: IState = {
  name: 'created',
  label: 'Черновик',
  type: 'OUT',
  aggregatedState: aggregatedCreated
};

export default Created;
