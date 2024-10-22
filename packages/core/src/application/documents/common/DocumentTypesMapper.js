import {
  INFORMATION_MESSAGE,
  UNIVERSAL_INVOICE,
  UNIVERSAL_CORRECTION_DOCUMENT,
  WAYBILL,
  ACT,
  BILL,
  INVOICE
} from './Lbl';

function DocumentTypesMapper(systemName, typeTitle) {
  const map = {
    infsoob: INFORMATION_MESSAGE,
    on_schfdoppr: UNIVERSAL_INVOICE,
    on_schfdoppok: UNIVERSAL_INVOICE,
    on_nschfdoppr: UNIVERSAL_INVOICE,
    on_nschfdoppok: UNIVERSAL_INVOICE,
    on_korschfdoppr: UNIVERSAL_CORRECTION_DOCUMENT,
    on_korschfdoppok: UNIVERSAL_CORRECTION_DOCUMENT,
    dp_tovtorgpr: WAYBILL,
    dp_tovtorgpok: WAYBILL,
    dp_rezruisp: ACT,
    dp_rezruzak: ACT,
    invoice: INVOICE,
    bill: BILL
  };

  if (systemName === 'universal') {
    return typeTitle || false;
  }

  return map[systemName] || false;
}

export default DocumentTypesMapper;
