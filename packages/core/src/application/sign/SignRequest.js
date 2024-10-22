class SignRequest {
  constructor(parameters) {
    this.isAutoMode = true;
    this._signedDocumentIds = new Set();
    if (!parameters) return;
    if (parameters.hasOwnProperty('isAutoMode')) this.isAutoMode = parameters.isAutoMode;
    if (parameters.certificate) this.certificate = parameters.certificate;
    if (parameters.hasOwnProperty('isGrantedToSign'))
      this.isGrantedToSign = parameters.isGrantedToSign;
    if (parameters.documents) {
      this.documents = parameters.documents;
      this._total = parameters.documents.length;
      this._counter = 0;
      this._signFailures = [];
    }
    if (parameters.documentToSign) {
      this.documentToSign = parameters.documentToSign;
      if (this.documentToSign.status === 'signed') {
        this.addSignedDocumentId(this.documentToSign.packageId);
      }
    }
  }

  static clone(request) {
    if (request === null || request === undefined)
      throw new Error('Следует передать запрос для авторизации(SignRequest)');
    if (!(request instanceof SignRequest))
      throw new Error('Параметр должен быть подклассом SignRequest');
    const newReq = new SignRequest();
    if (request.certificate) {
      newReq.certificate = request.certificate.clone();
    }
    newReq.isAutoMode = request.isAutoMode;
    newReq.isGrantedToSign = request.isGrantedToSign;
    newReq.documents = request.documents;
    newReq.documentToSign = request.documentToSign;
    newReq._signedDocumentIds = request.signedDocumentIds;
    newReq._total = request.total;
    newReq._counter = request.counter;
    newReq._signFailures = request.signFailures;
    newReq.error = request.error;

    return newReq;
  }

  set certificate(value) {
    this._certificate = value;
  }

  get certificate() {
    return this._certificate;
  }

  set isAutoMode(value) {
    this._isAutoMode = value;
  }

  get isAutoMode() {
    return this._isAutoMode;
  }

  set isGrantedToSign(value) {
    this._isGrantedToSign = value;
  }

  get isGrantedToSign() {
    return this._isGrantedToSign;
  }

  set documents(documents) {
    this._documents = documents;
    this._total = documents?.length || 0;
    this._counter = 0;
    this._signFailures = [];
  }

  get documents() {
    return this._documents;
  }

  get documentToSign() {
    return this._documentToSign;
  }

  set documentToSign(value) {
    this._documentToSign = value;
    if (this._documentToSign?.status === 'signed') {
      this.addSignedDocumentId(this.documentToSign.packageId);
    }
  }

  get signedDocumentIds() {
    return this._signedDocumentIds;
  }

  addSignedDocumentId(packageId) {
    this._signedDocumentIds.add(packageId);
  }

  get total() {
    return this._total;
  }

  get counter() {
    return this._counter;
  }

  incrementCounter() {
    this._counter = this.counter + 1;
  }

  addSignFailure(failure) {
    this._signFailures.push(failure);
  }

  addContent(value) {
    this._documentToSign.content = value;
  }

  addFileName(value) {
    this._documentToSign.fileName = value;
  }

  addSignature(value) {
    this._documentToSign.signature = value;
  }

  get signFailures() {
    return this._signFailures;
  }

  set error(value) {
    this._error = value;
  }

  get error() {
    return this._error;
  }
}

export default SignRequest;
