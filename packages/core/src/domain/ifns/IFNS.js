import Code from './vo/Code';

/* ИФНС (Инспекция Федеральной налоговой службы России) */
class IFNS {
  constructor(id, code, title = '') {
    if (this.isNull()) return;
    if (!id || !code) throw new Error('Невозможно создать ИФНС (входные параметры неверные)');
    this._id = id;
    this._code = new Code(code);
    this._title = title;
  }

  isNull() {
    return false;
  }

  get id() {
    return this._id;
  }

  /*
    код налогового органа состоит из 4 цифр
    (1—2-я цифры) код субъекта Российской Федерации
    (3—4-я цифры) номер инспекции
  */
  get code() {
    return this._code;
  }

  get title() {
    return this._title;
  }
}

export default IFNS;
