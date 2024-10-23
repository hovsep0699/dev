import { IFlow } from '../types';
import Unformalized from '../aggregatedFlows/Unformalized';

const RoamingUnformalizedUnilateral: IFlow = {
  name: 'roaming_unformalized_unilateral',
  label: 'Односторонний документ',
  type: 'roaming',
  aggregatedFlow: Unformalized
};

export default RoamingUnformalizedUnilateral;
