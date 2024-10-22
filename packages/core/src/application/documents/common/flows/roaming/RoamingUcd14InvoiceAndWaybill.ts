import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const RoamingUcd14InvoiceAndWaybill: IFlow = {
  name: 'roaming_ucd_14_invoice_and_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'roaming',
  aggregatedFlow: UCDInvoice
};

export default RoamingUcd14InvoiceAndWaybill;
