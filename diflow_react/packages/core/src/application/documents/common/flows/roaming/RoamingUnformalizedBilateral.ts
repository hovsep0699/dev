import { IFlow } from '../types';
import Unformalized from '../aggregatedFlows/Unformalized';

const RoamingUnformalizedBilateral: IFlow = {
  name: 'roaming_unformalized_bilateral',
  label: 'Двусторонний документ',
  type: 'roaming',
  aggregatedFlow: Unformalized
};

export default RoamingUnformalizedBilateral;
