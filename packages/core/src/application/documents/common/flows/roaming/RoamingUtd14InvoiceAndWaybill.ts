import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const RoamingUtd14InvoiceAndWaybill: IFlow = {
  name: 'roaming_utd_14_invoice_and_waybill',
  label: 'Универсальный передаточный документ',
  type: 'roaming',
  aggregatedFlow: UTDInvoice
};

export default RoamingUtd14InvoiceAndWaybill;
