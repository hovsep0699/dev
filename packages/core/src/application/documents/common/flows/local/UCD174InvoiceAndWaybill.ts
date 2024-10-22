import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const UCD174InvoiceAndWaybill: IFlow = {
  name: 'ucd_174_invoice_and_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'local',
  aggregatedFlow: UCDInvoice
};

export default UCD174InvoiceAndWaybill;
