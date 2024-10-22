import { IFlow } from '../types';
import ConnectorUnformalizedBilateral from './ConnectorUnformalizedBilateral';
import ConnectorUnformalizedUnilateral from './ConnectorUnformalizedUnilateral';
import ConnectorUcdInvoice from './ConnectorUcdInvoice';
import ConnectorUcdInvoiceAndWaybill from './ConnectorUcdInvoiceAndWaybill';
import ConnectorUcdWaybill from './ConnectorUcdWaybill';
import ConnectorUtdInvoice from './ConnectorUtdInvoice';
import ConnectorUtdInvoiceAndWaybill from './ConnectorUtdInvoiceAndWaybill';
import ConnectorUtdWaybill from './ConnectorUtdWaybill';

const connectorFlows: IFlow[] = [
  ConnectorUnformalizedBilateral,
  ConnectorUnformalizedUnilateral,
  ConnectorUcdInvoice,
  ConnectorUcdInvoiceAndWaybill,
  ConnectorUcdWaybill,
  ConnectorUtdInvoice,
  ConnectorUtdInvoiceAndWaybill,
  ConnectorUtdWaybill
];

export default connectorFlows;
