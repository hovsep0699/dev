import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const UCD14Invoice: IFlow = {
  name: 'ucd_14_invoice',
  label: 'Универсальный корректировочный документ',
  type: 'local',
  aggregatedFlow: UCDInvoice
};

export default UCD14Invoice;
