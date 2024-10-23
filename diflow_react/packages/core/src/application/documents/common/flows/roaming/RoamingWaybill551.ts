import { IFlow } from '../types';
import AggregatedWaybill from '../aggregatedFlows/Waybill';

const RoamingWaybill551: IFlow = {
  name: 'roaming_waybill_551',
  label: 'Накладная по приказу ФНС 551',
  type: 'roaming',
  aggregatedFlow: AggregatedWaybill
};

export default RoamingWaybill551;
