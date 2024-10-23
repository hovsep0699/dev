/*
  Почтовый индекс
  В России принята 6-значная система XXXYYY
  XXX — код города, а YYY — номер почтового отделения
  Исключениями из этой системы являются Москва и Санкт-Петербург.
  Эти мегаполисы имеют несколько кодов города.

  https://vinfo.russianpost.ru/database/ops.html (Справочник обновляется периодически/)
*/
class PostIndex {
  static get REG_EXP() {
    return new RegExp('^[0-9]{3}[0-9]{3}$');
  }

  static validate(postIndex) {
    return !postIndex || PostIndex.REG_EXP.test(postIndex) ? undefined : 'Введите индекс длиной 6 знаков';
  }

  static isValid(postIndex) {
    return !PostIndex.validate(postIndex);
  }

  static mask(value) {
    return value && value.replace(/\D/g, '').slice(0, 6);
  }

  static get placeholder() {
    return 'Введите индекс';
  }

  static get hint() {
    return 'Введите 6-значный код';
  }

  static get name() {
    return 'Индекс';
  }

  static get field() {
    return 'postalCode';
  }

  constructor(postIndex) {
    if (PostIndex.isValid(`${postIndex}`)) {
      this._value = `${postIndex}`;
    } else {
      this._value = postIndex;
    }
  }

  clone() {
    return new PostIndex(this.value);
  }

  get value() {
    return this._value;
  }
}

export default PostIndex;
