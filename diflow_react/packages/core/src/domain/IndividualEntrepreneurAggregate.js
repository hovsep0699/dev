import IndividualEntrepreneur from './individual_entrepreneur/Company';
import Employee from './individual_entrepreneur/Employee';
import InternalDepartment from './individual_entrepreneur/InternalDepartment';

class IndividualEntrepreneurAggregate {
  constructor() {
    this.companies = new Map();
  }

  addCompany(companyData) {
    if (!(companyData instanceof IndividualEntrepreneur)) {
      throw new Error('Параметр должен быть экземпляром Company');
    }
    this.companies.set(companyData.id, companyData);
    return companyData.id;
  }

  addEmployeeToCompany(companyId, employee) {
    if (!(employee instanceof Employee)) {
      throw new Error('Параметр должен быть экземпляром Employee');
    }

    if (!this.companies.has(companyId)) {
      throw new Error('Попытка добавить сотрудника в несуществующую компанию');
    }
    const company = this.companies.get(companyId);
    company.addEmployee(employee);
  }

  addInternalDepartmentToCompany(companyId, internalDepartmentData) {
    if (!(internalDepartmentData instanceof InternalDepartment)) {
      throw new Error('Параметр должен быть экземпляром типа InternalDepartment');
    }

    if (!this.companies.has(companyId)) {
      throw new Error('Попытка добавить внутреннее подразделение в несуществующую компанию');
    }
    const company = this.companies.get(companyId);
    company.internalDepartments.set(internalDepartmentData.id, internalDepartmentData);
  }

  addEmployeeToInternalDepartment(companyId, internalDepartmentId, employee) {
    if (!(employee instanceof Employee)) {
      throw new Error('Параметр должен быть экземпляром Employee');
    }

    if (!this.companies.has(companyId)) {
      throw new Error('Попытка добавить сотрудника в несуществующую компанию');
    }
    const company = this.companies.get(companyId);

    if (!company.internalDepartments.has(internalDepartmentId)) {
      throw new Error('Попытка добавить сотрудника в несуществующее внутреннее подразделение');
    }
    const internalDepartment = company.internalDepartments.get(internalDepartmentId);
    internalDepartment.addEmployee(employee);
  }
}

const instance = new IndividualEntrepreneurAggregate();
Object.freeze(instance);

export default instance;
