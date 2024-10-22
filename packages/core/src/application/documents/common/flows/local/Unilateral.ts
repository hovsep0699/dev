import { IFlow } from '../types';
import Unformalized from '../aggregatedFlows/Unformalized';

const Unilateral: IFlow = {
  name: 'unilateral',
  label: 'Односторонний документ',
  type: 'local',
  aggregatedFlow: Unformalized
};

export default Unilateral;
