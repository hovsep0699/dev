import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const RoamingUcd174Invoice: IFlow = {
  name: 'roaming_ucd_174_invoice',
  label: 'Универсальный корректировочный документ',
  type: 'roaming',
  aggregatedFlow: UCDInvoice
};

export default RoamingUcd174Invoice;
