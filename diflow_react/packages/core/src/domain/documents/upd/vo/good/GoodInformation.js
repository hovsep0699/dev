/*
  Дополнительные сведения об отгруженных товарах (выполненных работах, оказанных услугах), переданных имущественных правах (ДопСведТов)
*/
import OrderedCount from './information/OrderedCount';
import Kind from './information/Kind';
import Description from './information/Description';
import ProductCode from './information/ProductCode';
import Sort from './information/Sort';
import Article from './information/Article';
import CatalogCode from './information/CatalogCode';
import KindCode from './information/KindCode';

class GoodInformation {
  static isValid(value) {
    return !GoodInformation.validate(value);
  }

  static get hint() {
    return 'Дополнительные сведения о товаре';
  }

  static get placeholder() {
    return 'Введите дополнительные сведения о товаре';
  }

  static get name() {
    return 'Дополнительные сведения о товаре';
  }

  static get field() {
    return 'information';
  }

  static get VOs() {
    return [Kind, OrderedCount, ProductCode, Description, Sort, Article, CatalogCode, KindCode];
  }

  constructor({
    kind, orderedCount, productCode, description, sort, article, catalogCode, kindCode
  }) {
    this.kind = kind;
    this.orderedCount = orderedCount;
    this.productCode = productCode;
    this.description = description;
    this.sort = sort;
    this.article = article;
    this.catalogCode = catalogCode;
    this.kindCode = kindCode;
  }

  clone() {
    return new GoodInformation(this.value);
  }

  get value() {
    return {
      [Kind.field]: this.kind,
      [OrderedCount.field]: this.orderedCount,
      [ProductCode.field]: this.productCode,
      [Description.field]: this.description,
      [Sort.field]: this.sort,
      [Article.field]: this.article,
      [CatalogCode.field]: this.catalogCode,
      [KindCode.field]: this.kindCode,
    };
  }

  get kind() {
    return this._kind;
  }

  set kind(value) {
    this._kind = new Kind(value);
  }

  get orderedCount() {
    return this._orderedCount;
  }

  set orderedCount(value) {
    this._orderedCount = new OrderedCount(value);
  }

  get productCode() {
    return this._productCode;
  }

  set productCode(value) {
    this._productCode = new ProductCode(value);
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = new Description(value);
  }

  get sort() {
    return this._sort;
  }

  set sort(value) {
    this._sort = new Sort(value);
  }

  get article() {
    return this._article;
  }

  set article(value) {
    this._article = new Article(value);
  }

  get catalogCode() {
    return this._catalogCode;
  }

  set catalogCode(value) {
    this._catalogCode = new CatalogCode(value);
  }

  get kindCode() {
    return this._kindCode;
  }

  set kindCode(value) {
    this._kindCode = new KindCode(value);
  }
}

export default GoodInformation;
