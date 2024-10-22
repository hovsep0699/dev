/*
  Контактные данные (КонтактТип)
 */
import Phone from './Phone';
import Email from './Email';

class ContactType {
  static validate(value) {
    const errorMsgs = [];
    ContactType.VOs.forEach((DomainVO) => {
      const msg = DomainVO.validate(value && value[DomainVO.field]);
      if (msg !== undefined) {
        errorMsgs.push(msg);
      }
    });
    return (errorMsgs.length > 0) ? 'Контактные данные заполнены неверно' : undefined;
  }

  static isValid(value) {
    return !ContactType.validate(value);
  }

  static get hint() {
    return 'Введите контакты';
  }

  static get placeholder() {
    return 'Введите контакты';
  }

  static get name() {
    return 'Контактные данные';
  }

  static get field() {
    return 'contact';
  }

  static get VOs() {
    return [Phone, Email];
  }

  constructor(phone, email) {
    this.phone = phone;
    this.email = email;
  }

  clone() {
    return new ContactType(this.phone, this.email);
  }

  get phone() {
    return this._phone;
  }

  set phone(value) {
    this._phone = new Phone(value);
  }

  set email(value) {
    this._email = new Email(value);
  }

  get email() {
    return this._email;
  }

  get value() {
    return {
      [Phone.field]: this.phone,
      [Email.field]: this.email
    };
  }
}

export default ContactType;
