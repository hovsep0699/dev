import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const RoamingUniversalTransferDocumentWaybill: IFlow = {
  name: 'roaming_universal_transfer_document_waybill',
  label: 'Универсальный передаточный документ',
  type: 'roaming',
  aggregatedFlow: UTDInvoice
};

export default RoamingUniversalTransferDocumentWaybill;
