import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const RoamingUtd174Invoice: IFlow = {
  name: 'roaming_utd_174_invoice',
  label: 'Универсальный передаточный документ',
  type: 'roaming',
  aggregatedFlow: UTDInvoice
};

export default RoamingUtd174Invoice;
