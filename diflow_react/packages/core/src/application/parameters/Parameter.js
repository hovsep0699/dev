class Parameter {
  constructor(param) {
    if (param && param.name) this._name = param.name;
    if (param && param.version) this._version = param.version;
    if (param && param.agreement_url) this._url = param.agreement_url;
    if (param && param.register_title) this._title = param.register_title;
    if (param && param.register_text_header) this._textHeader = param.register_text_header;
    if (param && param.register_text_footer) this._textFooter = param.register_text_footer;
    if (param && param.register_checkbox) this._checkbox = param.register_checkbox;
    if (param && param.register_force_activation)
      this._rorceActivation = param.register_force_activation;
  }

  get url() {
    return this._url;
  }
  get name() {
    return this._name;
  }
  get title() {
    return this._title;
  }
  get version() {
    return this._version;
  }
  get checkbox() {
    return this._checkbox;
  }
  get textHeader() {
    return this._textHeader;
  }
  get textFooter() {
    return this._textFooter;
  }
  get rorceActivation() {
    return this._rorceActivation;
  }
}

export default Parameter;
