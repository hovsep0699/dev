import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';
import {
  SetCompanyDetailsProps,
  SetCompanyAddressProps,
  CompanyDivision
} from '../helpers/company.typings';

const companyGateway = new CompanyGateway();

class CompanyApi {
  /** установить реквизиты компании */
  setCompanyDetails(props: SetCompanyDetailsProps) {
    var formData = new FormData();
    const { accountNumber, bik, classificationNumber, kpp, taxAuthority } = props;

    accountNumber && formData.append('accountNumber', accountNumber);
    bik && formData.append('bik', bik);
    classificationNumber && formData.append('division[classificationNumber]', classificationNumber);
    kpp && formData.append('division[kpp]', kpp);
    taxAuthority && formData.append('taxAuthority', taxAuthority);

    return companyGateway.setCompanyDetails(formData);
  }

  /** установить юридический адрес компании */
  setCompanyAddress(props: SetCompanyAddressProps) {
    const { postalCode, region, district, city, settlement, street, house, building, room } = props;
    const RUSSIA_COUNTRY_CODE = '172';

    const formData = new FormData();
    postalCode && formData.append('postalCode', postalCode);
    region && formData.append('region', region);
    district && formData.append('district', district);
    city && formData.append('city', city);
    settlement && formData.append('settlement', settlement);
    street && formData.append('street', street);
    house && formData.append('house', house);
    building && formData.append('building', building);
    room && formData.append('room', room);
    formData.append('country', RUSSIA_COUNTRY_CODE);

    return companyGateway.setCompanyAddress(formData);
  }

  /** заменить название роли */
  changeStaffRoleTitle({ id, title }: { id: number; title: string }) {
    const formData = new FormData();
    formData.append('title', title);

    return companyGateway.changeStaffRoleTitle(id, formData);
  }

  /** создать роль сотрудника */
  createStaffRole({ title }: { title: string }) {
    const formData = new FormData();
    formData.append('title', title);

    return companyGateway.createStaffRole(formData);
  }

  /** обновить права документооборота */
  updateDocumentFlowRoles({ groupId, roolsId }: { groupId: number; roolsId: number[] }) {
    const formData = new FormData();
    roolsId.forEach(item => {
      formData.append('roles[]', item.toString());
    });

    return companyGateway.updateDocumentFlowRoles(groupId, formData);
  }

  /** создание нового подразделения */
  createCompanyDivision(props: CompanyDivision) {
    const {
      title,
      kpp,
      classificationNumber,
      visible,
      region,
      postalCode,
      district,
      city,
      street,
      building,
      house,
      room,
      settlement,
      phone,
      email
    } = props;

    const formData = new FormData();

    formData.append('address[country]', '172');
    title && formData.append('title', title);
    kpp && formData.append('kpp', kpp);
    classificationNumber && formData.append('classificationNumber', classificationNumber);
    formData.append('visible', visible ? 'true' : 'false');
    region && formData.append('address[region]', region);
    postalCode && formData.append('address[postalCode]', postalCode);
    district && formData.append('address[district]', district);
    city && formData.append('address[city]', city);
    street && formData.append('address[street]', street);
    building && formData.append('address[building]', building);
    house && formData.append('address[house]', house);
    room && formData.append('address[room]', room);
    settlement && formData.append('address[settlement]', settlement);
    phone && formData.append('contact[phone]', phone);
    email && formData.append('contact[email]', email);

    return companyGateway.createCompanyDivision(formData);
  }

  /** обновление подразделения компании */
  updateCompanyDivision(props: CompanyDivision & { id: number }) {
    const {
      id,
      title,
      kpp,
      classificationNumber,
      visible,
      region,
      postalCode,
      district,
      city,
      street,
      building,
      house,
      room,
      settlement
    } = props;

    const formData = new FormData();

    formData.append('address[country]', '172');
    title && formData.append('title', title);
    kpp && formData.append('kpp', kpp);
    classificationNumber && formData.append('classificationNumber', classificationNumber);
    formData.append('visible', visible ? 'true' : 'false');
    region && formData.append('address[region]', region);
    postalCode && formData.append('address[postalCode]', postalCode);
    district && formData.append('address[district]', district);
    city && formData.append('address[city]', city);
    street && formData.append('address[street]', street);
    building && formData.append('address[building]', building);
    house && formData.append('address[house]', house);
    room && formData.append('address[room]', room);
    settlement && formData.append('address[settlement]', settlement);

    return companyGateway.updateCompanyDivision(id, formData);
  }
}

const CompanyApiServices = new CompanyApi();
export { CompanyApiServices };
