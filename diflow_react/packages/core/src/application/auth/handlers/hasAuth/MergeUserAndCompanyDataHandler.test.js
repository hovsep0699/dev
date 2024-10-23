import MergeUserAndCompanyDataHandler from './MergeUserAndCompanyDataHandler';
import ULCompany from '../../../../domain/legal_entity/Company';

import LegalAddress from '../../../../domain/common/LegalAddress';

import IFNS from '../../../../domain/ifns/IFNS';

import AuthRequest from '../../AuthRequest';

import mock_user_UL from '../../../../mocks/200/current_user_UL';

import mock_user_UL_complete from '../../../../mocks/200/current_user_UL_complete';

import mock_company_UL_complete from '../../../../mocks/200/current_company_UL_complete';
import IndependentDepartment from '../../../../domain/legal_entity/IndependentDepartment';
import HasAddressAndDetailsState from '../../../../domain/common/company/state/HasAddressAndDetailsState';
import SecurityService from '../../../security/SecurityService';

describe('UL merge. Has address and details', () => {
  const handler = new MergeUserAndCompanyDataHandler();
  const request = new AuthRequest();
  request.rawUser = mock_user_UL;
  request.rawCompany = mock_company_UL_complete;

  test('independent department type', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.independentDepartments.get('KSR201902140019aec69d0c68745798256a00115d88d45')).toBeInstanceOf(IndependentDepartment));
  });

  test('company type', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company).toBeInstanceOf(ULCompany));
  });

  test('legal address type', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.legalAddress).toBeInstanceOf(LegalAddress));
  });

  test('legal address isNull', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.legalAddress.isNull()).toBe(false));
  });

  test('IFNS type', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.ifns).toBeInstanceOf(IFNS));
  });

  test('IFNS code value', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.ifns.code.value).toBe('0273'));
  });

  test('IFNS id', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.ifns.id).toBe(12));
  });

  test('IFNS title', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then((res) => {
        expect(res.company.ifns.title).toBe('');
      });
  });

  test('legal address region title', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.legalAddress.region.title).toBe('Иные территории,включая город и космодром Байконур'));
  });

  test('legal address region code', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.legalAddress.region.code).toBe('99'));
  });

  test('legal address region id', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.legalAddress.region.id).toBe(86));
  });

  test('state', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.state).toBeInstanceOf(HasAddressAndDetailsState));
  });
});

describe('Employee for UL company (complete) ', () => {
  const handler = new MergeUserAndCompanyDataHandler();
  const request = new AuthRequest();
  request.rawUser = mock_user_UL_complete;
  request.rawCompany = mock_company_UL_complete;

  test('email', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.employees.get(177).email).toBe('rostelecomov@rostele.com'));
  });

  test('type', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company).toBeInstanceOf(ULCompany));
  });

  test('ROLE_COMPANY_EDITOR', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(SecurityService.hasRole('ROLE_COMPANY_EDITOR')).toBe(true));
  });

  test('ROLE_USER', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(SecurityService.hasRole('ROLE_USER')).toBe(true));
  });

  test('ROLE_DOCUMENT_VIEWER_WAYBILL_551', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(SecurityService.hasRole('ROLE_DOCUMENT_VIEWER_WAYBILL_551')).toBe(true));
  });

  test('current employee id', () => {
    expect.assertions(1);
    return handler.hasAuth(request)
      .then(res => expect(res.company.employee.id).toBe(177));
  });
});
