import { IFlow } from '../types';
import AggregatedWaybill from '../aggregatedFlows/Waybill';

const Waybill: IFlow = {
  name: 'waybill',
  label: 'Накладная',
  type: 'local',
  aggregatedFlow: AggregatedWaybill
};

export default Waybill;
