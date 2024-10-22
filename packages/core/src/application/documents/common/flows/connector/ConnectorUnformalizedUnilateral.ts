import { IFlow } from '../types';
import Unformalized from '../aggregatedFlows/Unformalized';

const ConnectorUnformalizedUnilateral: IFlow = {
  name: 'connector_unformalized_unilateral',
  label: 'Односторонний документ',
  type: 'connector',
  aggregatedFlow: Unformalized
};

export default ConnectorUnformalizedUnilateral;
