import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const ConnectorUcdInvoiceAndWaybill: IFlow = {
  name: 'connector_ucd_invoice_and_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'connector',
  aggregatedFlow: UCDInvoice
};

export default ConnectorUcdInvoiceAndWaybill;
