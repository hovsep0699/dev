import { IFlow } from '../types';
import TaxcomhubUcd14InvoiceAndWaybill from './TaxcomhubUcd14InvoiceAndWaybill';
import TaxcomhubUcdWaybill from './TaxcomhubUcdWaybill';
import TaxcomhubUtd14InvoiceAndWaybill from './TaxcomhubUtd14InvoiceAndWaybill';
import TaxcomhubUtdWaybill from './TaxcomhubUtdWaybill';
import TaxcomhubUtd14Invoice from './TaxcomhubUtd14Invoice';
import TaxcomhubUcd14Invoice from './TaxcomhubUcd14Invoice';
import TaxcomhubAct552 from './TaxcomhubAct552';
import TaxcomhubWaybill551 from './TaxcomhubWaybill551';

const taxcomhubFlows: IFlow[] = [
  TaxcomhubUcd14InvoiceAndWaybill,
  TaxcomhubUcdWaybill,
  TaxcomhubUtd14InvoiceAndWaybill,
  TaxcomhubUtdWaybill,
  TaxcomhubUtd14Invoice,
  TaxcomhubUcd14Invoice,
  TaxcomhubAct552,
  TaxcomhubWaybill551
];

export default taxcomhubFlows;
