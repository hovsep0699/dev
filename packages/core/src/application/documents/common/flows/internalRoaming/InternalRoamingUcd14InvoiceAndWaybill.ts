import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const InternalRoamingUcd14InvoiceAndWaybill: IFlow = {
  name: 'internal_roaming_ucd_14_invoice_and_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'internal_roaming',
  aggregatedFlow: UCDInvoice
};

export default InternalRoamingUcd14InvoiceAndWaybill;
