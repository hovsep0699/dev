import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const RoamingUcd14Invoice: IFlow = {
  name: 'roaming_ucd_14_invoice',
  label: 'Универсальный корректировочный документ',
  type: 'roaming',
  aggregatedFlow: UCDInvoice
};

export default RoamingUcd14Invoice;
