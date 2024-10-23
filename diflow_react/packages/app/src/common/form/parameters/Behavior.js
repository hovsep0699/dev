class Behavior {
  static mixin(behavior, data) {
    return new Behavior({ ...behavior.getObject(), ...data });
  }
  constructor({
    initialFieldDomain = { value: '' },
    value = '',
    onChange = () => {},
    isRequired = false,
    scope = '',
    componentStateAdditionalDataConfig = [],
    dataAttributeSelector = '',
    modalBuilder = () => {},
    showErrorMsg = true,
    errorPath = '',
    title = '',
    ajax = {},
    index = null,
    tableCallback = () => {},
    customFieldName = ''
  } = {}) {
    this._initialFieldDomain = initialFieldDomain;
    this._value = value;
    this._onChange = onChange;
    this._isRequired = isRequired;
    this._scope = scope;
    this._dataAttributeSelector = dataAttributeSelector;
    this._componentStateAdditionalDataConfig = componentStateAdditionalDataConfig;
    this._modalBuilder = modalBuilder;
    this._title = title;
    this._ajax = ajax;
    this._showErrorMsg = showErrorMsg;
    this._errorPath = errorPath;
    this._index = index;
    this._tableCallback = tableCallback;
    this._customFieldName = customFieldName;
  }
  getObject() {
    return {
      initialFieldDomain: this.initialFieldDomain,
      value: this.value,
      onChange: this.onChange,
      isRequired: this.isRequired,
      scope: this.scope,
      dataAttributeSelector: this.dataAttributeSelector,
      componentStateAdditionalDataConfig: this.componentStateAdditionalDataConfig,
      modalBuilder: this.modalBuilder,
      title: this.title,
      ajax: this.ajax,
      showErrorMsg: this.showErrorMsg,
      errorPath: this.errorPath,
      index: this.index,
      tableCallback: this.tableCallback,
      customFieldName: this.customFieldName
    };
  }
  get initialFieldDomain() {
    return this._initialFieldDomain;
  }
  get value() {
    return this._value;
  }
  get onChange() {
    return this._onChange;
  }
  get isRequired() {
    return this._isRequired;
  }
  get scope() {
    return this._scope;
  }
  get dataAttributeSelector() {
    return this._dataAttributeSelector;
  }
  get title() {
    return this._title;
  }
  get ajax() {
    return this._ajax;
  }
  get componentStateAdditionalDataConfig() {
    return this._componentStateAdditionalDataConfig;
  }
  get modalBuilder() {
    return this._modalBuilder;
  }
  get showErrorMsg() {
    return this._showErrorMsg;
  }
  get errorPath() {
    return this._errorPath;
  }
  get index() {
    return this._index;
  }
  get tableCallback() {
    return this._tableCallback;
  }
  get customFieldName() {
    return this._customFieldName;
  }
}

export default Behavior;
