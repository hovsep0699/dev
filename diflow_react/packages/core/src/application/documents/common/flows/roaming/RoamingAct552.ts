import { IFlow } from '../types';
import AggregatedAct from '../aggregatedFlows/Act';

const RoamingAct552: IFlow = {
  name: 'roaming_act_552',
  label: 'Акт по приказу ФНС 552',
  type: 'roaming',
  aggregatedFlow: AggregatedAct
};

export default RoamingAct552;
