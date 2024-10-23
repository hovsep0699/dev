import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const UTD174InvoiceAndWaybill: IFlow = {
  name: 'utd_174_invoice_and_waybill',
  label: 'Универсальный передаточный документ',
  type: 'local',
  aggregatedFlow: UTDInvoice
};

export default UTD174InvoiceAndWaybill;
