import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const UTDWaybill: IFlow = {
  name: 'utd_waybill',
  label: 'Универсальный передаточный документ',
  type: 'local',
  aggregatedFlow: UTDInvoice
};

export default UTDWaybill;
