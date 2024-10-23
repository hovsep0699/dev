import { IFlow } from '../types';
import AggregatedInvoice from '../aggregatedFlows/Invoice';

const Invoice: IFlow = {
  name: 'invoice',
  label: 'Счёт-фактура (старый формат)',
  type: 'local',
  aggregatedFlow: AggregatedInvoice
};

export default Invoice;
