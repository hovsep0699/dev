import mockSuccess from '../../../mocks/200/success';
import mockCompanyByDivision from '../../../mocks/200/participant_division';
import CompanyGateway from '../CompanyGateway';

class CompanyGatewayStub extends CompanyGateway {
  setAddress() {
    return Promise.resolve({ data: mockSuccess });
  }

  setDetails() {
    return Promise.resolve({ data: mockSuccess });
  }

  getByDivisionId() {
    return Promise.resolve(mockCompanyByDivision);
  }
}

export default CompanyGatewayStub;
