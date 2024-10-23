import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const InternalRoamingUtd14InvoiceAndWaybill: IFlow = {
  name: 'internal_roaming_utd_14_invoice_and_waybill',
  label: 'Универсальный передаточный документ',
  type: 'internal_roaming',
  aggregatedFlow: UTDInvoice
};

export default InternalRoamingUtd14InvoiceAndWaybill;
