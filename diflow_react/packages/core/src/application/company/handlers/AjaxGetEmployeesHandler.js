import IPCompany from '../../../domain/individual_entrepreneur/Company';
import ULCompany from '../../../domain/legal_entity/Company';
import IPEmployee from '../../../domain/individual_entrepreneur/Employee';
import ULEmployee from '../../../domain/legal_entity/Employee';
import Environment from '../../Environment';

class AjaxGetEmployeesHandler {
  async get(company, params) {
    const companyId = company.localId;
    const response = await Environment.getAuthGateway().companyEmployees(companyId, params);
    const totalRecords = response.recordsTotal;
    const employees = response.rows.map((rawEmployee) => {
      return this.createEmployee(rawEmployee, company);
    });
    return { employees, totalRecords };
  }

  createEmployee(rawEmployee, company) {
    let employee;
    if (company instanceof IPCompany) {
      employee = new IPEmployee(rawEmployee);
    }
    if (company instanceof ULCompany) {
      employee = new ULEmployee(rawEmployee);
    }
    return employee;
  }
}

const instance = new AjaxGetEmployeesHandler();
export default instance;
