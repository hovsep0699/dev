

import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const InternalRoamingUtdWaybill: IFlow = {
  name: 'internal_roaming_utd_waybill',
  label: 'Универсальный передаточный документ',
  type: 'internal_roaming',
  aggregatedFlow: UTDInvoice
};

export default InternalRoamingUtdWaybill;
