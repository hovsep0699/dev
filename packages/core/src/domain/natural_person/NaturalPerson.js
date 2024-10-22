export default class NaturalPerson {
  constructor(data) {
    this._surname = data.surname;
    this._name = data.name;
    this._patronymic = data.patronymic; // необязательное поле
    this._snils = data.snils; // СНИЛС (Страховой номер индивидуального лицевого счёта)
    this._bik = data.bik;
    this._accountNumber = data.accountNumber;
  }
}
