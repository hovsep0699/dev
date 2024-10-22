import { IFlow } from '../types';
import AggregatedInvoice from '../aggregatedFlows/Invoice';

const InvoiceUTD14: IFlow = {
  name: 'invoice_utd_14',
  label: 'Счёт-фактура',
  type: 'local',
  aggregatedFlow: AggregatedInvoice
};

export default InvoiceUTD14;
