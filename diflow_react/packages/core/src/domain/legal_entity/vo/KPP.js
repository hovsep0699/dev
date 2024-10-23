/*
  КПП(Код Причины Постановки на учёт) состоит из 9 цифр

  Этот номер не уникальный

  Первые четыре цифры КПП представляют собой код налогового органа(codeTaxAuthority), в котором организация поставлена на учет.
  Из них первые две цифры представляют собой код региона, а третья и четвертая цифры являются кодом (номером) налоговой инспекции.

  Пятая и шестая цифры(буквы A-Z) КПП указывают причину постановки на учет(registrationReason). Могут быть латинские прописные буквы!!!
  Например:
    цифры 01 означают, что КПП присвоен организации в связи с постановкой на учет по месту ее нахождения;

    цифры 02, 03, 04, 05, 31 или 32 означают, что КПП присвоен организации по месту нахождения обособленного подразделения организации;

    цифры 06-08 означают, что КПП присвоен организации по месту нахождения принадлежащего ей недвижимого имущества (таким образом, транспортные средства не затрагиваются) в зависимости от вида имущества;

    цифры 10-29 – означают, что КПП присвоен организации по месту нахождения принадлежащих ей транспортных средств в зависимости от вида транспортных средств;

    цифры 50 означают, что КПП присвоен в связи с постановкой на учет в качестве крупнейшего налогоплательщика.

  Последние три цифры(registrationNumber) КПП представляют собой порядковый номер постановки организации на учет в ИФНС по основанию, в связи с которым ей присвоен этот КПП.

  КПП может меняться (смена адреса которые относится к другой налоговой инспекции)
*/
class KPP {
  static get REG_EXP() {
    return new RegExp('^[0-9]{2}[0-9]{2}[0-9A-Z]{2}[0-9]{3}$');
  }

  static validate(value) {
    return KPP.REG_EXP.test(value) ? undefined : 'Введите код длиной 9 знаков';
  }

  static isValid(value) {
    return !KPP.validate(value);
  }

  static mask(value) {
    return value && value.replace(/\D/g, '').slice(0, 9);
  }

  static get placeholder() {
    return 'Введите КПП';
  }

  static get hint() {
    return 'Введите 9-значный Код Причины Постановки на учет';
  }

  static get name() {
    return 'КПП';
  }

  static get field() {
    return 'kpp';
  }

  constructor(kpp) {
    if (KPP.isValid(`${kpp}`)) {
      this._codeTaxAuthority = `${kpp}`.substring(0, 4);
      this._registrationReason = `${kpp}`.substring(4, 6);
      this._registrationNumber = `${kpp}`.substring(6);
      this._value = `${kpp}`;
    } else {
      this._value = kpp;
    }
  }

  clone() {
    return new KPP(this.value);
  }

  get value() {
    return this._value;
  }

  get codeTaxAuthority() {
    return this._codeTaxAuthority;
  }

  get registrationReason() {
    return this._registrationReason;
  }

  get registrationNumber() {
    return this._registrationNumber;
  }
}

export default KPP;
