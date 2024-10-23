import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const ConnectorUtdInvoiceAndWaybill: IFlow = {
  name: 'connector_utd_invoice_and_waybill',
  label: 'Универсальный передаточный документ',
  type: 'connector',
  aggregatedFlow: UTDInvoice
};

export default ConnectorUtdInvoiceAndWaybill;
