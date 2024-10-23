class Setting {
  constructor(id, field, title, description, isOn = false) {
    this._id = id;
    this._field = field;
    this._title = title;
    this._description = description;
    this._isOn = isOn;
  }

  clone() {
    return new Setting(this._id, this._field, this._title, this._description, this._isOn);
  }

  get id() {
    return this._id;
  }

  get field() {
    return this._field;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get value() {
    return this._isOn;
  }

  on() {
    this._isOn = true;
  }

  off() {
    this._isOn = false;
  }
}

export default Setting;
