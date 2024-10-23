import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const RoamingUcd174InvoiceAndWaybill: IFlow = {
  name: 'roaming_ucd_174_invoice_and_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'roaming',
  aggregatedFlow: UCDInvoice
};

export default RoamingUcd174InvoiceAndWaybill;
