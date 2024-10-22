import { IFlow } from '../types';
import Unformalized from '../aggregatedFlows/Unformalized';

const InternalRoamingUnformalizedBilateral: IFlow = {
  name: 'internal_roaming_unformalized_bilateral',
  label: 'Двусторонний документ',
  type: 'internal_roaming',
  aggregatedFlow: Unformalized
};

export default InternalRoamingUnformalizedBilateral;
