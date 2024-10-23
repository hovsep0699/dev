import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const ConnectorUtdInvoice: IFlow = {
  name: 'connector_utd_invoice',
  label: 'Универсальный передаточный документ',
  type: 'connector',
  aggregatedFlow: UTDInvoice
};

export default ConnectorUtdInvoice;
