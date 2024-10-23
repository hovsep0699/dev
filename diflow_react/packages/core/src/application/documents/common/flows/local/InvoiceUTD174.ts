import { IFlow } from '../types';
import AggregatedInvoice from '../aggregatedFlows/Invoice';

const InvoiceUTD174: IFlow = {
  name: 'invoice_utd_174',
  label: 'Счёт-фактура',
  type: 'local',
  aggregatedFlow: AggregatedInvoice
};

export default InvoiceUTD174;
