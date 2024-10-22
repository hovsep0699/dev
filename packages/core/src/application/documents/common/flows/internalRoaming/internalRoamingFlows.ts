import { IFlow } from '../types';
import InternalRoamingUcd14Invoice from './InternalRoamingUcd14Invoice';
import InternalRoamingUcd14InvoiceAndWaybill from './InternalRoamingUcd14InvoiceAndWaybill';
import InternalRoamingUcdWaybill from './InternalRoamingUcdWaybill';
import InternalRoamingUnformalizedBilateral from './InternalRoamingUnformalizedBilateral';
import InternalRoamingUnformalizedUnilateral from './InternalRoamingUnformalizedUnilateral';
import InternalRoamingUniversalTransferDocumentWaybill from './InternalRoamingUniversalTransferDocumentWaybill';
import InternalRoamingUtd14InvoiceAndWaybill from './InternalRoamingUtd14InvoiceAndWaybill';
import InternalRoamingUtd14Invoice from './InternalRoamingUtd14Invoice';
import InternalRoamingUtdWaybill from './InternalRoamingUtdWaybill';

const internalRoamingFlows: IFlow[] = [
  InternalRoamingUcd14Invoice,
  InternalRoamingUcd14InvoiceAndWaybill,
  InternalRoamingUcdWaybill,
  InternalRoamingUnformalizedBilateral,
  InternalRoamingUnformalizedUnilateral,
  InternalRoamingUniversalTransferDocumentWaybill,
  InternalRoamingUtd14InvoiceAndWaybill,
  InternalRoamingUtd14Invoice,
  InternalRoamingUtdWaybill
];

export default internalRoamingFlows;
