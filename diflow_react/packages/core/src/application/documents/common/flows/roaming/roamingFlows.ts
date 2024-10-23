import { IFlow } from '../types';
import RoamingAct552 from './RoamingAct552';
import RoamingUnformalizedBilateral from './RoamingUnformalizedBilateral';
import RoamingUnformalizedUnilateral from './RoamingUnformalizedUnilateral';
import RoamingUniversalTransferDocumentWaybill from './RoamingUniversalTransferDocumentWaybill';
import RoamingWaybill551 from './RoamingWaybill551';
import RoamingUcdWaybill from './RoamingUcdWaybill';
import RoamingUcd14InvoiceAndWaybill from './RoamingUcd14InvoiceAndWaybill';
import RoamingUcd174InvoiceAndWaybill from './RoamingUcd174InvoiceAndWaybill';
import RoamingUtd14InvoiceAndWaybill from './RoamingUtd14InvoiceAndWaybill';
import RoamingUtd174InvoiceAndWaybill from './RoamingUtd174InvoiceAndWaybill';
import RoamingUcd14Invoice from './RoamingUcd14Invoice';
import RoamingUcd174Invoice from './RoamingUcd174Invoice';
import RoamingUtd14Invoice from './RoamingUtd14Invoice';
import RoamingUtd174Invoice from './RoamingUtd174Invoice';
import RoamingUtdWaybill from './RoamingUtdWaybill';

const roamingFlows: IFlow[] = [
  RoamingAct552,
  RoamingUnformalizedBilateral,
  RoamingUnformalizedUnilateral,
  RoamingUniversalTransferDocumentWaybill,
  RoamingUcdWaybill,
  RoamingWaybill551,
  RoamingUcd14InvoiceAndWaybill,
  RoamingUcd174InvoiceAndWaybill,
  RoamingUcd14Invoice,
  RoamingUcd174Invoice,
  RoamingUtd14InvoiceAndWaybill,
  RoamingUtd174InvoiceAndWaybill,
  RoamingUtd14Invoice,
  RoamingUtd174Invoice,
  RoamingUtdWaybill
];

export default roamingFlows;
