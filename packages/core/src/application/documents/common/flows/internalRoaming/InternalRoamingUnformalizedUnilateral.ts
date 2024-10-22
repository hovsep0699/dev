import { IFlow } from '../types';
import Unformalized from '../aggregatedFlows/Unformalized';

const InternalRoamingUnformalizedUnilateral: IFlow = {
  name: 'internal_roaming_unformalized_unilateral',
  label: 'Односторонний документ',
  type: 'internal_roaming',
  aggregatedFlow: Unformalized
};

export default InternalRoamingUnformalizedUnilateral;
