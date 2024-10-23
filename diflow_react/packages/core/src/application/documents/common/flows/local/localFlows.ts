import { IFlow } from '../types';
import Act from './Act';
import Act552 from './Act552';
import Bilateral from './Bilateral';
import Unilateral from './Unilateral';
import Waybill551 from './Waybill551';
import Waybill from './Waybill';
import Bill from './Bill';
import InformationMessage from './InformationMassage';
import UnformalizedUnilateralUnsigned from './UnformalizedUnilateralUnsigned';
import Invoice from './Invoice';
import InvoiceCorrection from './InvoiceCorrection';
import InvoiceCorrectionUCD174 from './InvoiceCorrectionUCD174';
import InvoiceCorrectionUCD14 from './InvoiceCorrectionUCD14';
import UCD14Invoice from './UCD14Invoice';
import UCD174Invoice from './UCD174Invoice';
import UCD14InvoiceAndWaybill from './UCD14InvoiceAndWaybill';
import UCD174InvoiceAndWaybill from './UCD174InvoiceAndWaybill';
import UCDWaybill from './UCDWaybill';
import UTDWaybill from './UTDWaybill';
import Utd14InvoiceAndWaybill from './UTD14InvoiceAndWaybill';
import Utd174InvoiceAndWaybill from './UTD174InvoiceAndWaybill';
import UTD14Invoice from './UTD14Invoice';
import UTD174Invoice from './UTD174Invoice';
import InvoiceUTD14 from './InvoiceUTD14';
import InvoiceUTD174 from './InvoiceUTD174';

const localFlows: IFlow[] = [
  Act,
  Act552,
  Waybill,
  Waybill551,
  Bilateral,
  Unilateral,
  Bill,
  InvoiceUTD14,
  InvoiceUTD174,
  InformationMessage,
  UnformalizedUnilateralUnsigned,
  Invoice,
  InvoiceCorrection,
  InvoiceCorrectionUCD174,
  InvoiceCorrectionUCD14,
  UCD14Invoice,
  UCD174Invoice,
  UCD14InvoiceAndWaybill,
  UCD174InvoiceAndWaybill,
  UCDWaybill,
  UTD14Invoice,
  UTD174Invoice,
  Utd14InvoiceAndWaybill,
  Utd174InvoiceAndWaybill,
  UTDWaybill
];

export default localFlows;
