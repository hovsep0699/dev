import Environment from '../../Environment';
import { DOCUMENT } from './Lbl';
import SignRequest from '../../sign/SignRequest';
import SignService from '../../sign/SignService';
import FlowsService from '../common/flows/FlowsService';
import Unformalized from './flows/aggregatedFlows/Unformalized';

class DocumentsService {
  getTitle(flowType: string, typeTitle?: string): string {
    const aggregatedFlow = flowType ? FlowsService.getAggregatedFlowByFlowName(flowType) : null;
    if (aggregatedFlow === Unformalized && typeTitle) return typeTitle;
    if (aggregatedFlow?.label) return aggregatedFlow.label;

    const flow = FlowsService.getFlowByName(flowType);
    if (flow?.label) return flow.label;

    return DOCUMENT;
  }

  getAll(offset: number, limit: number) {
    return Environment.getDocumentsGateway().getAll(offset, limit);
  }

  getInbox(offset?: number, limit?: number) {
    return Environment.getDocumentsGateway().getInbox(offset, limit);
  }

  getOutbox(offset?: number, limit?: number) {
    return Environment.getDocumentsGateway().getOutbox(offset, limit);
  }

  getDraft(offset?: number, limit?: number) {
    return Environment.getDocumentsGateway().getDraft(offset, limit);
  }

  getArchive(offset?: number, limit?: number) {
    return Environment.getDocumentsGateway().getArchive(offset, limit);
  }

  archive(ids: string[]) {
    return Environment.getDocumentsGateway().archive(ids);
  }

  delete(id: string) {
    return Environment.getDocumentsGateway().delete(id);
  }

  search(params: any, offset?: number, limit?: number) {
    return Environment.getDocumentsGateway().search(params, offset, limit);
  }

  getLabeled(labelId: string, offset?: number, limit?: number) {
    return Environment.getDocumentsGateway().getLabeled(labelId, offset, limit);
  }

  async signAndSendDocuments(documents: any[]) {
    const request = new SignRequest({ documents });
    const result = await SignService.signDocuments(request);
    return result;
  }

  async signAndSendContainer(documents: any[]) {
    const request = new SignRequest({ documents });
    const result = await SignService.signContainer(request);
    return result;
  }
}

const instance = new DocumentsService();
export default instance;
