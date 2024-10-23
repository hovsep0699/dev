import { IFlow } from '../types';
import AggregatedWaybill from '../aggregatedFlows/Waybill';

const Waybill551: IFlow = {
  name: 'waybill_551',
  label: 'Накладная по приказу ФНС 551',
  type: 'local',
  aggregatedFlow: AggregatedWaybill
};

export default Waybill551;
