/*
  НаимОрг - наименование организации
  XML:
  <ИдСв>
    <СвЮЛУч НаимОрг="ООО "СЭРК"" ИННЮЛ="7703608910" КПП="774850001"/>
  </ИдСв>
*/
class Name {
  static isValid() {
    return true;
  }

  static get placeholder() {
    return 'Введите название компании';
  }

  static get hint() {
    return 'Введите название компании';
  }

  static get name() {
    return 'Компания';
  }

  static get field() {
    return 'name';
  }

  constructor(name) {
    this._error = null;
    this._value = name;
  }

  clone() {
    return new Name(this.value);
  }

  set value(name) {
    this._value = name;
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Name;
