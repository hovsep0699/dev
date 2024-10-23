import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const ConnectorUtdWaybill: IFlow = {
  name: 'connector_utd_waybill',
  label: 'Универсальный передаточный документ',
  type: 'connector',
  aggregatedFlow: UTDInvoice
};

export default ConnectorUtdWaybill;
