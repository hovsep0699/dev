import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const InternalRoamingUcdWaybill: IFlow = {
  name: 'internal_roaming_ucd_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'internal_roaming',
  aggregatedFlow: UCDInvoice
};

export default InternalRoamingUcdWaybill;
