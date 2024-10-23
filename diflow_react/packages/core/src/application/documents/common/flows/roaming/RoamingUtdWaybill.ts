import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const RoamingUtdWaybill: IFlow = {
  name: 'roaming_utd_waybill',
  label: 'Универсальный передаточный документ',
  type: 'roaming',
  aggregatedFlow: UTDInvoice
};

export default RoamingUtdWaybill;
