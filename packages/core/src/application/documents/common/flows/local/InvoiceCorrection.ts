import { IFlow } from '../types';
import AggregatedInvoiceCorrection from '../aggregatedFlows/InvoiceCorrection';

const InvoiceCorrection: IFlow = {
  name: 'invoice_correction',
  label: 'Корректировочный счёт-фактура (старый формат)',
  type: 'local',
  aggregatedFlow: AggregatedInvoiceCorrection
};

export default InvoiceCorrection;
