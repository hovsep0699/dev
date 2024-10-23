import { IFlow } from '../types';
import Unformalized from '../aggregatedFlows/Unformalized';

const ConnectorUnformalizedBilateral: IFlow = {
  name: 'connector_unformalized_bilateral',
  label: 'Двусторонний документ',
  type: 'connector',
  aggregatedFlow: Unformalized
};

export default ConnectorUnformalizedBilateral;
