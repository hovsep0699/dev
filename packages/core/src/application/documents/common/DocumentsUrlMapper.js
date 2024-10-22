class DocumentsUrlMapper {
  constructor() {
    this.flowGroupMap = {
      universal_invoice: '/front/document',
      universal_correction_document: '/front/document',
      waybill_551: '/front/document',
      act_552: '/front/document',
      bill: '/front/document',
      invoice: '/front/document',
      //TODO найти ссылки
      // invoice_correction: '',
      // invoice: '',
    };

    this.flowTypeMap = {
      unilateral: '/front/document',
      bilateral: '/front/document',
      invoice_correction_ucd: '/front/document',
      invoice_utd: '/front/document'
    };
  }
  getSendUrl = (docId, flowType, flowGroup) => {
    let url = '';
    if (this.flowTypeMap[flowType]) {
      url = this.flowTypeMap[flowType];
    }
    if (this.flowGroupMap[flowGroup]) {
      url = this.flowGroupMap[flowGroup];
    }
    if (!url || !docId) return false;
    return `${url}/${docId}/send`;
  };
}

const instance = new DocumentsUrlMapper();
export default instance;
