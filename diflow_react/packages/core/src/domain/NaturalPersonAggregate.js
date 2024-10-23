import PersonCertificate from './natural_person/PersonCertificate';
import NaturalPerson from './natural_person/NaturalPerson';

class NaturalPersonAggregate {
  constructor() {
    this.persons = new Map();
  }

  addPerson(personData) {
    if (!(personData instanceof NaturalPerson)) {
      throw new Error('Параметр должен быть экземпляром NaturalPerson');
    }
    this.persons.set(personData.id, personData);
  }

  addCertificate(personId, certificateData) {
    if (!(certificateData instanceof PersonCertificate)) {
      throw new Error('Параметр должен быть экземпляром PersonCertificate');
    }
    const person = this.persons.get(personId);
    if (!person.certificates) person.certificates = new Map();
    person.certificates.add(certificateData.id, certificateData);
  }

  removeCertificate(personId, certificateId) {
    if (!this.persons.has(personId)) {
      throw new Error('Попытка удалить сертификат у несуществующего физического лица');
    }
    const person = this.persons.get(personId);

    if (!person.certificates || (person.certificates && !person.certificates.has(certificateId))) {
      throw new Error('Попытка удалить сертификат которого нет у физического лица');
    }
    person.certificates.delete(certificateId);
  }
}

const instance = new NaturalPersonAggregate();
Object.freeze(instance);

export default instance;
