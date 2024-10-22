import { IFlow } from '../types';
import AggregatedAct from '../aggregatedFlows/Act';

const Act: IFlow = {
  name: 'act',
  label: 'Акт сдачи-приема работ(услуг)',
  type: 'local',
  aggregatedFlow: AggregatedAct
};

export default Act;
