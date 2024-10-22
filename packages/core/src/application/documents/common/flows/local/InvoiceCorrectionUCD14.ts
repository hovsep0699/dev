import { IFlow } from '../types';
import AggregatedInvoiceCorrection from '../aggregatedFlows/InvoiceCorrection';

const InvoiceCorrectionUCD14: IFlow = {
  name: 'invoice_correction_ucd_14',
  label: 'Корректировочный счёт-фактура',
  type: 'local',
  aggregatedFlow: AggregatedInvoiceCorrection
};

export default InvoiceCorrectionUCD14;
