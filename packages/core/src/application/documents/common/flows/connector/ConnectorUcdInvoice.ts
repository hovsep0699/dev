import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const ConnectorUcdInvoice: IFlow = {
  name: 'connector_ucd_invoice',
  label: 'Универсальный корректировочный документ',
  type: 'connector',
  aggregatedFlow: UCDInvoice
};

export default ConnectorUcdInvoice;
