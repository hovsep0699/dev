class UserAgreement {
  constructor(parameters, agree, disagree) {
    if (!parameters) {
      throw new Error('Необходимо передать parameters в конструктор');
    }
    if (!parameters.hasOwnProperty('agreement_url')) {
      throw new Error('Нет поля agreement_url');
    }
    if (!parameters.hasOwnProperty('register_title')) {
      throw new Error('Нет поля register_title');
    }
    if (!parameters.hasOwnProperty('register_text_header')) {
      throw new Error('Нет поля register_text_header');
    }
    if (!parameters.hasOwnProperty('register_text_footer')) {
      throw new Error('Нет поля register_text_footer');
    }
    if (!parameters.hasOwnProperty('register_checkbox')) {
      throw new Error('Нет поля register_checkbox');
    }
    if (!parameters.hasOwnProperty('register_force_activation')) {
      throw new Error('Нет поля register_force_activation');
    }
    if (!parameters.hasOwnProperty('name')) {
      throw new Error('Нет поля name');
    }
    this._parameters = parameters;

    if (!agree) {
      throw new Error('Необходимо передать agree в конструктор');
    }
    if (!disagree) {
      throw new Error('Необходимо передать disagree в конструктор');
    }

    this._agree = agree;
    this._disagree = disagree;
  }

  get parameters() {
    return this._parameters;
  }

  get agree() {
    return this._agree;
  }

  get disagree() {
    return this._disagree;
  }
}

export default UserAgreement;
