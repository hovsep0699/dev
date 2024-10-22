import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const UTD174Invoice: IFlow = {
  name: 'utd_174_invoice',
  label: 'Универсальный передаточный документ',
  type: 'local',
  aggregatedFlow: UTDInvoice
};

export default UTD174Invoice;
