import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const RoamingUcdWaybill: IFlow = {
  name: 'roaming_ucd_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'roaming',
  aggregatedFlow: UCDInvoice
};

export default RoamingUcdWaybill;
