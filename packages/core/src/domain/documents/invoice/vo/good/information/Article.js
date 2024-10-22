/*
  АртикулТов - Артикул товара
  T(1-50)
*/

class Article {
  static get REG_EXP() {
    return new RegExp('^.{0,50}$');
  }

  static validate(value) {
    return value && !Article.REG_EXP.test(value) ? 'Введите артикул товара (до 50 символов)' : undefined;
  }

  static isValid(value) {
    return !Article.validate(value);
  }

  static get hint() {
    return 'Введите артикул товара (до 50 символов)';
  }

  static get placeholder() {
    return 'Введите артикул товара';
  }

  static get name() {
    return 'Артикул';
  }

  static get field() {
    return 'article';
  }

  constructor(code) {
    if (!Article.isValid(`${code}`)) {
      this._error = new Error('Невозможно создать артикул товара. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${code}`;
  }

  clone() {
    return new Article(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Article;
