import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const UCDWaybill: IFlow = {
  name: 'ucd_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'local',
  aggregatedFlow: UCDInvoice
};

export default UCDWaybill;
