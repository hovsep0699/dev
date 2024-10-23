import { IFlow } from '../types';
import UTDInvoice from '../aggregatedFlows/UTDInvoice';

const InternalRoamingUniversalTransferDocumentWaybill: IFlow = {
  name: 'internal_roaming_universal_transfer_document_waybill',
  label: 'Универсальный передаточный документ',
  type: 'internal_roaming',
  aggregatedFlow: UTDInvoice
};

export default InternalRoamingUniversalTransferDocumentWaybill;
