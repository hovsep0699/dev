import {
  DOCUMENT_INBOX,
  DOCUMENT_OUTBOX,
  DOCUMENT_DRAFT,
  DOCUMENT_ARCHIVE,
  DOCUMENT_FOLDER,
  NEW_UNIVERSAL_INVOICE,
  NEW_UNIVERSAL_CORRECTION_DOCUMENT,
  NEW_WAYBILL,
  NEW_ACT,
  NEW_BILL,
  NEW_INVOICE_CORRECTION,
  NEW_INVOICE_CORRECTION_UCD,
  NEW_INVOICE_UTD,
  EDIT_UNIVERSAL_INVOICE,
  EDIT_UNIVERSAL_CORRECTION_DOCUMENT,
  EDIT_WAYBILL,
  EDIT_ACT,
  EDIT_BILL,
  EDIT_INVOICE_UTD,
  EDIT_INVOICE_CORRECTION_UCD,
  EDIT_INVOICE,
  EDIT_INVOICE_CORRECTION,
  EDIT_UNFORMALIZED
} from '../../../common/Url';

import { INBOX, OUTBOX, DRAFT, ARCHIVE } from '../../../common/Lbl';
import { IRoute } from '../../../types/routes';

export const routes: IRoute[] = [
  {
    title: INBOX,
    path: DOCUMENT_INBOX,
    exact: true
  },
  {
    title: OUTBOX,
    path: DOCUMENT_OUTBOX,
    exact: true
  },
  {
    title: DRAFT,
    path: DOCUMENT_DRAFT,
    exact: true
  },
  {
    title: ARCHIVE,
    path: DOCUMENT_ARCHIVE,
    exact: true
  },
  {
    path: DOCUMENT_FOLDER,
    exact: true
  }
];

export const routeEdit: any = {
  universal_invoice: EDIT_UNIVERSAL_INVOICE,
  universal_correction_document: EDIT_UNIVERSAL_CORRECTION_DOCUMENT,
  waybill_551: EDIT_WAYBILL,
  act_552: EDIT_ACT,
  invoice_correction_ucd: EDIT_INVOICE_CORRECTION_UCD,
  invoice_utd: EDIT_INVOICE_UTD,
  invoice_correction: EDIT_INVOICE_CORRECTION,
  invoice: EDIT_INVOICE,
  bill: EDIT_BILL,
  unformalized: EDIT_UNFORMALIZED
};

export const routeNew: any = {
  universal_invoice: NEW_UNIVERSAL_INVOICE,
  universal_correction_document: NEW_UNIVERSAL_CORRECTION_DOCUMENT,
  waybill_551: NEW_WAYBILL,
  act_552: NEW_ACT,
  invoice_correction: NEW_INVOICE_CORRECTION,
  invoice_correction_ucd: NEW_INVOICE_CORRECTION_UCD,
  invoice_utd: NEW_INVOICE_UTD,
  bill: NEW_BILL
};
