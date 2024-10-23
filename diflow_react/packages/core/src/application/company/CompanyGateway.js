import AJAX from '../../infrastructure/AJAX';
import Environment from '../../application/Environment';

class CompanyGateway {
  setAddress(url, formData) {
    return AJAX.postFormData(url, formData);
  }

  setDetails(url, formData) {
    return AJAX.postFormData(url, formData);
  }

  getDivisions(params ={}) {
    return AJAX.doGet('/front/division/employee', params);
  }

  async getByDivisionId(divisionId) {
    const res = await AJAX.doGet(`/front/participant/division/${divisionId}`);
    if (res.bik) {
      const banks = await Environment.getBankGateway().getBankByBIK(res.bik);
      const isAccurateBIK = banks.rows.length === 1;
      res.correspondentAccount = isAccurateBIK ? banks.rows[0].correspondent_account : '';
      res.bankName = isAccurateBIK ? banks.rows[0].full_title : '';
    }
    return res;
  }

  /** установить реквизиты компании */
  setCompanyDetails(formData) {
    return AJAX.postFormData('/front/cabinet/company', formData)
  }

  /** установить юридический адрес компании */
  setCompanyAddress(formData) {
    return AJAX.postFormData('/front/cabinet/address', formData)
  }

  /** получить карточку сотрудника */
  getEmployee(id) {
    return AJAX.doGet(`/front/employee/${id}`)
  }

  /** получить список ролей сотрудника */
  getEmployeeGroup(id, props) {
    return AJAX.doGet(`/front/employee/${id}/groups`, props)
  }
  /** получить список ролей доступных для добавления сотруднику */
  getEmployeeNoGroup(id, props) {
    return AJAX.doGet(`/front/employee/${id}/groups`, {...props, inverseJoin: 1})
  }

  /** добавление роли сотруднику */
  addRoleToEmployee(groupId, employeeId) {
    return AJAX.postFormData(`/front/group/${groupId}/employee/${employeeId}`)
  }
  /** удалить роли у сотрудника */
  deleteRoleToEmployee(groupId, employeeId) {
    return AJAX.doDelete(`/front/group/${groupId}/employee/${employeeId}`)
  }

  /** получение сертификатов сотрудника */
  getEmployeeCertificate(id, props) {
    return AJAX.doGet(`/front/employee/${id}/certificate`, props);
  }

  /** получение подразделений сотрудника */
  getEmployeeDivision(id, props) {
    return AJAX.doGet(`/front/employee/${id}/division`, props);
  }

  /** изменение подразделения по умолчанию для сотрудника */
  changeEmployeeDefaultDivision(employeeId, divisionId) {
    return AJAX.postJSON(`/front/employee/${employeeId}/division/${divisionId}`);
  }

  /** деактивировать сертификат */
  deactivateCertivicate(id) {
    return AJAX.postJSON(`/front/certificate/${id}/deactivate`);
  }

  /** активация сертификата */
  activateCertificate(id) {
    return AJAX.postJSON(`/front/certificate/${id}/activate`);
  }

  /** получение групп контрагентов сотрудника */
  getEmployeeContractorGroups(id, props) {
    return AJAX.doGet(`/front/contractor_group/employee/${id}/contractor_group`, props);
  }
  /** удалить группу контрагентов сотрудника */
  deleteEmployeeContractorGroup(groupId, employeeId) {
    return AJAX.doDelete(`/front/contractor_group/${groupId}/employee/${employeeId}`);
  }
  /** добавить группу контрагентов сотруднику */
  addEmployeeContractorGroup(groupId, employeeId) {
    return AJAX.postJSON(`/front/contractor_group/${groupId}/employee/${employeeId}`);
  }

  /** изменить ответственность сотрудника */
  changeEmployeeResponsible(employeeId, formData) {
    return AJAX.postFormData(`/front/employee/${employeeId}/responsible`, formData);
  }
  /** сбросить пароль сотрудника */
  resetEmployeePassword(employeeId) {
    return AJAX.postFormData(`/front/employee/${employeeId}/password/remind`);
  }

  /** отклонить заявку на активацию сотрудника */
  rejectEmployee(employeeId) {
    return AJAX.postFormData(`/front/employee/${employeeId}/reject`);
  }

  /** принять заявку на активацию сотрудника */
  activeEmployee(employeeId) {
    return AJAX.postFormData(`/front/employee/${employeeId}/status/active`);
  }

  /** деактивировать сотрудника */
  deactivateEmployee(employeeId) {
    return AJAX.postFormData(`/front/employee/${employeeId}/status/inactive`);
  }

  /** получить роли сотрудников */
  getStaffRoles(props) {
    return AJAX.doGet(`/front/role/list`, props);
  }

  /** изменить заголовок роли сотрудника */
  changeStaffRoleTitle(id, formData) {
    return AJAX.postFormData(`/front/group/${id}`, formData);
  }

  /** создать новую роль */
  createStaffRole(formData) {
    return AJAX.postFormData(`/front/group/new`, formData);
  }

  /** получить сотрудников определенной роли */
  getStaffForRole(groupId, props) {
    return AJAX.doGet(`/front/group/${groupId}/employee`, props);
  }

  /** получить права документооборота */
  getDocumentFlowRoles(groupId) {
    return AJAX.doGet(`/front/group/${groupId}/flow`);
  }

  /** обновить права документооборота */
  updateDocumentFlowRoles(groupId, formData) {
    return AJAX.postFormData(`/front/group/${groupId}/roles/update`, formData);
  }

  /** удалить роль */
  deleteRole(groupId) {
    return AJAX.doDelete(`/front/group/${groupId}`);
  }

  /** получить подразделения компании */
  getCompanyDivisions(props) {
    return AJAX.doGet('/front/division', props);
  }

  /** создание нового подразделения */
  createCompanyDivision(formData) {
    return AJAX.postFormData('/front/division/new', formData)
  }

  /** обновить подразделение */
  updateCompanyDivision(id, formData) {
    return AJAX.postFormData(`/front/division/${id}`, formData)
  }

  /** получить информацию о подразделении */
  getDivision(id) {
    return AJAX.doGet(`/front/division/${id}`);
  }


  /** получить список сотрудников подразделения */
  getDivisionEmployee(id, props) {
    return AJAX.doGet(`/front/division/${id}/employee`, props);
  }

  /** добавить сотрудника в подразделение */
  addEmployeeToDivision(divisionId, employeeId) {
    return AJAX.postFormData(`/front/division/${divisionId}/employee/${employeeId}`)
  }

  /** удалить сотрудника из подразделения */
  deleteEmployeeFromDivision(divisionId, employeeId) {
    return AJAX.doDelete(`/front/division/${divisionId}/employee/${employeeId}`)
  }

  /** удалить подразделение */
  deleteDivision(divisionId) {
    return AJAX.doDelete(`/front/division/${divisionId}`)
  }
  
  /** назначение подразделения главным */
  doHeadDivision(divisionId) {
    return AJAX.postFormData(`/front/division/${divisionId}/head`)
  }

  /** информация о компании - раздел Система */
  getCompanyJson(companyId) {
    return AJAX.doGet(`/front/company/${companyId}/json`)
  }

  /** активация компании */
  companyActivation(formData) {
    return AJAX.postFormData('/front/cabinet/members/activate', formData)
  }
  
  /** удаление компании */
  companyDelete(data) {
    return AJAX.deleteFormData('/front/cabinet/members', data)
  }
  
}

export default CompanyGateway;
