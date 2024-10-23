import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const RoamingUtd174InvoiceAndWaybill: IFlow = {
  name: 'roaming_utd_174_invoice_and_waybill',
  label: 'Универсальный передаточный документ',
  type: 'roaming',
  aggregatedFlow: UTDInvoice
};

export default RoamingUtd174InvoiceAndWaybill;
