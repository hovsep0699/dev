import CertificateHandler from './handlers/sign/CertificateHandler';
import RolesHandler from './handlers/sign/RolesHandler';
import ReceiptsHandler from './handlers/sign/ReceiptsHandler';
import SignDocumentsProcessHandler from './handlers/sign/SignDocumentsProcessHandler';
import SignReceiptsProcessHandler from './handlers/sign/SignReceiptsProcessHandler';
import SignContainerProcessHandler from './handlers/sign/SignContainerProcessHandler';
import DocumentContentHandler from './handlers/sign/DocumentContentHandler';
import CreateSignHandler from './handlers/sign/CreateSignHandler';
import SendSignHandler from './handlers/sign/SendSignHandler';
import SendDocumentHandler from './handlers/sign/SendDocumentHandler';
import SignEventManager from './SignEventManager';
import SignRequest from './SignRequest';

class SignService {
  constructor() {
    this._isAborted = false;
    this._events = new SignEventManager();
    this._getSignAndSendReceiptsChain = () => {
      const certificateHandler = new CertificateHandler();
      const rolesHandler = new RolesHandler();
      const receiptsHandler = new ReceiptsHandler();
      const signProcessHandler = new SignReceiptsProcessHandler();
      certificateHandler
        .setNext(rolesHandler)
        .setNext(receiptsHandler)
        .setNext(signProcessHandler);
      return certificateHandler;
    };
    this._getSignAndSendDocumentsChain = () => {
      const certificateHandler = new CertificateHandler();
      const rolesHandler = new RolesHandler();
      const signProcessHandler = new SignDocumentsProcessHandler();
      certificateHandler.setNext(rolesHandler).setNext(signProcessHandler);
      return certificateHandler;
    };
    this._getSignAndSendContainerChain = () => {
      const certificateHandler = new CertificateHandler();
      const rolesHandler = new RolesHandler();
      const signProcessHandler = new SignContainerProcessHandler();
      certificateHandler.setNext(rolesHandler).setNext(signProcessHandler);
      return certificateHandler;
    };

    this._receiptsForSigningChain = () => {
      const certificateHandler = new CertificateHandler();
      const rolesHandler = new RolesHandler();
      const receiptsHandler = new ReceiptsHandler();
      certificateHandler.setNext(rolesHandler).setNext(receiptsHandler);
      return certificateHandler;
    };

    this.signAndSendReceiptsChain = this._getSignAndSendReceiptsChain();
    this.signAndSendDocumentsChain = this._getSignAndSendDocumentsChain();
    this.signAndSendContainerChain = this._getSignAndSendContainerChain();
    this.receiptsForSigningChain = this._receiptsForSigningChain();
    this.events.subscribe('abortSigning', this.abortSigning.bind(this));
  }

  get events() {
    return this._events;
  }

  get isAborted() {
    return this._isAborted;
  }

  abortSigning() {
    this._isAborted = true;
  }

  resetIsAbortedFlag() {
    this._isAborted = false;
  }

  getSignAndSendReceiptsProcessChain() {
    const documentContentHandler = new DocumentContentHandler();
    const createSignHandler = new CreateSignHandler();
    const sendSignHandler = new SendSignHandler();
    const signProcessHandler = new SignReceiptsProcessHandler();
    documentContentHandler
      .setNext(createSignHandler)
      .setNext(sendSignHandler)
      .setNext(signProcessHandler);
    return documentContentHandler;
  }

  getSignAndSendDocumentsProcessChain() {
    const documentContentHandler = new DocumentContentHandler();
    const createSignHandler = new CreateSignHandler();
    const sendSignHandler = new SendSignHandler();
    const sendDocumentHandler = new SendDocumentHandler();
    const signProcessHandler = new SignDocumentsProcessHandler();
    documentContentHandler
      .setNext(createSignHandler)
      .setNext(sendSignHandler)
      .setNext(sendDocumentHandler)
      .setNext(signProcessHandler);
    return documentContentHandler;
  }

  getSignContainerProcessChain() {
    const documentContentHandler = new DocumentContentHandler();
    const createSignHandler = new CreateSignHandler();
    const sendSignHandler = new SendSignHandler();
    const signContainerProcessHandler = new SignContainerProcessHandler();
    documentContentHandler
      .setNext(createSignHandler)
      .setNext(sendSignHandler)
      .setNext(signContainerProcessHandler);
    return documentContentHandler;
  }

  async getReceiptsForSigningList() {
    const request = new SignRequest();
    const res = await this.receiptsForSigningChain.sign(request);
    return res?.data?.documents;
  }

  async signReceipts(request) {
    return this.signAndSendReceiptsChain.sign(request);
  }

  async signDocuments(request) {
    return this.signAndSendDocumentsChain.sign(request);
  }

  async signContainer(request) {
    return this.signAndSendContainerChain.sign(request);
  }
}

const instance = new SignService();
export default instance;
