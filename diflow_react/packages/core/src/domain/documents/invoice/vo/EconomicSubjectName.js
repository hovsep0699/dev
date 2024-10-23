class EconomicSubjectName {
  static validate(value) {
    return !value ? 'Введите название, ИНН или КПП компании продавца' : undefined;
  }

  static isValid(value) {
    return !EconomicSubjectName.validate(value);
  }

  static get hint() {
    return 'Введите данные продавца в формате: ООО "Название компании", ИНН: 1234567890, КПП: 123456789';
  }

  static get placeholder() {
    return 'Введите продавца';
  }

  static get name() {
    return 'Продавец';
  }

  static get field() {
    return 'economicSubjectName';
  }

  constructor(title) {
    this.title = title;
  }

  clone() {
    return new EconomicSubjectName(this.title);
  }

  get value() {
    return this._title;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }
}

export default EconomicSubjectName;
