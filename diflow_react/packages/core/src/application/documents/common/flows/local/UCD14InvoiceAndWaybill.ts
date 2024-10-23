import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const UCD14InvoiceAndWaybill: IFlow = {
  name: 'ucd_14_invoice_and_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'local',
  aggregatedFlow: UCDInvoice
};

export default UCD14InvoiceAndWaybill;
