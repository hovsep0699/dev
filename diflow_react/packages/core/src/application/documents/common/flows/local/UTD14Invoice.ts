import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const UTD14Invoice: IFlow = {
  name: 'utd_14_invoice',
  label: 'Универсальный передаточный документ',
  type: 'local',
  aggregatedFlow: UTDInvoice
};

export default UTD14Invoice;
