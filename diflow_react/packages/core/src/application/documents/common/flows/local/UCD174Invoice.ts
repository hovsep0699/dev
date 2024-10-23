import { IFlow } from '../types';
import UCDInvoice from '../aggregatedFlows/UCDInvoice';

const UCD174Invoice: IFlow = {
  name: 'ucd_174_invoice',
  label: 'Универсальный корректировочный документ',
  type: 'local',
  aggregatedFlow: UCDInvoice
};

export default UCD174Invoice;
