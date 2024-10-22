import { IFlow } from '../types';
import AggregatedInvoiceCorrection from '../aggregatedFlows/InvoiceCorrection';

const InvoiceCorrectionUCD174: IFlow = {
  name: 'invoice_correction_ucd_174',
  label: 'Корректировочный счёт-фактура',
  type: 'local',
  aggregatedFlow: AggregatedInvoiceCorrection
};

export default InvoiceCorrectionUCD174;
