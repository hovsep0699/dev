import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const ConnectorUcdWaybill: IFlow = {
  name: 'connector_ucd_waybill',
  label: 'Универсальный корректировочный документ',
  type: 'connector',
  aggregatedFlow: UCDInvoice
};

export default ConnectorUcdWaybill;
