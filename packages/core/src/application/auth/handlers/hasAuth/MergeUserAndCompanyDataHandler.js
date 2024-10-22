import HasAuthHandlerBase from '../HasAuthHandlerBase';
import IPCompany from '../../../../domain/individual_entrepreneur/Company';
import ULCompany from '../../../../domain/legal_entity/Company';
import NoLegalAddress from '../../../../domain/common/NoLegalAddress';
import NoIFNS from '../../../../domain/ifns/NoIFNS';
import AuthRequest from '../../AuthRequest';

import LegalAddress from '../../../../domain/common/LegalAddress';
import PostIndex from '../../../../domain/common/address/PostIndex';
import Region from '../../../../domain/common/address/Region';
import City from '../../../../domain/common/address/City';
import Settlement from '../../../../domain/common/address/Settlement';
import District from '../../../../domain/common/address/District';
import Street from '../../../../domain/common/address/Street';
import Building from '../../../../domain/common/address/Building';
import House from '../../../../domain/common/address/House';
import Room from '../../../../domain/common/address/Room';

import IFNS from '../../../../domain/ifns/IFNS';

import IndependentDepartment from '../../../../domain/legal_entity/IndependentDepartment';
import IPInternalDepartment from '../../../../domain/individual_entrepreneur/InternalDepartment';
import KPP from '../../../../domain/legal_entity/vo/KPP';

import ULEmployee from '../../../../domain/legal_entity/Employee';

import OKPO_UL from '../../../../domain/legal_entity/vo/OKPO';
import OKPO_IP from '../../../../domain/individual_entrepreneur/vo/OKPO';

import BankDetails from '../../../../domain/bank/BankDetails';
import AccountNumber from '../../../../domain/bank/AccountNumber';
import BIK from '../../../../domain/bank/BIK';

import SecurityService from '../../../security/SecurityService';
import withCompanyState from '../../../../domain/common/company/CompanyStateDecorator';
import Certificate from '../../../../domain/common/Certificate';

class MergeUserAndCompanyDataHandler extends HasAuthHandlerBase {
  hasAuth(request) {
    if (this.canHandle(request)) {
      const req = AuthRequest.clone(request);
      req.company = this.createCompany(request);

      try {
        req.certificate = this.createCertificate(request);
      } catch (error) {
        // TODO: обработка ошибки
        // сертификат может отсутствовать если пользователь авторизовался под логином и паролем
      }

      req.isAuthed = true;
      return this.doNextHandler(req);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    if (request.isAuthed === false) return false;
    return request.rawCompany && request.rawUser;
  }

  createCompany(request) {
    let company;
    const { rawCompany, rawUser } = request;
    const isIP = rawCompany.type.name === 'IP';
    const isUL = rawCompany.type.name === 'UL';

    const {
      diServerId,
      inn,
      name,
      bik,
      accountNumber,
      division: { classificationNumber: okpo }
    } = rawCompany;

    if (isIP) {
      const { ogrn: ogrnip } = rawCompany;
      const { id: localId } = rawUser.company;
      company = withCompanyState(new IPCompany(localId, diServerId, inn, ogrnip, name));
      company.mainDepartment = this.createInternalDepartment(rawUser.company);
      company.okpo = new OKPO_IP(okpo);
    }
    if (isUL) {
      const { ogrn } = rawCompany;
      const { id: localId } = rawUser.company;
      company = withCompanyState(new ULCompany(localId, diServerId, inn, ogrn, name));
      company.mainDepartment = this.createIndependentDepartment(rawUser.company);
      company.okpo = new OKPO_UL(okpo);

      company.independentDepartments.set(diServerId, company.mainDepartment);

      const rawEmployee = { ...rawUser.person, ...rawUser.employee };
      const employee = new ULEmployee(rawEmployee);

      company.addEmployee(employee, true);
    }

    rawUser.roles.forEach(role => {
      SecurityService.addRole(role);
    });

    const isCanCreateBankDetails = BIK.isValid(bik) || AccountNumber.isValid(accountNumber);
    if (isCanCreateBankDetails) {
      company.bankDetails = new BankDetails(undefined, bik, accountNumber);
    }
    company.legalAddress = this.createAddress(rawCompany);
    company.ifns = this.createIFNS(rawCompany);
    company.state = this.createCompanyState(company, rawCompany);
    return company;
  }

  createAddress(raw) {
    let legalAddress = new NoLegalAddress();
    if (raw.division && raw.division.address) {
      const rawAddress = raw.division.address;
      const {
        postalCode,
        region,
        city,
        settlement,
        district,
        street,
        house,
        building,
        room
      } = rawAddress;

      legalAddress = new LegalAddress({
        postalCode: new PostIndex(postalCode),
        region: new Region(region.code, region.title, region.id),
        city: city ? new City(city) : null,
        settlement: settlement ? new Settlement(settlement) : null,
        district: district ? new District(district) : null,
        street: street ? new Street(street) : null,
        house: house ? new House(house) : null,
        building: building ? new Building(building) : null,
        room: room ? new Room(room) : null
      });
    }
    return legalAddress;
  }

  createIFNS(raw) {
    let ifns = new NoIFNS();
    if (raw.taxAuthority) {
      const rawTaxAuthority = raw.taxAuthority;
      ifns = new IFNS(rawTaxAuthority.id, rawTaxAuthority.code, rawTaxAuthority.title);
    }
    return ifns;
  }

  createIndependentDepartment(raw) {
    return new IndependentDepartment({
      id: raw.division.id,
      kpp: KPP.isValid(raw.division.kpp) ? new KPP(raw.division.kpp) : null,
      title: raw.division.title
    });
  }

  createInternalDepartment(raw) {
    return new IPInternalDepartment({
      id: raw.division.id,
      title: raw.division.title
    });
  }

  createCompanyState(company, raw) {
    const stepSystemName = raw.step.systemName;
    switch (stepSystemName) {
      case 'complete':
        return raw.infsoobBeenSent ? company.completeState : company.hasAddressAndDetailsState;
      case 'waiting_for_data':
        if (raw.taxAuthority && raw.taxAuthority.code && !(raw.division && raw.division.address)) {
          return company.hasDetailsState;
        }
        if (!(raw.taxAuthority && raw.taxAuthority.code) && raw.division && raw.division.address) {
          return company.hasAddressState;
        }
        return company.noAddressAndDetailsState;
      case 'waiting_for_infsoob':
        return company.hasAddressAndDetailsState;
      default:
        throw new Error(`Неверный stepSystemName ${stepSystemName}`);
    }
  }

  createCertificate(request) {
    const { active, thumbprint, valid_from, valid_until } = request.rawUser.certificate;
    return new Certificate(null, thumbprint, valid_from, valid_until, null, active);
  }
}

export default MergeUserAndCompanyDataHandler;
