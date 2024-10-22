import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const InternalRoamingUcd14Invoice: IFlow = {
  name: 'internal_roaming_ucd_14_invoice',
  label: 'Универсальный корректировочный документ',
  type: 'internal_roaming',
  aggregatedFlow: UCDInvoice
};

export default InternalRoamingUcd14Invoice;
