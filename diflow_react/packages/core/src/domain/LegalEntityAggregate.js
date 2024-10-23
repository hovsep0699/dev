import LegalEntity from './legal_entity/Company';
import InternalDepartment from './legal_entity/InternalDepartment';
import IndependentDepartment from './legal_entity/IndependentDepartment';
import Employee from './legal_entity/Employee';
import EmployeeCertificateForSigningDocuments from './legal_entity/EmployeeCertificateForSigningDocuments';
import EmployeeCertificateForEnterSystem from './legal_entity/EmployeeCertificateForEnterSystem';

class CompanyAggregate {
  constructor() {
    this.companies = new Map();
  }

  addCompany(companyData) {
    if (!(companyData instanceof LegalEntity)) {
      throw new Error('Параметр должен быть экземпляром legal_entity/Company');
    }
    this.companies.set(companyData.id, companyData);
    return this.companies.get(companyData.id);
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

  addIndependentDepartmentToCompany(companyId, independentDepartment) {
    if (!(independentDepartment instanceof IndependentDepartment)) {
      throw new Error('Параметр должен быть экземпляром IndependentDepartment');
    }

    if (!this.companies.has(companyId)) {
      throw new Error('Попытка добавить обособленное подразделение в несуществующую компанию');
    }
    const company = this.companies.get(companyId);
    company.independentDepartments.set(independentDepartment.id, independentDepartment);
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

  addEmployeeToIndependentDepartment(companyId, independentDepartmentId, employee) {
    if (!(employee instanceof Employee)) {
      throw new Error('Параметр должен быть экземпляром Employee');
    }

    if (!this.companies.has(companyId)) {
      throw new Error('Попытка добавить сотрудника в несуществующую компанию');
    }
    const company = this.companies.get(companyId);

    if (!company.independentDepartments.has(independentDepartmentId)) {
      throw new Error('Попытка добавить сотрудника в несуществующее обособленное подразделение');
    }
    const independentDepartment = company.independentDepartments.get(independentDepartmentId);
    independentDepartment.addEmployee(employee);
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

  assignCertificateForSigningDocumentsToIndependentDepartmentEmployee(companyId, independentDepartmentId, employeeId, certificate) {
    if (!(certificate instanceof EmployeeCertificateForSigningDocuments)) {
      throw new Error('Данные сертификата должны быть экземпляром класса EmployeeCertificateForSigningDocuments');
    }

    if (!this.companies.has(companyId)) {
      throw new Error('Попытка добавить сертификат сотруднику в несуществующую компанию');
    }
    const company = this.companies.get(companyId);

    if (!company.independentDepartments.has(independentDepartmentId)) {
      throw new Error('Невозможно добавить сертификат сотруднику обособленного подразделения, поскольку такого подразделения не существует');
    }

    const independentDepartment = company.independentDepartments.get(independentDepartmentId);
    independentDepartment.assignCertificateForSigningDocumentToEmployee(employeeId, certificate);
  }

  addCertificateForEnterSystemToIndependentDepartmentEmployee(companyId, independentDepartmentId, employeeId, certificate) {
    if (!(certificate instanceof EmployeeCertificateForEnterSystem)) {
      throw new Error('Данные сертификата должны быть экземпляром класса EmployeeCertificateForEnterSystem');
    }

    if (!this.companies.has(companyId)) {
      throw new Error('Попытка добавить сертификат сотруднику в несуществующую компанию');
    }

    const company = this.companies.get(companyId);

    if (!company.independentDepartments.has(independentDepartmentId)) {
      throw new Error('Невозможно добавить сертификат сотруднику обособленного подразделения, поскольку такого подразделения не существует');
    }

    const independentDepartment = company.independentDepartments.get(independentDepartmentId);
    independentDepartment.addCertificateForEnterSystemToEmployee(employeeId, certificate);
  }
}

const instance = new CompanyAggregate();
Object.freeze(instance);

export default instance;
