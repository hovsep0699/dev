export default class Certificate {
  constructor(subject, thumbprint, validFrom, validTo, serialNumber, isActive) {
    this._subject = subject;
    this._thumbprint = thumbprint;
    this._valid_from = validFrom;
    this._valid_to = validTo;
    this._serialNumber = serialNumber;
    this._isActive = isActive;
  }

  clone() {
    return new Certificate(
      this.subject,
      this.thumbprint,
      this.validFrom,
      this.validTo,
      this.serialNumber,
    );
  }

  get subject() {
    return this._subject;
  }

  get thumbprint() {
    return this._thumbprint;
  }

  get validFrom() {
    return this._valid_from;
  }

  get validTo() {
    return this._valid_to;
  }

  get serialNumber() {
    return this._serialNumber;
  }

  get isActive() {
    return this._isActive;
  }

  get isCompany() {
    return !!(this.subject.OGRN || this.subject.OGRNIP);
  }

  get isOutdated() {
    return new Date(this.validTo).getTime() < Date.now();
  }
}
