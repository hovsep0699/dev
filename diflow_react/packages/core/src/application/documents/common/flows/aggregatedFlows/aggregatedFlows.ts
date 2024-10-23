import Act from './Act';
import Waybill from './Waybill';
import { IAggregatedFlow } from '../types';
import Unformalized from './Unformalized';
import Invoice from './Invoice';
import InvoiceCorrection from './InvoiceCorrection';
import UTDInvoice from './UTDInvoice';
import UTDWaybill from './UTDWaybill';
import UTDInvoiceWaybill from './UTDInvoiceWaybill';
import UCDInvoice from './UCDInvoice';
import UCDWaybill from './UCDWaybill';
import UCDInvoiceWaybill from './UCDInvoiceWaybill';

const aggregatedFlows: IAggregatedFlow[] = [
  Act,
  Waybill,
  Unformalized,
  Invoice,
  InvoiceCorrection,
  UTDInvoice,
  UTDWaybill,
  UTDInvoiceWaybill,
  UCDInvoice,
  UCDWaybill,
  UCDInvoiceWaybill
];

export default aggregatedFlows;
