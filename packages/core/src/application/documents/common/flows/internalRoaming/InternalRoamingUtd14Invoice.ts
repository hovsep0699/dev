import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const InternalRoamingUtd14Invoice: IFlow = {
  name: 'internal_roaming_utd_14_invoice',
  label: 'Универсальный передаточный документ',
  type: 'internal_roaming',
  aggregatedFlow: UTDInvoice
};

export default InternalRoamingUtd14Invoice;
