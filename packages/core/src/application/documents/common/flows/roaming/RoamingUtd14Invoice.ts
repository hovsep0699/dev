import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const RoamingUtd14Invoice: IFlow = {
  name: 'roaming_utd_14_invoice',
  label: 'Универсальный передаточный документ',
  type: 'roaming',
  aggregatedFlow: UTDInvoice
};

export default RoamingUtd14Invoice;
