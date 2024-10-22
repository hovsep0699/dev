import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const Utd14InvoiceAndWaybill: IFlow = {
  name: 'utd_14_invoice_and_waybill',
  label: 'Универсальный передаточный документ',
  type: 'local',
  aggregatedFlow: UTDInvoice
};

export default Utd14InvoiceAndWaybill;
