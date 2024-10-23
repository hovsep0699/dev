import { IFlow } from '../types';
import AggregatedAct from '../aggregatedFlows/Act';

const Act552: IFlow = {
  name: 'act_552',
  label: 'Акт по приказу ФНС 552',
  type: 'local',
  aggregatedFlow: AggregatedAct
};

export default Act552;
